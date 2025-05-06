
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AmortizationTable } from "./AmortizationTable";
import { CurrencySelector } from "./CurrencySelector";
import { calculateEMI, formatCurrency, generateAmortizationSchedule } from "@/utils/calculationUtils";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  loanAmount: z.coerce.number().positive("Loan amount must be positive").min(1, "Loan amount is required"),
  loanTerm: z.coerce.number().int().positive("Loan term must be positive").min(1, "Minimum term is 1 year").max(30, "Maximum term is 30 years"),
  interestRate: z.coerce.number().positive("Interest rate must be positive").min(0.1, "Minimum rate is 0.1%").max(30, "Maximum rate is 30%"),
});

export function Calculator() {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isCalculated, setIsCalculated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 250000,
      loanTerm: 15,
      interestRate: 5.5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { loanAmount, loanTerm, interestRate } = values;
    
    // Calculate EMI
    const emi = calculateEMI(loanAmount, interestRate, loanTerm);
    setMonthlyPayment(emi);
    
    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(loanAmount, interestRate, loanTerm);
    setAmortizationSchedule(schedule);
    
    setIsCalculated(true);
  }

  const handleCurrencyChange = (code: string, rate: number) => {
    setCurrency(code);
    setExchangeRate(rate);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Loan Calculator</CardTitle>
          <CardDescription>
            Calculate your monthly payments and view amortization schedule
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder="Enter loan amount"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Enter the total loan amount</FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="loanTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Term (Years)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter loan term"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Enter the loan term in years</FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate (%)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter interest rate"
                            className="pr-8"
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Enter the annual interest rate</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto loan-gradient"
              >
                Calculate EMI
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isCalculated && monthlyPayment && (
        <Card className="shadow-md animate-in">
          <CardHeader>
            <CardTitle className="text-xl">Results</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(monthlyPayment * exchangeRate, currency)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Currency</div>
                <CurrencySelector onCurrencyChange={handleCurrencyChange} />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Amortization Schedule</h3>
              <AmortizationTable 
                data={amortizationSchedule} 
                currency={currency} 
                exchangeRate={exchangeRate}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
