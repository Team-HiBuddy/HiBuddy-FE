import { Autocomplete, Button, TextField } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
interface AutocompleteOption {
  label: string;
}

const Countries: AutocompleteOption[] = [
  { label: "🇰🇷 Korea" },
  { label: "🇫🇷 France" },
  { label: "🇯🇵 Japan" },
  { label: "🇨🇳 China" },
];

const Departments: AutocompleteOption[] = [
  { label: "Physics" },
  { label: "Mathematics" },
  { label: "Mechanical Engineering" },
  { label: "Computer Engineering" },
];

function OnboardingPage() {
  const [nickname, setNickname] = useState<string>("");
  const [country, setCountry] = useState<AutocompleteOption | null>(null);
  const [department, setDepartment] = useState<AutocompleteOption | null>(null);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleCountryChange = (e: SyntheticEvent, value: AutocompleteOption | null) => {
    setCountry(value);
  };

  const handleDepartmentChange = (e: SyntheticEvent, value: AutocompleteOption | null) => {
    setDepartment(value);
  };

  return (
    <div className="flex flex-col items-center gap-y-20 h-full">
      <h1 className="text-6xl text-inhaDeepBlue font-bold mt-24">HiBuddy</h1>
      <form className="flex flex-col gap-y-8 w-3/5">
        <TextField
          label="nickname"
          variant="standard"
          fullWidth
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Autocomplete
          fullWidth
          options={Countries}
          value={country}
          onChange={handleCountryChange}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Autocomplete
          fullWidth
          options={Departments}
          value={department}
          onChange={handleDepartmentChange}
          renderInput={(params) => <TextField {...params} label="Department" />}
        />
      </form>
      <div className="w-3/5 mt-auto mb-20">
        <Button
          variant="outlined"
          fullWidth
          size="large"
          color="secondary"
          disabled={country === null || department === null}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}

export default OnboardingPage;
