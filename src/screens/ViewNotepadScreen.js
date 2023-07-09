import { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';
import { Container } from '../components/Container';
import { TextTitle } from '../components/TextTitle';
import { TextSubtitle } from '../components/TextSubtitle';
import { TextContent } from '../components/TextContent';
import { TextCreated_at } from '../components/TextCreated_at';
import { Button } from '../components/Button';
//import { ButtonEdit } from '../components/ButtonEdit';

const ButtonEdit = styled(Button)`
  background-color: #ffa502;
`;

const ButtonDelete = styled(Button)`
  background-color: #b71540;
`;

export function ViewNotepadScreen({ navigation, route }) {
  const initialCoords = {
    latitude: 0,
    longitude: 0,
  };
  const [coords, setCoords] = useState(initialCoords);
  const region = {
    ...coords,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

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

    if (
      response.data.latitude !== undefined ||
      response.data.longitude !== undefined
    ) {
      setCoords({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      });
    } else {
      setCoords({
        latitude: 0,
        longitude: 0,
      });
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  function onPressEditNotepad() {
    navigation.navigate(screens.editNotepad, {
      id: notepadId,
    });
  }

  function onPressConfirmDeleteNotepad() {
    navigation.navigate(screens.confirm, {
      id: notepadId,
    });
  }

  // async function onPressDeleteNotepad() {
  //   const response = await api.delete(`/notepads/${notepadId}`);
  //   Toast.show('Notepad deletado com sucesso :)');
  //   navigation.navigate(screens.listNotepads);
  // }

  // function teste() {
  //   alert('ok');
  // }

  return (
    <Container>
      <TextTitle>{title}</TextTitle>
      <TextSubtitle>{subtitle}</TextSubtitle>
      <TextContent>{content}</TextContent>
      <TextCreated_at>Criado em: {createdAt}</TextCreated_at>

      <ButtonEdit onPress={onPressEditNotepad}>Editar</ButtonEdit>
      <ButtonDelete onPress={onPressConfirmDeleteNotepad}>Deletar</ButtonDelete>

      <MapView
        region={region}
        showsUserLocation
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={false}
        scrollEnabled={false}
      >
        <MapMarker key={id} coordinate={coords} />
      </MapView>
    </Container>
  );
}
