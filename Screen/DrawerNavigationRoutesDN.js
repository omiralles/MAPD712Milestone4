// Import React
import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/DNHomeScreen';
import ResidentsScreen from './DrawerScreens/DNResidents';
import RecordsScreen from './DrawerScreens/DNRecords';
import CreateRecordScreen from './DrawerScreens/CreateRecord';
import ChangePassScreen from './DrawerScreens/UserChangePassword';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'HOME', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ResidentsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ResidentsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#ffffff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ResidentsScreen"
        component={ResidentsScreen}
        options={{
          title: 'RESIDENTS LIST', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const RecordsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="RecordsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#ffffff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="RecordsScreen"
        component={RecordsScreen}
        options={{
          title: 'MODIFY/DELETE RECORDS', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const CreateRecordScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="CreateRecordScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#ffffff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="CreateRecordScreen"
        component={CreateRecordScreen}
        options={{
          title: 'CREATE RECORD', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
 
const ChangePassScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ChangePassScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#ffffff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ChangePassScreen"
        component={ChangePassScreen}
        options={{
          title: 'CHAGE PASSWORD', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'HOME'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="ResidentsScreenStack"
        options={{drawerLabel: 'RESIDENTS'}}
        component={ResidentsScreenStack}
      />
      <Drawer.Screen
        name="RecordsScreenStack"
        options={{drawerLabel: 'PATIENT RECORDS'}}
        component={RecordsScreenStack}
      />
      <Drawer.Screen
        name="CreateRecordScreenStack"
        options={{drawerLabel: 'CREATE RECORD'}}
        component={CreateRecordScreenStack}
      />
      <Drawer.Screen
        name="ChangePassScreenStack"
        options={{drawerLabel: 'CHANGE PASSWORD'}}
        component={ChangePassScreenStack}
      />
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;