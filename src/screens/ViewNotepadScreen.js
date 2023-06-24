import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';

export function ViewNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    setId(response.data.id);
    setTitle(response.data.title);
    setSubtitle(response.data.subtitle);
    setContent(response.data.content);
    setCreatedAt(new Date(response.data.created_at).toLocaleDateString());
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

  function onPressEditNotepad(id) {
    navigation.navigate(screens.editNotepad, {
      id,
    });
  }

  async function onPressDeleteNotepad() {
    const response = await api.delete(`/notepads/${notepadId}`);
    Toast.show('Notepad deletado com sucesso :)');
    navigation.navigate(screens.listNotepads);
  }

  return (
    <View>
      <Text>
        ViewNotepadScreen - {id} - {createdAt}
      </Text>
      <Text></Text>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
      <Text>{content}</Text>
      <Text></Text>

      <TouchableOpacity onPress={() => onPressListNotepads()}>
        <Text>------------</Text>
        <Text>Voltar</Text>
        <Text>------------</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPressEditNotepad(id)}>
        <Text>------------</Text>
        <Text>Editar</Text>
        <Text>------------</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPressDeleteNotepad()}>
        <Text></Text>
        <Text>Deletar</Text>
        <Text>------------</Text>
      </TouchableOpacity>
    </View>
  );
}
