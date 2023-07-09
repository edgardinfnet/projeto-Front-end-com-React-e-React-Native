import {
  Image,
  Text,
  View,
  TouchableHighlight,
  Linking,
  StyleSheet,
  FlatList,
} from 'react-native';
import { CardContainer } from './CardContainer';
import styled from 'styled-components/native';

const PresentationFlex = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const styles = StyleSheet.create({
  titleText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },

  commentText: {
    textAlign: 'justify',
    fontSize: 13,
  },

  linkText: {
    color: '#1e3799',
    textDecorationLine: 'underline',
  },

  marginText: {
    marginTop: 10,
  },
});

export function CardDescription() {
  return (
    <CardContainer>
      <View>
        <View>
          <Text style={styles.titleText}>
            Projeto referente a disciplina de Front-end com React e React
            Native.
          </Text>
        </View>
        <View style={styles.marginText}>
          <Text style={styles.commentText}>
            No projeto foi criado um aplicativo com um módulo CRUD para bloco de
            notas com sua localização afim de atender as rubricas da disciplina.
          </Text>
        </View>

        <View style={styles.marginText}>
          <Text style={styles.commentText}>
            Todo projeto foi desenvolvido com as tecnologias de abordadas pelo
            professor Eduardo Gabriel Velho durante suas aulas e pelos monitores
            nas monitorias. Foi utilizada a IDE Visual Studio Code e os códigos
            fonte podem ser acessado no repositório do GitHub abaixo:
          </Text>
        </View>

        <TouchableHighlight
          underlayColor='#DDDDDD'
          onPress={() =>
            Linking.openURL(
              'https://github.com/edgardinfnet/projeto-Front-end-com-React-e-React-Native'
            )
          }
        >
          <Text style={styles.linkText}>
            https://github.com/edgardinfnet/projeto-Front-end-com-React-e-React-Native
          </Text>
        </TouchableHighlight>

        <View style={styles.marginText}>
          <Text style={styles.commentText}>
            Rio de Janeiro, 09 de junho de 2023.
          </Text>
        </View>
        <View style={styles.marginText}>
          <Text style={styles.commentText}>Edgard Araujo de Oliveira.</Text>
        </View>
      </View>
    </CardContainer>
  );
}
