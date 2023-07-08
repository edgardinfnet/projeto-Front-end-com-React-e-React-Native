import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { LatLongText } from './LatLongText';

const Container = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-bottom-width: 1px;
  border-bottom-color: #aaa;
`;

export function NotepadItem({
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
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <Text>{content}</Text>
        <Text>{new Date(created_at).toLocaleDateString()}</Text>
        <LatLongText>
          latitude: {latitude} / longitude{longitude}
        </LatLongText>
      </Container>
    </TouchableOpacity>
  );
}
