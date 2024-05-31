import { useEffect, useRef, useState } from "react";
import PlusSVG from "@assets/plus.svg?react";
import MicrophoneSVG from "@assets/microphone.svg?react";
import CheckSVG from "@assets/check.svg?react";
import PauseSVG from "@assets/pause.svg?react";
import { IconButton } from "@mui/material";

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = async () => {
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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
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
        <IconButton className="w-12 h-12">
          <CheckSVG className="text-black" />
        </IconButton>
      </div>
      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
}

export default AudioRecorder;
