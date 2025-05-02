import { 
  Container, 
  Label, 
  Value } from './styles';

type TotalExpensesCardProps = {
  total: number;
}

export function TotalExpensesCard({ total }: TotalExpensesCardProps) {
  return (
    <Container>
      <Label>Valor mensal de assinaturas</Label>
      <Value>R$ {total.toFixed(2)}</Value>
    </Container>
  );
}