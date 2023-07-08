import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';
import { Container } from '../components/Container';
import { LatLongText } from '../components/LatLongText';
import { Notepad } from '../components/Notepad';

export function ListNotepadScreen({ navigation, route }) {
  // const [count, setcount] = useState(0);
  const [notepads, setNotepads] = useState([]);

  async function loadNotepads() {
    const response = await api.get('/notepads');
    setNotepads(response.data.notepads);
    // setcount(response.data.count);
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
        // <Container>
        //   <TouchableOpacity onPress={() => onPressViewNotepadItem(item)}>
        //     <Text>{item.title}</Text>
        //     <Text>{item.subtitle}</Text>
        //     <Text>{item.content}</Text>
        //     <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
        //     <LatLongText>
        //       latitude: {item.latitude} / longitude{item.longitude}
        //     </LatLongText>
        //   </TouchableOpacity>
        // </Container>
        <Notepad {...item} onPress={() => onPressViewNotepad(item)} />
      )}
    />
  );
}
