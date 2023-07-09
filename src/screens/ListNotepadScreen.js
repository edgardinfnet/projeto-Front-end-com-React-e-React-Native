import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';
import { useGlobalStore } from '../useGlobalStore';
import { Card } from '../components/Card';
import Toast from 'react-native-root-toast';
import { LoadingSimple } from '../components/LoadingSimple';

export function ListNotepadScreen({ navigation, route }) {
  const [notepads, setNotepads] = useState([]);
  const isLoading = useGlobalStore((state) => state.isLoading);

  async function loadNotepads() {
    // const response = await api.delete(`/notepads/${512}`);
    // Toast.show('Notepad deletado com sucesso :)');
    // navigation.navigate(screens.listNotepads);

    try {
      const response = await api.get('/notepads');
      setNotepads(response.data.notepads);
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
    <View>
      {isLoading && <LoadingSimple></LoadingSimple>}
      {!isLoading && (
        <FlatList
          data={notepads}
          renderItem={({ item }) => (
            <Card {...item} onPress={() => onPressViewNotepad(item)} />
          )}
        />
      )}
    </View>
  );
}
