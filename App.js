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
import { ViewNotepadScreen } from './src/screens/ViewNotepadScreen';
import { EditNotepadScreen } from './src/screens/EditNotepadScreen';
import { CreateNotepadCoordsScreen } from './src/screens/CreateNotepadCoordsScreen';
import { ConfirmScreen } from './src/screens/ConfirmScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={screens.home}
          // screenOptions={{
          //   drawerStyle: {
          //     backgroundColor: 'red',
          //     zIndex: 100,
          //   },
          // }}
        >
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

          <Drawer.Screen
            name={screens.createNotepadsCoords}
            component={CreateNotepadCoordsScreen}
            options={{
              headerTitle: textsLabel.createNotepadLabel,
              drawerLabel: textsLabel.createNotepadLabel,
            }}
          />

          <Drawer.Screen
            name={screens.viewNotepad}
            component={ViewNotepadScreen}
            options={{
              headerTitle: textsLabel.viewNotepadLabel,
              drawerLabel: textsLabel.viewNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
            }}
          />

          <Drawer.Screen
            name={screens.confirm}
            component={ConfirmScreen}
            options={{
              headerTitle: textsLabel.ConfirmLabel,
              drawerLabel: textsLabel.ConfirmLabel,
              drawerItemStyle: {
                height: 0,
              },
            }}
          />

          <Drawer.Screen
            name={screens.editNotepad}
            component={EditNotepadScreen}
            options={{
              headerTitle: textsLabel.editNotepadLabel,
              drawerLabel: textsLabel.editNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
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
