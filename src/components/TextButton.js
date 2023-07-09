import styled from 'styled-components/native';

const ButtonText = styled.Text`
  color: #dfe6e9;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export function TextButton({ children }) {
  return <ButtonText>{children}</ButtonText>;
}
