
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useTheme } from "@/hooks/useTheme";

import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ExchangeRates from "./pages/ExchangeRates";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Custom MUI theme provider that uses the existing useTheme hook
const MaterialThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Blue instead of pink
      },
      secondary: {
        main: '#42a5f5', // Lighter blue
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MaterialThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MaterialThemeProvider>
  </QueryClientProvider>
);

export default App;
