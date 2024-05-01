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
    info: {
      main: "#FEE500",
      contrastText: "#1C1B22",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-200">
        <div className="max-w-xl mx-auto bg-white">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
