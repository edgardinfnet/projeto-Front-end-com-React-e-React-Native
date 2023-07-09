import { useEffect } from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { api } from '../../api';
import textsLabel from '../../assets/json/textsLabel.json';
import screens from '../../assets//json/screens.json';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

const ButtonBack = styled(Button)`
  background-color: #ffa502;
`;

const ButtonConfirm = styled(Button)`
  background-color: #b71540;
`;

const TextWarning = styled.Text`
  text-align: center;
  color: #2f3542;
  font-weight: 600;
  font-size: 22px;
`;

const TextConfirm = styled.Text`
  text-align: justify;
  color: #2f3542;
  font-size: 18px;
`;

export function ConfirmScreen({ navigation, route }) {
  const notepadId = route.params.id;

  function teste() {
    alert('ok');
  }

  async function onPressDeleteNotepad() {
    const response = await api.delete(`/notepads/${notepadId}`);
    Toast.show('Notepad deletado com sucesso :)');
    navigation.navigate(screens.listNotepads);
  }

  function onPressBackViewNotepad() {
    navigation.navigate(screens.viewNotepad, {
      id: notepadId,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [notepadId]);

  return (
    <Container>
      <TextWarning>Aviso</TextWarning>
      <TextConfirm>{textsLabel.deleteConfirm}</TextConfirm>
      <ButtonConfirm onPress={onPressDeleteNotepad}>Confirmar</ButtonConfirm>
      <ButtonBack onPress={onPressBackViewNotepad}>Voltar</ButtonBack>
    </Container>
  );
}
