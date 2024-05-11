import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@hooks/query/queryClient";
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
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-200">
          <div className="max-w-xl mx-auto bg-white">
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
