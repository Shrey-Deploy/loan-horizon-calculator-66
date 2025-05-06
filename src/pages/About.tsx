
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Loan Horizon</h1>
        <p className="text-muted-foreground mt-2">
          Learn more about our loan calculator application and how it can help you make informed financial decisions.
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>About the App</CardTitle>
            <CardDescription>
              Loan Horizon is a powerful financial tool designed to help you plan your loans.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p>
              Loan Horizon Calculator is a comprehensive loan planning tool that helps you understand the 
              full impact of your loan decisions. With an intuitive interface and powerful calculations, 
              our app makes it easy to visualize your financial journey.
            </p>
            
            <p>
              Whether you're planning for a mortgage, auto loan, or personal loan, our calculator provides 
              you with accurate monthly payment estimates and detailed amortization schedules.
            </p>
            
            <p>
              With the added benefit of multi-currency support, you can see your loan details in the 
              currency that matters most to you.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link to="/">Try It Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Discover what makes Loan Horizon stand out.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <div>
                  <strong>Accurate EMI Calculations</strong>
                  <p className="text-sm text-muted-foreground">
                    Calculate your exact Equated Monthly Installment based on principal, interest rate, and term.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <div>
                  <strong>Detailed Amortization Schedule</strong>
                  <p className="text-sm text-muted-foreground">
                    View a month-by-month breakdown of payments, including principal, interest, and remaining balance.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <div>
                  <strong>Multi-Currency Support</strong>
                  <p className="text-sm text-muted-foreground">
                    Convert your loan payments to multiple currencies using current exchange rates.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <div>
                  <strong>Responsive Design</strong>
                  <p className="text-sm text-muted-foreground">
                    Works flawlessly on all devices, from desktops to smartphones.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>
            Built with modern web technologies for performance and reliability.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="font-bold text-lg">React</div>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Frontend library for building user interfaces
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="font-bold text-lg">Tailwind CSS</div>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="font-bold text-lg">shadcn/ui</div>
              <p className="text-center text-sm text-muted-foreground mt-1">
                High-quality UI components built with Radix UI
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="font-bold text-lg">ExchangeRate API</div>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Live currency exchange data provider
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
