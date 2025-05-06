
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Divider,
  CircularProgress,
  Box,
  Alert
} from "@mui/material";

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
}

// Currency names map for better display
const currencyNames: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  NZD: "New Zealand Dollar",
  SGD: "Singapore Dollar",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  KRW: "South Korean Won",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  PLN: "Polish Złoty",
  ILS: "Israeli Shekel",
  HKD: "Hong Kong Dollar",
  ZAR: "South African Rand",
  AED: "UAE Dirham",
  THB: "Thai Baht",
  RUB: "Russian Ruble",
  TRY: "Turkish Lira",
  // Many more could be added here
};

const ExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/d8730fbf7f0a361e681fcca7/latest/USD');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result !== "success") {
          throw new Error(`API returned error: ${data.error || 'Unknown error'}`);
        }
        
        // Convert to our format
        const formattedRates: ExchangeRate[] = Object.entries(data.conversion_rates).map(
          ([code, rate]) => ({
            code,
            name: currencyNames[code] || code,
            rate: rate as number
          })
        );
        
        // Sort by currency code
        formattedRates.sort((a, b) => a.code.localeCompare(b.code));
        
        setRates(formattedRates);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
        setError("Failed to load exchange rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchExchangeRates();
  }, []);

  // Filter rates based on search query
  const filteredRates = rates.filter(
    rate =>
      rate.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  // Get current rows for pagination
  const currentRates = filteredRates.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Exchange Rates
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Current exchange rates for major world currencies (against USD)
      </Typography>

      <Divider sx={{ my: 3 }} />

      <TextField
        label="Search currency"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3, maxWidth: 400 }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Rate (USD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRates.map((rate) => (
                  <TableRow key={rate.code}>
                    <TableCell><strong>{rate.code}</strong></TableCell>
                    <TableCell>{rate.name}</TableCell>
                    <TableCell align="right">{rate.rate.toFixed(4)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredRates.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default ExchangeRates;
