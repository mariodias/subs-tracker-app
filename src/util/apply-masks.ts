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