// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
 
const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [userSIN, setUserSIN] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

 
    AsyncStorage.getItem('user_id').then((value) => {
      setUserId(value);
      if ((userId != '') && (!dataLoaded)) {
        fetchData();
        setDataLoaded(true);
      }
    });

  const fetchData = () => {
    console.log(userId)
    fetch('http://localhost:3000/resident/byid/' + userId ,
    {
    	method: "GET",
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
            setUserName(responseJson[0].completename);
            setUserSIN(responseJson[0].sin);
            setUserAddress(responseJson[0].address);
            setUserPhone(responseJson[0].phone);
            setUserCity(responseJson[0].city);
            setUserAge(responseJson[0].age);
            console.log('Value retrieve');
        } else {
          setErrortext("No data found");
          console.log('No data found');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
    }

    const handleSubmitButton = () => { 
      setErrortext('');
      setLoading(true);
      fetch('http://localhost:3000/residents/?user_id=' + userId + '&completename=' + userName + '&address=' + userAddress + 
      '&city=' + userCity +'&phone=' + userPhone + '&age=' + userAge + '&sin=' + userSIN ,
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
              alert('Data changed');
              console.log('Data changed');
          } else {
            setErrortext("Error on changing data");
            console.log('Error on changing data');
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
            MODIFY PROFILE
          </Text>
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Complete Name
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userName) =>
              setUserName(userName)
            }
            value={userName}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              SIN Number
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userSIN) =>
              setUserSIN(userSIN)
            }
            value={userSIN}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Address
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userAddress) =>
              setUserAddress(userAddress)
            }
            value={userAddress}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              City
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userCity) =>
              setUserCity(userCity)
            }
            value={userCity}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Phone
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userPhone) =>
              setUserPhone(userPhone)
            }
            value={userPhone}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Age
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(userAge) =>
              setUserAge(userAge)
            }
            value={userAge}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>SAVE CHANGES</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
 
export default ProfileScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
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