
import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  Divider,
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import { calculateEMI, formatCurrency, generateAmortizationSchedule, type AmortizationRow } from "@/utils/calculationUtils";

interface Currency {
  code: string;
  name: string;
  rate: number;
}

export function MaterialCalculator() {
  const [loanAmount, setLoanAmount] = useState("250000");
  const [loanTerm, setLoanTerm] = useState("15");
  const [interestRate, setInterestRate] = useState("5.5");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isCalculated, setIsCalculated] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  
  // Sample currencies (would be replaced with API data in a real app)
  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", rate: 1 },
    { code: "EUR", name: "Euro", rate: 0.91 },
    { code: "GBP", name: "British Pound", rate: 0.78 },
    { code: "JPY", name: "Japanese Yen", rate: 151.72 },
    { code: "CAD", name: "Canadian Dollar", rate: 1.36 },
    { code: "AUD", name: "Australian Dollar", rate: 1.51 },
  ];

  const handleCalculate = () => {
    const amount = parseFloat(loanAmount);
    const term = parseInt(loanTerm);
    const rate = parseFloat(interestRate);
    
    if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
      return; // Basic validation
    }
    
    if (amount <= 0 || term <= 0 || rate <= 0) {
      return; // More validation
    }
    
    // Calculate EMI
    const emi = calculateEMI(amount, rate, term);
    setMonthlyPayment(emi);
    
    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(amount, rate, term);
    setAmortizationSchedule(schedule);
    
    setIsCalculated(true);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const code = event.target.value as string;
    const selectedCurrency = currencies.find(c => c.code === code);
    if (selectedCurrency) {
      setCurrency(selectedCurrency.code);
      setExchangeRate(selectedCurrency.rate);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current rows for pagination
  const currentRows = amortizationSchedule.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Loan Calculator Form */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Loan Calculator
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Calculate your monthly payments and view amortization schedule
          </Typography>
          
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Amount"
                  fullWidth
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  helperText="Enter the total loan amount"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Term (Years)"
                  fullWidth
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  helperText="Enter the loan term in years"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  label="Interest Rate (%)"
                  fullWidth
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  helperText="Enter the annual interest rate"
                />
              </Grid>
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleCalculate}
              sx={{ mt: 3 }}
              fullWidth
            >
              Calculate EMI
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Results */}
      {isCalculated && monthlyPayment && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Results
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Monthly Payment
                </Typography>
                <Typography variant="h4" color="primary">
                  {formatCurrency(monthlyPayment * exchangeRate, currency)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    label="Currency"
                    onChange={(e) => handleCurrencyChange(e as any)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Amortization Schedule
            </Typography>
            
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Payment</TableCell>
                    <TableCell align="right">Principal</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.payment * exchangeRate, currency)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.principal * exchangeRate, currency)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.interest * exchangeRate, currency)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.balance * exchangeRate, currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[6, 12, 24, 36]}
              component="div"
              count={amortizationSchedule.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
