import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { queryClient } from "@hooks/query/queryClient";
import { Outlet } from "react-router-dom";
import GlobalErrorBoundary from "@components/errorBoundary/GlobalErrorBoundary";

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
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalErrorBoundary onReset={reset}>
          <div className="max-w-xl mx-auto bg-white">
            <Outlet />
          </div>
        </GlobalErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
