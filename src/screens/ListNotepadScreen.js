import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';

const iniNotepds = {
  count: 0,
  notepads: [],
};

export function ListNotepadScreen({ navigation, route }) {
  const [{ count, notepads }, setNotepads] = useState(iniNotepds);

  async function loadNotepads() {
    const response = await api.get('/notepads');
    setNotepads(response.data);
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
        // <Item title={item.title} />
        <View>
          <TouchableOpacity onPress={() => onPressViewNotepadItem(item)}>
            <Text></Text>
            <Text>{item.title}</Text>
            <Text>{item.subtitle}</Text>
            <Text>{item.content}</Text>
            <Text>{item.id}</Text>
            <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            <Text>------------</Text>
          </TouchableOpacity>
        </View>
      )}
      // keyExtractor={item => item.id}
    />
  );
}
