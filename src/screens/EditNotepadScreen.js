import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';
import Toast from 'react-native-root-toast';
import { TextInput } from 'react-native-gesture-handler';

export function EditNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    setId(response.data.id);
    setTitle(response.data.title);
    setSubtitle(response.data.subtitle);
    setContent(response.data.content);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  function onPressViewNotepad(id) {
    navigation.navigate(screens.viewNotepad, {
      id,
    });
  }

  async function onPressSaveNotepad() {
    const response = await api.patch(`/notepads/${notepadId}`, {
      title,
      subtitle,
      content,
    });
    Toast.show('Editado com sucesso :)');
    // navigation.goBack();
    onPressViewNotepad(notepadId);
  }

  return (
    <View>
      <Text>EditNotepadScreen - {notepadId}</Text>
      <Text></Text>
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={subtitle} onChangeText={setSubtitle} />
      <TextInput value={content} onChangeText={setContent} />
      <Text></Text>

      <TouchableOpacity onPress={() => onPressViewNotepad(id)}>
        <Text>------------</Text>
        <Text>Voltar</Text>
        <Text>------------</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPressSaveNotepad()}>
        <Text>------------</Text>
        <Text>Salvar</Text>
        <Text>------------</Text>
      </TouchableOpacity>
    </View>
  );
}
