import { useEffect, useRef, useState } from "react";
import PlusSVG from "@assets/plus.svg?react";
import MicrophoneSVG from "@assets/microphone.svg?react";
import CheckSVG from "@assets/check.svg?react";
import PauseSVG from "@assets/pause.svg?react";
import { IconButton } from "@mui/material";
import useKoreanTestMutation from "@hooks/query/koreanTest/useKoreanTest";
import BackdropLoader from "./dialog/BackdropLoader";
import usePageRouter from "@hooks/usePageRouter";

function AudioRecorder() {
  const {
    postResult: { mutate: postRecording, data, isPending, isSuccess },
  } = useKoreanTestMutation();

  const { goToTestResultPage } = usePageRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const openLoader = () => {
    setIsLoading(true);
  };

  const closeLoader = () => {
    setIsLoading(false);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing the microphone: ", err);

      alert(
        "Microphone access is required to record audio. Please allow microphone access in your browser settings."
      );
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleResetRecording = () => {
    handleStopRecording();

    setAudioURL("");
    setSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleUpload = async () => {
    if (!audioURL) {
      alert("Recordings not found!");

      return;
    }

    try {
      const response = await fetch(audioURL);
      const blob = await response.blob();

      postRecording(blob);
    } catch (error) {
      console.error(error);
      alert("Uploading the recording file failed.");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPending) {
      openLoader();
    }

    if (!isPending) {
      closeLoader();
    }

    if (isSuccess) {
      goToTestResultPage(data.result.testId);
    }
  }, [isPending]);

  return (
    <>
      <div className="flex flex-col items-center gap-y-10 w-full">
        <p className="font-bold text-4xl">{formatTime(seconds)}</p>
        <div className="flex justify-around items-center w-full px-10">
          <IconButton className="w-12 h-12" onClick={handleResetRecording}>
            <PlusSVG className="scale-150 rotate-45 text-black" />
          </IconButton>
          <IconButton
            className="w-20 h-20"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            <div className="flex items-center justify-center rounded-full w-full h-full bg-inhaSkyBlue">
              {isRecording ? (
                <PauseSVG className="text-white w-8 h-8" />
              ) : (
                <MicrophoneSVG className="text-white w-8 h-8" />
              )}
            </div>
          </IconButton>
          <IconButton className="w-12 h-12" onClick={handleUpload} disabled={isPending}>
            <CheckSVG className="text-black" />
          </IconButton>
        </div>
        {audioURL && <audio controls src={audioURL} />}
      </div>
      <BackdropLoader isOpen={isLoading} />
    </>
  );
}

export default AudioRecorder;
