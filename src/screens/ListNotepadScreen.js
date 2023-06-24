import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../api';

const iniNotepds = {
  count: 0,
  notepads: [],
};

export function ListNotepadScreen({ navigation }) {
  const [{ count, notepads }, setNotepads] = useState(iniNotepds);

  async function loadNotepads() {
    const response = await api.get('/notepads');
    setNotepads(response.data);
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
          <Text></Text>
          <Text>{item.title}</Text>
          <Text>{item.subtitle}</Text>
          <Text>{item.content}</Text>
          <Text>{item.id}</Text>
          <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
          <Text>------------</Text>
        </View>
      )}
      // keyExtractor={item => item.id}
    />
  );
}
