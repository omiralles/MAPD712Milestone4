// Import React
import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/UserHomeScreen';
import ProfileScreen from './DrawerScreens/UserProfileScreen';
import ScheduleScreen from './DrawerScreens/UserSchedule';
import ChangePassScreen from './DrawerScreens/UserChangePassword';
import RecordsScreen from './DrawerScreens/UserRecords';
import ServicesScreen from './DrawerScreens/Services';
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
 
const ProfileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'USER PROFILE', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ScheduleScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ScheduleScreen"
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
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          title: 'SERVICE SCHEDULE', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ServicesScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ServicesScreen"
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
        name="ServicesScreen"
        component={ServicesScreen}
        options={{
          title: 'USER SERVICES', //Set Header Title
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
          title: 'CHANGE PASSWORD', //Set Header Title
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
          title: 'USER RECORDS', //Set Header Title
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
        name="ScheduleScreenStack"
        options={{drawerLabel: 'SERVICE SCHEDULE'}}
        component={ScheduleScreenStack}
      />
      <Drawer.Screen
        name="ServicesScreenStack"
        options={{drawerLabel: 'MY SERVICES'}}
        component={ServicesScreenStack}
      />
      <Drawer.Screen
        name="RecordsScreenStack"
        options={{drawerLabel: 'MY RECODS'}}
        component={RecordsScreenStack}
      />
       <Drawer.Screen
        name="ChangePassScreenStack"
        options={{drawerLabel: 'CHANGE PASSWORD'}}
        component={ChangePassScreenStack}
      />
      <Drawer.Screen
        name="ProfileScreenStack"
        options={{drawerLabel: 'MY PROFILE'}}
        component={ProfileScreenStack}
      />
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
