
import React from "react";
import { Typography, Container, Divider, Box } from "@mui/material";
import { MaterialCalculator } from "@/components/MaterialCalculator";

const Index = () => {
  return (
    <Container>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loan Horizon Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Calculate your monthly payments, view amortization schedules, and compare loan options in multiple currencies.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <MaterialCalculator />
    </Container>
  );
};

export default Index;
