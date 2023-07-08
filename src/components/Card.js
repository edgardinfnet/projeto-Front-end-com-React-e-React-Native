import { TouchableOpacity } from 'react-native';
import { TextTitle } from './TextTitle';
import { TextSubtitle } from './TextSubtitle';
import { TextCreated_at } from './TextCreated_at';
import { TextSmall } from './TextSmall';
import { TextContent } from './TextContent';
import { CardContainer } from './CardContainer';

export function Card({
  title,
  subtitle,
  content,
  created_at,
  latitude,
  longitude,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <CardContainer>
        <TextTitle>{title}</TextTitle>
        <TextSubtitle>{subtitle}</TextSubtitle>
        <TextContent>{content}</TextContent>
        <TextCreated_at>
          Criado em: {new Date(created_at).toLocaleDateString()}
        </TextCreated_at>
        {latitude && longitude && (
          <TextSmall>
            latitude: {latitude} / longitude{longitude}
          </TextSmall>
        )}
      </CardContainer>
    </TouchableOpacity>
  );
}
