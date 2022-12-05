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

import ServiceUserCell from './UserServiceCell'
import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
 
const ProfileScreen = () => {
  const [userId, setUserId] = useState('');
  const [services, setServices] = useState([]);
  const [servicesFilter, setServicesFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  AsyncStorage.getItem('user_id').then((value) => {
    if (!dataLoaded) {
      setUserId(value);
      fetchData();
      setDataLoaded(true);
    }
  });

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(services, day => {
      return contains(day, formattedQuery);
    });
    if (text != '') {
      setServicesFilter(filteredData);
    } else {
      setServicesFilter(services);
    }
    setQuery(text);
  };
  
  const contains = ({ day, speciality, center }, query) => {
    if (day.includes(query || speciality.includes(query) || center.includes(query))) {
      return true;
    }
  
    return false;
  };

  const fetchData = () => {
    setRefreshing(true);
    fetch('http://localhost:3000/services/?user_id=' + userId ,
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
          setServices(responseJson);
          setServicesFilter(responseJson);
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
        <ServiceUserCell id={item.id} servDate={item.day} servSpeciality={item.speciality} servCenter={item.center}/>
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
                placeholder='Search by day / speciality / center'
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
            data={servicesFilter}
            renderItem={renderItem}
            keyExtractor={item => item.day}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          />
        </View>
    </SafeAreaView>
 );
};
 
export default ProfileScreen;

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