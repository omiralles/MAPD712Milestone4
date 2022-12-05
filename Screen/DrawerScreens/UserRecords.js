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
    Keyboard,
    VirtualizedList
} from 'react-native';
import filter from 'lodash.filter';

import UserRecordCell from './UserRecordCell'

import AsyncStorage from '@react-native-community/async-storage';
import { RefreshControl } from 'react-native-gesture-handler';
 
const RecordsScreen = () => {
  const [userId, setUserId] = useState('');
  const [records, setRecords] = useState([]);
  const [recordsFilter, setRecordsFilter] = useState([]);
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
    const filteredData = filter(records, day => {
      return contains(day, formattedQuery);
    });
    if (text != '') {
      setRecordsFilter(filteredData);
    } else {
      setRecordsFilter(records);
    }
    setQuery(text);
  };
  
  const contains = ({ day, sin, completename }, query) => {
    if (day.includes(query || sin.includes(query) || completename.includes(query))) {
      return true;
    }
  
    return false;
  };
  
  const fetchData = () => {
    setRefreshing(true);
    fetch('http://localhost:3000/residentRecords/' + userId ,
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
          setRecords(responseJson);
          setRecordsFilter(responseJson);
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
        <UserRecordCell sin={item.sin} recordDate={item.day} bloodPreaseure={item.blood_presure} respiratoryRate={item.respiration_rate}
        bloodOxygen={item.blood_oxygen} heartBeat={item.heart_beat} comment={item.comment}
         />
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
                placeholder='Search'
                placeholderTextColor="grey"
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                style={{
                  borderRadius: 30,
                  borderColor: '#000',
                  backgroundColor: 'white',
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
              data={recordsFilter}
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
 
export default RecordsScreen;

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