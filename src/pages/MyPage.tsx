import AccountCircleSVG from "@assets/account-circle.svg?react";
import GreaterThanSVG from "@assets/greater-than.svg?react";
import { Button, TextField } from "@mui/material";

function MyPage() {
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
          <div className="mr-auto">Logout</div>
        </Button>
        <Button color="warning" className="mr-auto w-fit">
          <div className="mr-auto">Delete Account</div>
        </Button>
      </section>
    </div>
  );
}

export default MyPage;
