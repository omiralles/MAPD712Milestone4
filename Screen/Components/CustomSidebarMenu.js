// Import React and Component
import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
 
import AsyncStorage from '@react-native-community/async-storage';
import { Value } from 'react-native-reanimated';

const CustomSidebarMenu = (props) => {
const [userName, setUserName] = useState('');
const [profileName, setUserProfile] = useState('');

  AsyncStorage.getItem('user_name').then((value) => {
    setUserName(value);
  });

  AsyncStorage.getItem('profile').then((value) => {
    setUserProfile(value);
  });

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25,color: 'white'}}>
            {profileName.slice(0,1)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          {userName}
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
 
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => 
            <Text style={{color: '#FF0000'}}>
              LOGOUT
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};
 
export default CustomSidebarMenu;
 
const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 40,
    color: 'black',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: '#307ecc',
    backgroundColor: '#307ecc',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: '#307ecc',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#307ecc',
    marginTop: 15,
  },
});
