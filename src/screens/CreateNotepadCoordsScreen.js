import { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import { notepadSchema } from '../notepadSchema';
import { api } from '../../api';
import screens from '../../assets/json/screens.json';
import { Button } from '../components/Button';
import { TextInputField } from '../components/TextField';
import { LatLongText } from '../components/LatLongText';
import { Label } from '../components/Label';
import { Container } from '../components/Container';
import { ErrorMessage } from '../components/ErrorMessage';

const coordsDelta = 0.1;
const initMessage = 'buscando sua localização...';
const initialCoords = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: coordsDelta,
  longitudeDelta: coordsDelta,
};
const initValues = {
  title: '',
  subtitle: '',
  content: '',
};

export function CreateNotepadCoordsScreen({ navigation, route }) {
  const [locationMesssage, setLocationMessage] = useState(initMessage);
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  async function loadGeolocation() {
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      const position = await Location.getCurrentPositionAsync();
      console.log(position);
      //setCoords(position.coords);
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationMessage('Achamos você');
      Toast.show('Achamos você');
    } catch (error) {
      setLocationMessage('Não te achamos');
      Toast.show('Não te achamos');
    }
  }

  async function onSubmit({ title, subtitle, content }, { resetForm }) {
    try {
      const response = await api.post('/notepads', {
        title,
        subtitle,
        content,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      resetForm({});
      Toast.show('Notepad criado com sucesso :)');
      navigation.navigate(screens.listNotepads);
    } catch (error) {
      Toast.show('Ocorreu um erro inexperado :(');
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Toast.show(initMessage, {
        position: Toast.positions.CENTER,
        duration: Toast.durations.SHORT,
        onShown: () => {
          if (locationMesssage === 'Achamos você') {
            return true;
          }
        },
      });
      loadGeolocation();
    });
    return unsubscribe;
  }, []);

  return (
    <Formik
      initialValues={initValues}
      validationSchema={notepadSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <Label>
            {errors.title ? (
              <ErrorMessage>{errors.title.toString()}</ErrorMessage>
            ) : (
              'Título'
            )}
          </Label>
          <TextInputField
            placeholder='Digite um subtítulo'
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          ></TextInputField>

          <Label>
            {errors.subtitle ? (
              <ErrorMessage>{errors.subtitle.toString()}</ErrorMessage>
            ) : (
              'Subtítulo'
            )}
          </Label>
          <TextInputField
            placeholder='Digite um subtítulo'
            value={values.subtitle}
            onChangeText={handleChange('subtitle')}
            onBlur={handleBlur('subtitle')}
          />

          <Label>
            {errors.content ? (
              <ErrorMessage>{errors.content.toString()}</ErrorMessage>
            ) : (
              'Comentário'
            )}
          </Label>
          <TextInputField
            placeholder='Digite um comentário'
            value={values.content}
            onChangeText={handleChange('content')}
            onBlur={handleBlur('content')}
            multiline
            numberOfLines={3}
          />

          <Button onPress={handleSubmit}>Criar</Button>

          <MapView
            initialRegion={initialCoords}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              // ...coords,
              latitudeDelta: coordsDelta,
              longitudeDelta: coordsDelta,
            }}
            showsUserLocation
            style={{ width: '100%', height: '50%' }}
            provider={PROVIDER_GOOGLE}
            onLongPress={(event) => {
              const coordsMap = event.nativeEvent.coordinate;
              setCoords({
                latitude: coordsMap.latitude,
                longitude: coordsMap.longitude,
              });
              setLocationMessage('Nova coordenada adicionada');
              Toast.show('Nova coordenada adicionada');
            }}
          >
            <MapMarker coordinate={coords} />
          </MapView>

          <LatLongText>
            latitude: {coords.latitude} / longitude:
            {coords.longitude}
          </LatLongText>
        </Container>
      )}
    </Formik>
  );
}
