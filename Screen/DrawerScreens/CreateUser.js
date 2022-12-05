// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Keyboard,
    DropDown,
} from 'react-native';

import SelectList from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
 
const CreateUserScreen = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);
 
  const emailInputRef = createRef();
  const passInputRef = createRef();
  const nameInputRef = createRef();

  const data = [
    {key: "Patient", value: "Patient"},
    {key: "Administrator", value: "Administrator"},
    {key: "Doctor", value: "Doctor"},
    {key: "Nurse", value: "Nurse"}
  ]

  const clearData = () => {
    setEmail('');
    setPassword('');
    setUserName('');
    setSelected('');
  }

    const handleSubmitButton = () => {
        setErrortext('');
        if (!email) {
          alert('Please fill Email');
          return;
        }
        if (!password) {
          alert('Please fill Password');
          return;
        }
        if (!userName) {
            alert('Please fill a user name');
            return;
        }
        if (!selected) {
        alert('Please fill a profile');
        return;
        }
        //Show Loader
        setLoading(true);
        fetch('http://localhost:3000/users/?name=' + userName + '&email=' + email + '&password=' + password + '&profile=' + selected , {
          method: 'POST',
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
              fetch('http://localhost:3000/user/login/?email=' + email + '&password=' + password,
              {
                method: "GET",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
              })
                .then((response) => response.json())
                .then((responseJson) => { 
                  console.log(responseJson);
                  if ((responseJson?.length != 0) && (selected == "Patient")) {
                    fetch('http://localhost:3000/residents/?user_id=' + responseJson[0].id , {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    })
                  }
                }),
              setIsRegistraionSuccess(true);
              clearData();
              console.log(
                'Creation Successful.'
              );
            } else {
              setErrortext('Creation fail.');
            }
          })
          .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
          });
      };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{ marginTop: 40, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              E-Mail
            </Text>
        </View>
        <View style={styles.SectionStyle}>
            <TextInput
                style={styles.inputStyle}
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                autoCapitalize="none"
                onChangeText={(email) =>
                    setEmail(email)
                }
                value={email}
                underlineColorAndroid="#f000"
                returnKeyType="next"
            />
        </View>
        <View style={{ marginTop: 10, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              User Name
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={(userName) =>
                setUserName(userName)
              }
            value={userName}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={{ marginTop: 5, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Password
            </Text>
        </View>
        <View style={styles.SectionStyle}>
        <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={(password) =>
                setPassword(password)
              }
            value={password}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={{ marginTop: 40, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Profile
            </Text>
        </View>
        <View style={{ marginTop: 5, marginLeft: 35, flexDirection: "row" }}>
        <SelectList
            data={data}
            setSelected = {setSelected}
          />
        </View>
        </ScrollView>
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>SAVE CHANGES</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
 
export default CreateUserScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
  },
  CommentStyle: {
    flexDirection: 'row',
    height: 150,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
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
    marginTop: 50,
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
  inputCommentStyle: {
    flex: 1,
    color: 'black',
    padding: 15,
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
  selectStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: 'white',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 30,
  },
  buttonSelectTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 10,
    margin: 5,
  },
});