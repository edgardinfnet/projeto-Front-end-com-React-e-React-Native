import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const LogoContatiner = styled.View`
  text-align: 'center';
  align-items: center;
  margin: 10px;
  background-color: black;
`;

export function LogoReact() {
  return (
    <LogoContatiner>
      <Ionicons name='logo-react' size={54} color='#00cec9' />
    </LogoContatiner>
  );
}
