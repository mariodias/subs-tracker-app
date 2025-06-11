import { TouchableOpacityProps } from 'react-native';
import {
  Card,
  ServiceIcon,
  SubscriptionInfo,
  ServiceName,
  Price,
  Details,
  StatusIndicator,
} from './styles';

type Subscription = TouchableOpacityProps & {
  id: string;
  serviceName: string;
  icon: string;
  price: number;
  period: string;
  active?: boolean;
}

export function SubscriptionCard({
  id, 
  serviceName, 
  icon, 
  price,
  period,
  active = true, 
  ...rest
}: Subscription) {
  return (
    <Card id={id} {...rest}>
      <StatusIndicator active={active} />
      <ServiceIcon source={{ uri: icon }} />
      <SubscriptionInfo>
        <ServiceName>{serviceName}</ServiceName>
        <Price>$ {price.toFixed(2)}</Price>
        <Details>Assinatura {period}</Details>
      </SubscriptionInfo>
    </Card>
  );
}