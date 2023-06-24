// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';

import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import screens from './assets/json/screens.json';
import textsLabel from './assets/json/textsLabel.json';

import { AcademicEducationScreen } from './src/screens/AcademicEducationScreen';
import { ContactScreen } from './src/screens/ContactScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ListNotepadScreen } from './src/screens/ListNotepadScreen';
import { ProExperienceScreen } from './src/screens/ProExperienceScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={screens.home}>
          <Drawer.Screen
            name={screens.home}
            component={HomeScreen}
            options={{
              headerTitle: textsLabel.homeLabel,
              drawerLabel: textsLabel.homeLabel,
            }}
          />
          <Drawer.Screen
            name={screens.proExperience}
            component={ProExperienceScreen}
            options={{
              headerTitle: textsLabel.proExperienceLabel,
              drawerLabel: textsLabel.proExperienceLabel,
            }}
          />
          <Drawer.Screen
            name={screens.academicEducation}
            component={AcademicEducationScreen}
            options={{
              headerTitle: textsLabel.academicEducationLabel,
              drawerLabel: textsLabel.academicEducationLabel,
            }}
          />
          <Drawer.Screen
            name={screens.contact}
            component={ContactScreen}
            options={{
              headerTitle: textsLabel.contactLabel,
              drawerLabel: textsLabel.contactLabel,
            }}
          />

          <Drawer.Screen
            name={screens.listNotepads}
            component={ListNotepadScreen}
            options={{
              headerTitle: textsLabel.listNotepadsLabel,
              drawerLabel: textsLabel.listNotepadsLabel,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
