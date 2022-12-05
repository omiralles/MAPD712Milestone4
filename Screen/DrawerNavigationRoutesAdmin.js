// Import React
import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/AdminHomeScreen';
import UserMngtScreen from './DrawerScreens/AdminUserMngt';
import PatientsMngtScreen from './DrawerScreens/AdminPatientsMngt';
import RecordsMngtScreen from './DrawerScreens/DNRecords'
import CreateUserScreen from './DrawerScreens/CreateUser';
import CreateRecordScreen from './DrawerScreens/CreateRecord';
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
 
const UsersScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="UserMngtScreen"
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
        name="UserMngtScreen"
        component={UserMngtScreen}
        options={{
          title: 'USER MANAGEMENT', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const CreateUserScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="CreateUserScreen"
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
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{
          title: 'CREATE USER', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const PatientsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="PatientsMngtScreen"
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
        name="PatientsMngtScreen"
        component={PatientsMngtScreen}
        options={{
          title: 'PATIENTS MANAGEMENT', //Set Header Title
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
 
const RecordsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="RecordsMngtScreen"
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
        name="RecordsMngtScreen"
        component={RecordsMngtScreen}
        options={{
          title: 'RECORS MANAGEMENT', //Set Header Title
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
        name="UsersScreenStack"
        options={{drawerLabel: 'USERS MANAGEMENT'}}
        component={UsersScreenStack}
      />
      <Drawer.Screen
        name="CreateUserScreenStack"
        options={{drawerLabel: 'CREATE USER'}}
        component={CreateUserScreenStack}
      />
       <Drawer.Screen
        name="atientsScreenStack"
        options={{drawerLabel: 'PATIENTS MANAGEMENT'}}
        component={PatientsScreenStack}
      />
       <Drawer.Screen
        name="CreateRecordScreenStack"
        options={{drawerLabel: 'CREATE RECORD'}}
        component={CreateRecordScreenStack}
      />
      <Drawer.Screen
        name="RecordsScreenStack"
        options={{drawerLabel: 'RECORDS MANAGEMENT'}}
        component={RecordsScreenStack}
      />
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;