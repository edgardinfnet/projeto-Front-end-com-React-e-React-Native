import {
  Image,
  Text,
  View,
  TouchableHighlight,
  Linking,
  StyleSheet,
} from 'react-native';
import { CardContainer } from './CardContainer';
import styled from 'styled-components/native';
// import { Button } from './Button';

// @ts-ignore
const LogoInfnet = require('../../assets/img/infnet.jpeg');

const PresentationFlex = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const styles = StyleSheet.create({
  upperText: {
    textTransform: 'uppercase',
  },
  linkText: {
    color: '#1e3799',
    textDecorationLine: 'underline',
  },
});

export function CardPresetation() {
  return (
    <CardContainer>
      <PresentationFlex>
        <View>
          <Image source={LogoInfnet}></Image>
        </View>
        <View>
          <TouchableHighlight
            underlayColor='#DDDDDD'
            onPress={() =>
              Linking.openURL('https://www.infnet.edu.br/infnet/instituto/')
            }
          >
            <Text style={styles.linkText}>Instituto Infnet</Text>
          </TouchableHighlight>
          <Text style={styles.upperText}>Edgard Araujo de Oliveira</Text>
          <TouchableHighlight
            underlayColor='#DDDDDD'
            onPress={() =>
              Linking.openURL('mailto:edgard.araujo@al.infnet.edu.br')
            }
          >
            <Text style={styles.linkText}>edgard.araujo@al.infnet.edu.br</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#DDDDDD'
            onPress={() =>
              Linking.openURL(
                'https://institutoinfnet.com.br/cursos/bootcamp/desenvolvedor-front-end-react/'
              )
            }
          >
            <Text style={styles.linkText}>
              Bootcamp Desenvolvedor Web Full Stack
            </Text>
          </TouchableHighlight>
          <Text>Turma: [1T23] Noite</Text>
          <Text>Projeto de interfaces com React </Text>
          <TouchableHighlight
            underlayColor='#DDDDDD'
            onPress={() =>
              Linking.openURL('mailto:eduardo.velho@prof.infnet.edu.br')
            }
          >
            <Text style={styles.linkText}>Professor Eduardo Gabriel Velho</Text>
          </TouchableHighlight>
        </View>
      </PresentationFlex>
    </CardContainer>
  );
}
