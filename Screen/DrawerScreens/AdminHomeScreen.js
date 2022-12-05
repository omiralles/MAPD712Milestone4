// Import React and Component
import React, { useState } from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
 
const AdminHomeScreen = () => {
  const [userName, setUserName] = useState('');
  const [profile, setUserProfile] = useState('');

  AsyncStorage.getItem('user_name').then((value) => {
    setUserName(value);
  });
  AsyncStorage.getItem('profile').then((value) => {
    setUserProfile(value);
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
            source={require('../../Image/img-avatar-example4.png')}
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'contain',
              margin: 30,
            }}/>
       </View>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Hi {profile} {userName}, {'\n'}
            Wellcome to your personal area. In this area you can manage patients, users and records. {'\n'}
            In this area you can also create new application users.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
 
export default AdminHomeScreen;
