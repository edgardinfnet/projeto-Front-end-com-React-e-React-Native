import { TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import styled from 'styled-components/native';
import { LatLongText } from './LatLongText';
// import { Title } from './title';

const Container = styled.View`
  padding: 10px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #3c6382;
  background-color: #ffffff;
`;

const Title = styled.Text`
  color: #2f3542;
  font-weight: 600;
  font-size: 22px;
`;

const Subtitle = styled.Text`
  color: #2f3542;
  font-style: italic;
  font-size: 16px;
  margin: 4px;
`;

const Content = styled.Text`
  color: #2f3542;
  font-size: 16px;
  text-align: justify;
  margin: 4px;
`;

const Created_at = styled.Text`
  color: #2f3542;
  font-size: 14px;
  margin: 2px;
`;

export function Notepad({
  id,
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
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Content>{content}</Content>
        <Created_at>
          Criado em: {new Date(created_at).toLocaleDateString()}
        </Created_at>
        {latitude && longitude && (
          <LatLongText>
            latitude: {latitude} / longitude{longitude}
          </LatLongText>
        )}
      </Container>
    </TouchableOpacity>
  );
}
