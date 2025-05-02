export function applyDateMask(value: string): string {

  const cleanValue = value.replace(/\D/g, '');
  const limitedValue = cleanValue.slice(0, 8);
  let maskedValue = '';
  
  if (limitedValue.length > 0) {
    maskedValue = limitedValue.slice(0, 2);
    
    if (limitedValue.length > 2) {
      maskedValue += '/' + limitedValue.slice(2, 4);
      
      if (limitedValue.length > 4) {
        maskedValue += '/' + limitedValue.slice(4, 8);
      }
    }
  }
  
  return maskedValue;
}

export function isValidDate(date: string): boolean {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
  if (!dateRegex.test(date)) {
    return false;
  }

  const [day, month, year] = date.split('/').map(Number);
  
  if (year < 2025) {
    return false;
  }
  
  const dateObj = new Date(year, month - 1, day);
  
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
}

export function applyValueMask(value: string): string {

  const cleanValue = value.replace(/\D/g, '');
  
  if (!cleanValue) {
    return '';
  }
  
  const numericValue = parseInt(cleanValue, 10) / 100;
  
  return numericValue.toFixed(2).replace('.', ',');
}

export function unmaskedValue(maskedValue: string): number {

  const cleanValue = maskedValue.replace(/[^\d,]/g, '');
  const numericString = cleanValue.replace(',', '.');
  
  return parseFloat(numericString) || 0;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}