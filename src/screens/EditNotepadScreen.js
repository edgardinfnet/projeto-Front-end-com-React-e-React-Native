import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import { notepadSchema } from '../notepadSchema';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { TextInputField } from '../components/TextField';
import { Label } from '../components/Label';
import { ErrorMessage } from '../components/ErrorMessage';
import { TextSmall } from '../components/TextSmall';

const initValues = {
  title: 'teste',
  subtitle: 'testando',
  content: 'mais teste e outro teste',
};

const initValuesNotepad = {
  id: 0,
  title: '',
  subtitle: '',
  content: '',
  created_at: '',
  latitude: 0,
  longitude: 0,
};

const ButtonConfirm = styled(Button)`
  background-color: #3c6382;
`;

export function EditNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [notepad, setNotepad] = useState(initValuesNotepad);

  async function loadNotepad() {
    try {
      const response = await api.get(`/notepads/${notepadId}`);
      setId(response.data.id);
      setTitle(response.data.title);
      setSubtitle(response.data.subtitle);
      setContent(response.data.content);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setNotepad(response.data);

      // console.log(response.data);
    } catch (error) {
      console.log(error);
      Toast.show('Ocorreu um erro :(');
    }
  }

  async function onSubmit(
    { title, subtitle, content, latitude, longitude },
    { resetForm }
  ) {
    try {
      if (latitude === undefined || longitude === undefined) {
        const response = await api.patch(`/notepads/${notepadId}`, {
          title,
          subtitle,
          content,
        });
      } else {
        const response = await api.patch(`/notepads/${notepadId}`, {
          title,
          subtitle,
          content,
          latitude,
          longitude,
        });
      }
      resetForm({});
      Toast.show('Anotação atualizado com sucesso :)');
      // navigation.navigate(screens.viewNotepad, {
      //   notepadId,
      // });
      navigation.navigate(screens.listNotepads);
    } catch (error) {
      Toast.show('Ocorreu um erro inexperado :(');
      console.log(error);
    }
  }

  // function onPressViewNotepad(id) {
  //   navigation.navigate(screens.viewNotepad, {
  //     notepadId,
  //   });
  // }

  async function onPressSaveNotepad(x) {
    if (latitude === undefined) {
      console.log('if: ', latitude);
    } else {
      console.log('else: ', latitude);
    }
    //console.log(x);
    // const response = await api.patch(`/notepads/${notepadId}`, {
    //   title: 'Teste 002',
    //   subtitle: 'Tóquio Japão 002',
    //   content: 'Teste edit Tóquio Japão 002',
    //   // latitude: 0,
    //   // longitude: 0,
    // });
    // Toast.show('Editado com sucesso :)');
    // // navigation.goBack();
    // // onPressViewNotepad(notepadId);
  }

  useEffect(() => {
    // resetForm({});

    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          title,
          subtitle,
          content,
          latitude,
          longitude,
        }}
        validationSchema={notepadSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Container>
            {/* <Text>teste: {longitude === undefined ? 'é' : 'não'}</Text> */}
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

            <TextSmall>
              lat: {latitude === undefined ? 'indefinido' : latitude} / long:{' '}
              {longitude === undefined ? 'indefinido' : longitude}
            </TextSmall>

            {/* <Label>Latitude</Label>
            {latitude === undefined ? (
              <Text>Latitude indefinida</Text>
            ) : (
              <TextInputField value={latitude.toString()} editable={false} />
            )}

            <Label>Longitude</Label>
            {longitude === undefined ? (
              <Text>Longitude indefinido</Text>
            ) : (
              <TextInputField value={longitude.toString()} editable={false} />
            )} */}

            {/* <TouchableOpacity onPress={() => onPressSaveNotepad(values)}>
              <Text>------------</Text>
              <Text>Teste</Text>
              <Text>------------</Text>
            </TouchableOpacity> */}

            <ButtonConfirm onPress={handleSubmit}>Salvar</ButtonConfirm>

            {latitude !== undefined && longitude !== undefined && (
              <MapView
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                showsUserLocation
                style={{ width: '100%', height: '50%' }}
                provider={PROVIDER_GOOGLE}
                onLongPress={(event) => {
                  const coordsMap = event.nativeEvent.coordinate;
                  setLatitude(coordsMap.latitude);
                  setLongitude(coordsMap.longitude);
                  Toast.show('Nova coordenada adicionada');
                }}
              >
                <MapMarker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                />
              </MapView>
            )}
          </Container>
        )}
      </Formik>
    </Container>
  );
}
