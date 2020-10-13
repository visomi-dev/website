const helpers = {
  wait: (miliseconds: number) => new Promise(resolve => setTimeout(resolve, miliseconds)),
  toCurrency(amount = 0, currency = 'MXN', decimals: number): string {
    const formatterOptions = {
      style: 'currency',
      currency,
      maximumFractionDigits: decimals,
    };

    const formatter = new Intl.NumberFormat('es-MX', formatterOptions);

    const value = formatter.format(amount);

    return value;
  },
};

export default helpers;
