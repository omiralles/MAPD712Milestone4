/**
 * Autors;
 * Student Name: Oscar Miralles Fernandez
 * Student ID: 301250756
 * Student Name: Carlos Hernandez Galvan
 * Student ID: 301290263
 */

// Example of Splash, Login and Sign Up in React Native
import 'react-native-gesture-handler';
 
// Import React and Component
import React from 'react';
 
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutesUser from './Screen/DrawerNavigationRoutesUser';
import DrawerNavigationRoutesAdmin from './Screen/DrawerNavigationRoutesAdmin';
import DrawerNavigationRoutesDN from './Screen/DrawerNavigationRoutesDN';
 
const Stack = createStackNavigator();
 
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: 'white', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutesUser"
          component={DrawerNavigationRoutesUser}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
         {/* Navigation Drawer as a landing page */}
         <Stack.Screen
          name="DrawerNavigationRoutesAdmin"
          component={DrawerNavigationRoutesAdmin}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
         {/* Navigation Drawer as a landing page */}
         <Stack.Screen
          name="DrawerNavigationRoutesDN"
          component={DrawerNavigationRoutesDN}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
