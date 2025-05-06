
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Currency {
  code: string;
  name: string;
  rate: number;
}

interface CurrencySelectorProps {
  onCurrencyChange: (currency: string, rate: number) => void;
}

export function CurrencySelector({ onCurrencyChange }: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: "USD", name: "US Dollar", rate: 1 },
    { code: "EUR", name: "Euro", rate: 0.91 },
    { code: "GBP", name: "British Pound", rate: 0.78 },
    { code: "JPY", name: "Japanese Yen", rate: 151.72 },
    { code: "CAD", name: "Canadian Dollar", rate: 1.36 },
    { code: "AUD", name: "Australian Dollar", rate: 1.51 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We'll implement API fetch later. For now, use default currencies.
    const fetchExchangeRates = async () => {
      // This would be replaced with actual API call
      // Skipping implementation for now to avoid API key requirement
    };
  }, []);

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find(c => c.code === value);
    if (selectedCurrency) {
      onCurrencyChange(selectedCurrency.code, selectedCurrency.rate);
    }
  };

  return (
    <Select onValueChange={handleCurrencyChange} defaultValue="USD">
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
