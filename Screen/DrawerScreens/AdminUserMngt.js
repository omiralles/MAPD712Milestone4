// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {View, 
    Text, 
    SafeAreaView, 
    StyleSheet,
    ScrollView,
    FlatList, 
    TextInput, 
    TouchableOpacity,
    Keyboard
} from 'react-native';
import filter from 'lodash.filter';

import ResidentCell from './UsersCell'

import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
 
const AdminUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    fetchData()
  },[]);

  const handleSearch = text => {
    const filteredData = filter(users, user => {
      return contains(user, text);
    });
    if (text != '') {
      setUsersFilter(filteredData);
    } else {
      setUsersFilter(users);
    }
    setQuery(text);
  };
  
  const contains = ({ email, name }, query) => {
    if (email.includes(query) || name.includes(query)) {
      return true;
    }
  
    return false;
  };

  const fetchData = () => {
    setRefreshing(true);
    fetch('http://localhost:3000/users/' ,
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
          setRefreshing(false);
          setUsers(responseJson);
          setUsersFilter(responseJson);
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

    const renderItem = ({ item }) => (
        <ResidentCell id={item.id} name={item.name} email={item.email} password={item.password} profile={item.profile}/>
      );

  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
          <View
              style={{
                backgroundColor: '#F5F5F5',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                clearButtonMode= "always"
                placeholderTextColor="grey"
                placeholder='Search by email / name'
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                style={{
                  borderRadius: 30,
                  borderColor: '#000',
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  width: 350,
                  height: 50,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                textStyle={{ color: '#000' }}
              />
            </View>
          <FlatList
            data={usersFilter}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          />
        </View>
    </SafeAreaView>
 );
};
 
export default AdminUsersScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 30,
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