// Import React and Component
import React, {useState, createRef} from 'react';
import {View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
 
const ChangePassScreen = () => {
  const [userPassword1, setUserPassword1] = useState('');
  const [userPassword2, setUserPassword2] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  AsyncStorage.getItem('user_id').then((value) => {
    setUserId(value);
  });

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userPassword1) {
      alert('Please fill password');
      return;
    }
    if (!userPassword2) {
      alert('Please fill password confirmation');
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/user/changepass/?id=' + userId + '&password=' + userPassword1,
    {
    	method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson?.length != 0) {
            alert('Password changed');
            setUserPassword1('');
            setUserPassword2('');
            console.log('Password changed');
        } else {
          setErrortext("Error on change password");
          console.log('Error on change password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 5}}>
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
            ENTER NEW PASSWORD
          </Text>
        </View>
        <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword1) =>
                  setUserPassword1(userPassword1)
                }
                placeholder="Enter New Password"
                placeholderTextColor="grey"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                clearButtonMode= "always"
              />
        </View>
        <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword2) =>
                  setUserPassword2(userPassword2)
                }
                placeholder="Repeat New Password"
                placeholderTextColor="grey"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                clearButtonMode= "always"
              />
        </View>
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
 
export default ChangePassScreen;

const styles = StyleSheet.create({
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: 'white',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 250,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: 'white',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'black',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
  });