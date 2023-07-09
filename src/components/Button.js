import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: #ff7f50;
  border-radius: 4px;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export function Button({ children, onPress, style = {} }) {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}
