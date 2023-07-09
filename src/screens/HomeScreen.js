import { View, Text } from 'react-native';
import { CardPresetation } from '../components/CardPresentation';
import { LogoReact } from '../components/LogoReact';
import { CardDescription } from '../components/CardDescription';

export function HomeScreen() {
  return (
    <View>
      <LogoReact></LogoReact>

      <CardPresetation></CardPresetation>

      <CardDescription></CardDescription>
    </View>
  );
}
