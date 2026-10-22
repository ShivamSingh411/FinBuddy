// FinBuddy Currency Service
// Stubbed exchange rates – ready to plug into RBI / ExchangeRate-API

export const EXCHANGE_RATES = {
  base: 'INR',
  lastUpdated: '2026-10-22',
  source: 'Stubbed – Ready for live API integration',
  rates: {
    INR: 1,
    USD: 0.01198,
    EUR: 0.01107,
    GBP: 0.00940,
    AED: 0.04400,
  },
};

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', locale: 'en-US' },
];

export const getCurrencyByCode = (code) =>
  CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];

export const getLocaleForCurrency = (code) => {
  const map = { INR: 'en-IN', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB', AED: 'en-US' };
  return map[code] || 'en-IN';
};

export const convertFromINR = (amountInINR, targetCurrency) => {
  const rate = EXCHANGE_RATES.rates[targetCurrency] || 1;
  return amountInINR * rate;
};

export const formatAmount = (amount, currencyCode = 'INR') => {
  const currency = getCurrencyByCode(currencyCode);
  const num = Math.abs(Number(amount) || 0);
  try {
    const formatted = num.toLocaleString(currency.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${currency.symbol}${formatted}`;
  } catch {
    return `${currency.symbol}${num.toFixed(2)}`;
  }
};
