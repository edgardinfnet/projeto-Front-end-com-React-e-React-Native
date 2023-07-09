import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';
import { Card } from '../components/Card';
import Toast from 'react-native-root-toast';

export function ListNotepadScreen({ navigation, route }) {
  // const [count, setcount] = useState(0);
  const [notepads, setNotepads] = useState([]);

  async function loadNotepads() {
    // const response = await api.delete(`/notepads/${512}`);
    // Toast.show('Notepad deletado com sucesso :)');
    // navigation.navigate(screens.listNotepads);

    try {
      const response = await api.get('/notepads');
      setNotepads(response.data.notepads);
      // setcount(response.data.count);
    } catch (error) {
      Toast.show('Ocorreu um erro :(');
      console.log(error);
    }
  }

  function onPressViewNotepad({ id }) {
    navigation.navigate(screens.viewNotepad, {
      id,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepads();
    });

    return unsubscribe;
  }, []);

  return (
    <FlatList
      data={notepads}
      renderItem={({ item }) => (
        <Card {...item} onPress={() => onPressViewNotepad(item)} />
      )}
    />
  );
}
