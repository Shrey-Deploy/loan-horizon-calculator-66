
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
}

const sampleRates: ExchangeRate[] = [
  { code: "USD", name: "US Dollar", rate: 1 },
  { code: "EUR", name: "Euro", rate: 0.91 },
  { code: "GBP", name: "British Pound", rate: 0.78 },
  { code: "JPY", name: "Japanese Yen", rate: 151.72 },
  { code: "CAD", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", name: "Australian Dollar", rate: 1.51 },
  { code: "CHF", name: "Swiss Franc", rate: 0.89 },
  { code: "CNY", name: "Chinese Yuan", rate: 7.23 },
  { code: "INR", name: "Indian Rupee", rate: 83.45 },
  { code: "SGD", name: "Singapore Dollar", rate: 1.35 },
  { code: "MXN", name: "Mexican Peso", rate: 16.62 },
  { code: "BRL", name: "Brazilian Real", rate: 5.06 },
  { code: "KRW", name: "South Korean Won", rate: 1349.24 },
  { code: "SEK", name: "Swedish Krona", rate: 10.48 },
  { code: "NOK", name: "Norwegian Krone", rate: 10.71 },
  { code: "DKK", name: "Danish Krone", rate: 6.83 },
  { code: "PLN", name: "Polish Złoty", rate: 3.94 },
  { code: "ILS", name: "Israeli Shekel", rate: 3.68 },
  { code: "HKD", name: "Hong Kong Dollar", rate: 7.81 },
  { code: "ZAR", name: "South African Rand", rate: 18.59 },
];

const ExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>(sampleRates);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const itemsPerPage = 10;
  
  // Filter rates based on search query
  const filteredRates = rates.filter(
    rate =>
      rate.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRates = filteredRates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  useEffect(() => {
    // In a real implementation, we would fetch the exchange rates from the API
    // For now, we'll use the sample data
    // Example API call would be:
    // const fetchExchangeRates = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD');
    //     const data = await response.json();
    //     // Process and set rates
    //   } catch (error) {
    //     console.error('Error fetching rates:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchExchangeRates();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exchange Rates</h1>
        <p className="text-muted-foreground mt-2">
          Current exchange rates for major world currencies (against USD)
        </p>
      </div>
      
      <Separator />
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Currency Exchange Rates</CardTitle>
          <CardDescription>
            Exchange rates are updated regularly from trusted financial sources.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            placeholder="Search currency..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Code</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead className="text-right">Rate (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRates.map((rate) => (
                  <TableRow key={rate.code}>
                    <TableCell className="font-medium">{rate.code}</TableCell>
                    <TableCell>{rate.name}</TableCell>
                    <TableCell className="text-right">{rate.rate.toFixed(4)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => paginate(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={currentPage === pageNum}
                      onClick={() => paginate(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => paginate(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeRates;
