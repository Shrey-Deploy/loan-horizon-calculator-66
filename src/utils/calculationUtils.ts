
export interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  payment: number;
}

export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenureInYears: number
): number => {
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Total number of payments
  const totalPayments = tenureInYears * 12;
  
  // EMI calculation formula
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return emi;
};

export const generateAmortizationSchedule = (
  principal: number,
  interestRate: number,
  tenureInYears: number
): AmortizationRow[] => {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = tenureInYears * 12;
  const monthlyPayment = calculateEMI(principal, interestRate, tenureInYears);
  
  let balance = principal;
  const schedule: AmortizationRow[] = [];
  
  for (let month = 1; month <= totalPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    balance -= principalPayment;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance)
    });
  }
  
  return schedule;
};

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const convertCurrency = (
  amount: number,
  rate: number
): number => {
  return amount * rate;
};
