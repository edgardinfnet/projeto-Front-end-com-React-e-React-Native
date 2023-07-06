import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';

export function ListNotepadScreen({ navigation, route }) {
  // const [count, setcount] = useState(0);
  const [notepads, setNotepads] = useState([]);

  async function loadNotepads() {
    const response = await api.get('/notepads');
    setNotepads(response.data.notepads);
    // setcount(response.data.count);
  }

  function onPressViewNotepadItem({ id }) {
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
        <View>
          <TouchableOpacity onPress={() => onPressViewNotepadItem(item)}>
            <Text>------------</Text>
            <Text>{item.title}</Text>
            <Text>{item.subtitle}</Text>
            <Text>{item.content}</Text>
            <Text>{item.id}</Text>
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
            <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            <Text>------------</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
