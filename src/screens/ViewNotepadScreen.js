import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';

const initNotepad = {
  id: 0,
  title: '',
  subtitle: '',
  content: '',
  created_at: '',
};

export function ViewNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [notepad, setNotepad] = useState(initNotepad);
  //const notepadCreatedAt = new Date(notepad.created_at).toLocaleDateString();

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    setNotepad(response.data);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  function onPressListNotepads() {
    navigation.navigate(screens.listNotepads);
  }

  return (
    <View>
      <Text>ViewNotepadScreen</Text>
      <Text>{notepad.title}</Text>
      <Text>{notepad.subtitle}</Text>
      <Text>{notepad.content}</Text>
      <Text>{notepad.id}</Text>
      <Text>{new Date(notepad.created_at).toLocaleDateString()}</Text>
      <Text>------------</Text>

      <TouchableOpacity onPress={() => onPressListNotepads()}>
        <Text></Text>
        <Text>Voltar</Text>
        <Text>------------</Text>
      </TouchableOpacity>
    </View>
  );
}
