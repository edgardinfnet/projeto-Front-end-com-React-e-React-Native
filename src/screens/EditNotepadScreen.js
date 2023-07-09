import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import { notepadSchema } from '../notepadSchema';
import { api } from '../../api';
import screens from '../../assets//json/screens.json';
import { useGlobalStore } from '../useGlobalStore';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { TextInputField } from '../components/TextField';
import { Label } from '../components/Label';
import { ErrorMessage } from '../components/ErrorMessage';
import { TextSmall } from '../components/TextSmall';
import { LoadingSimple } from '../components/LoadingSimple';

const ButtonConfirm = styled(Button)`
  background-color: #3c6382;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export function EditNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const isLoading = useGlobalStore((state) => state.isLoading);

  async function loadNotepad() {
    try {
      const response = await api.get(`/notepads/${notepadId}`);
      setTitle(response.data.title);
      setSubtitle(response.data.subtitle);
      setContent(response.data.content);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
    } catch (error) {
      console.log(error);
      Toast.show('Ocorreu um erro :(');
    }
  }

  async function onSubmit({ title, subtitle, content, latitude, longitude }) {
    //,{ resetForm }
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
      // resetForm({});
      Toast.show('Anotação atualizado com sucesso :)');
      navigation.navigate(screens.listNotepads);
    } catch (error) {
      Toast.show('Ocorreu um erro inexperado :(');
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <View>
      {isLoading && <LoadingSimple></LoadingSimple>}
      {!isLoading && (
        <Container>
          <Label>{isLoading}</Label>
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
                  lat: {latitude === undefined ? 'indefinido' : latitude} /
                  long: {longitude === undefined ? 'indefinido' : longitude}
                </TextSmall>

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
                      setTitle(values.title);
                      setSubtitle(values.subtitle);
                      setContent(values.content);
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
      )}
    </View>
  );
}
