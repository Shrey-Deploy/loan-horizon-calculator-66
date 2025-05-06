
import React from "react";
import { Calculator } from "@/components/Calculator";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loan Horizon Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your monthly payments, view amortization schedules, and compare loan options in multiple currencies.
        </p>
      </div>
      
      <Separator />
      
      <Calculator />
    </div>
  );
};

export default Index;
