import { deleteAccount, logout } from "@apis/auth";
import AccountCircleSVG from "@assets/account-circle.svg?react";
import GreaterThanSVG from "@assets/greater-than.svg?react";
import usePageRouter from "@hooks/usePageRouter";
import { Button, TextField } from "@mui/material";

function MyPage() {
  const { goToLoginPage } = usePageRouter();

  const handelLogout = () => {
    logout();

    goToLoginPage();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      deleteAccount();

      goToLoginPage();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-10">
      <section className="flex flex-col gap-3">
        <AccountCircleSVG className="ml-auto mr-auto w-20 h-20" />
        <TextField
          className="w-4/5"
          variant="standard"
          color="secondary"
          label="nickname"
          value="MyName"
        />
        <TextField
          className="w-4/5"
          variant="standard"
          color="secondary"
          label="country"
          value="France"
          disabled
        />
        <TextField
          className="w-4/5"
          variant="standard"
          color="secondary"
          label="major"
          value="Computer Engineering"
          disabled
        />
      </section>
      <hr className="w-full" />
      <section className="flex flex-col gap-6">
        <Button color="inherit">
          <div className="flex justify-between w-full">
            My Posts
            <GreaterThanSVG />
          </div>
        </Button>
        <Button color="inherit">
          <div className="flex justify-between w-full">
            Saved Posts
            <GreaterThanSVG />
          </div>
        </Button>
      </section>
      <hr className="w-full" />
      <section className="flex flex-col gap-8">
        <Button color="inherit" className="mr-auto w-fit">
          <div className="mr-auto" onClick={handelLogout}>
            Logout
          </div>
        </Button>
        <Button color="warning" className="mr-auto w-fit">
          <div className="mr-auto" onClick={handleDeleteAccount}>
            Delete Account
          </div>
        </Button>
      </section>
    </div>
  );
}

export default MyPage;
