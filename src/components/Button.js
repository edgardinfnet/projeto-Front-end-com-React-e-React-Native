import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: #3c6382;
  border-radius: 4px;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ButtonText = styled.Text`
  color: #dfe6e9;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export function Button({ children, onPress, isLoading = false }) {
  return (
    <ButtonContainer onPress={onPress} disabled={isLoading}>
      {/* {isLoading && <ActivityIndicator size={30} color='#ecf0f1' />} */}
      {/* {!isLoading && <ButtonText>{children}</ButtonText>} */}
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}
