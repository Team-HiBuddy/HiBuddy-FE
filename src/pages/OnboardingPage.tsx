import { Autocomplete, Button, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import useNickname from "../hooks/useNickname";
import useOnboarding from "@hooks/query/user/useOnboarding";
import usePageRouter from "@hooks/usePageRouter";
import { convertToTitleCase, convertToUpperSnakeCase } from "@utils/string";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";

function OnboardingPage() {
  const { nickname, isValidName, helperText, handleNicknameChange, handleNicknameBlur } =
    useNickname();

  const {
    patchResult: { mutate: patchData, isPending, isSuccess },
    countriesResult: {
      data: countries,
      isPending: isCountriesPending,
      isSuccess: isCountriesSuccess,
    },
    majorsResult: { data: majors, isPending: isMajorsPending, isSuccess: isMajorsSuccess },
  } = useOnboarding();

  const countryOptions: string[] = [];
  const majorOptions: string[] = [];

  const { goToMainPage } = usePageRouter();

  const [country, setCountry] = useState<string | null>(null);
  const [major, setDepartment] = useState<string | null>(null);

  const handleCountryChange = (_: SyntheticEvent, value: string | null) => {
    setCountry(value);
  };

  const handleDepartmentChange = (_: SyntheticEvent, value: string | null) => {
    setDepartment(value);
  };

  const handleContinueButton = () => {
    if (!country || !major) return;

    patchData({
      nickname,
      country: convertToUpperSnakeCase(country),
      major: convertToUpperSnakeCase(major),
    });
  };

  useEffect(() => {
    if (!isSuccess) return;

    goToMainPage();
  }, [isSuccess]);

  useEffect(() => {
    if (!isCountriesSuccess || !isMajorsSuccess) return;

    countries.forEach((value) => {
      countryOptions.push(value);
    });

    majors.forEach((value) => {
      majorOptions.push(value);
    });
  }, [isCountriesSuccess, isMajorsSuccess]);

  return (
    <div className="flex flex-col items-center gap-y-20 h-screen">
      <h1 className="text-6xl text-inhaDeepBlue font-bold mt-24">HiBuddy</h1>
      {isCountriesPending || isMajorsPending ? (
        <BubbleLoadingSVG className="w-14 h-14 text-inhaSkyBlue" />
      ) : (
        <form className="flex flex-col gap-y-8 w-3/5">
          <TextField
            variant="standard"
            fullWidth
            autoFocus
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
            helperText={helperText}
            error={!isValidName}
          />
          {countries && (
            <Autocomplete
              fullWidth
              options={countries.map((value) => convertToTitleCase(value))}
              value={country}
              onChange={handleCountryChange}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
          )}
          {majors && (
            <Autocomplete
              fullWidth
              options={majors.map((value) => convertToTitleCase(value))}
              value={major}
              onChange={handleDepartmentChange}
              renderInput={(params) => <TextField {...params} label="Department" />}
            />
          )}
        </form>
      )}
      <div className="w-3/5 mt-auto mb-20">
        <Button
          variant="outlined"
          fullWidth
          size="large"
          color="secondary"
          disabled={!isValidName || country === null || major === null || isPending}
          onClick={handleContinueButton}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}

export default OnboardingPage;
