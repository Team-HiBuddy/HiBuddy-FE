import { ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      // inhaDeepBlue
      main: "#005BAC",
      contrastText: "#fff",
    },
    secondary: {
      // inhaSkyBlue
      main: "#00AFEC",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-xl mx-auto h-screen border border-sky-500">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
