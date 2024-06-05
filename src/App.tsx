import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { queryClient } from "@hooks/query/queryClient";
import { Outlet } from "react-router-dom";
import GlobalErrorBoundary from "@components/GlobalErrorBoundary";

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
      <GlobalErrorBoundary onReset={reset}>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-xl mx-auto bg-white">
            <Outlet />
          </div>
        </QueryClientProvider>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
