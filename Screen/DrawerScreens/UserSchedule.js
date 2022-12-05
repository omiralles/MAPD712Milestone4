// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Keyboard,
    Button
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
 
const ScheduleScreen = () => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [speciality, setSelected] = useState('');
  const [center, setSelectedCenter] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  AsyncStorage.getItem('user_id').then((value) => {
    setUserId(value);
  });

  function showDatePicker() {
    if (!datePicker){
      setDatePicker(true);
    } else {
      setDatePicker(false);
    }
  };

  function showTimePicker() {
    if (!timePicker) {
      setTimePicker(true);
    } else {
      setTimePicker(false);
    }
  };

  function onDateSelected(event, value) {
    setDate(value);
  };

  function onTimeSelected(event, value) {
    setTime(value);
  };
  
  const data = [
    {key:"Family Medicine", value: "Family Medicine"},
    {key:"Urgency Medicine", value: "Urgency Medicine"},
    {key:"Dermatology", value: "Dermatology"},
    {key:"Diacnostic Radiology", value: "Diacnostic Radiology"},
    {key:"Pediatrics", value: "Pediatrics"}
  ];

  const dataCenter = [
    {key:"Toronto North", value: "Toronto North"},
    {key:"Toronto South", value: "Toronto South"},
    {key:"Toronto East", value: "Toronto East"},
    {key:"Toronto West", value: "Toronto West"}
  ];

  const clearData= () => {
    setSelected('');
    setSelectedCenter('');
  }

  const handleSubmitButton = () => { 
    var day = date.toDateString() + ' ' + time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    console.log(day);
    console.log(speciality);
    console.log(center);
    setErrortext('');
    if (!speciality) {
      alert('Please fill a speciality');
      return;
    }
    if (!center) {
      alert('Please fill a center');
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/services/?user_id=' + userId + '&day=' + day + '&speciality=' + speciality + 
      '&center=' + center ,
    {
    	method: "POST",
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
        clearData();
        alert('New appointment created');
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
      <View>
          <View style={{ marginTop: 35, marginLeft: 35, flexDirection: "row" }}>
            <Text style={{marginTop: 10}}>DATE</Text>
            <Text style={styles.inputStyle}>{date.toDateString()}</Text>
            <TouchableOpacity
              style={styles.selectStyle}
              activeOpacity={0.5}
              onPress={showDatePicker}>
              <Text style={styles.buttonSelectTextStyle}>SELECT</Text>
            </TouchableOpacity>
          </View>

          {datePicker && (<DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />)}

          <View style={{ marginTop: 30, marginLeft: 35, flexDirection: "row" }}>
            <Text  style={{marginTop: 10}}>HOUR</Text>
            <Text style={styles.inputStyle}>{time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
            <TouchableOpacity
              style={styles.selectStyle}
              activeOpacity={0.5}
              onPress={showTimePicker}>
              <Text style={styles.buttonSelectTextStyle}>SELECT</Text>
            </TouchableOpacity>
          </View>
          
          {timePicker && (<DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
          />)}
        </View>

        <View style={{ marginTop: 40, marginLeft: 35, flexDirection: "row" }}>
        <Text
            style={{
              fontSize: 15,
              marginBottom: 15,
              marginTop: 15,
              marginRight: 30,
            }}>
            Speciality
          </Text>
          <SelectList
            data={data}
            setSelected = {setSelected} 
          />
        </View>
        <View style={{ marginTop: 40, marginLeft: 35, flexDirection: "row" }}>
        <Text
            style={{
              fontSize: 15,
              marginBottom: 15,
              marginTop: 15,
              marginRight: 50,
            }}>
            Center
          </Text>
          <SelectList
            data={dataCenter}
            setSelected = {setSelectedCenter} 
          /> 
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmitButton}>
        <Text style={styles.buttonTextStyle}>INTRODUCE APPOINTMENT</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};
 
export default ScheduleScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'column',
    height: 200,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 20,
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
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonSelectTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 10,
    margin: 5,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    textAlign: "center",
    padding:10,
    marginLeft: 10,
    width:40,
    height: 40,
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
  ScheduleContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'white',
    alignItems: 'center', 
  },
 
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});