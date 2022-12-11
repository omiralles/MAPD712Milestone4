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
import DateTimePicker from '@react-native-community/datetimepicker';
 
const CreateRecordScreen = () => {
  const [residents, setResidents] = useState([]);
  const [resident, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [bloodP, setBloodPress] = useState('');
  const [respR, setRespRate] = useState('');
  const [bloodO, setBloodOxygen] = useState('');
  const [heartB, setHearBeat] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [completeName, setName] = useState('');
  const [userId, setUserId] = useState('');

  const data = []

  useEffect(()=>{
    fetchData()
  },[]);

  const clearData = () =>  {
    setBloodPress('');
    setBloodOxygen('');
    setRespRate('');
    setHearBeat('');
    setComment('');
    setName('');
    setSelected('');
  }

  const patientStatus = [
    {key:"Stable", value: "Stable"},
    {key:"Critical", value: "Critical"}
  ];

  for (var i in residents){
    data.push({key: residents[i].sin, value: residents[i].sin});
    }

    const sinSelected = () => {
      fetch('http://localhost:3000/resident/bysin/' + resident,
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
            setUserId(responseJson[0].user_id);
            setName(responseJson[0].completename);
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

  const fetchData = () => {
    fetch('http://localhost:3000/residents/',
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
            setResidents(responseJson);
            console.log(data);
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
      var day = date.toDateString() + ' ' + time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      setErrortext('');
      setLoading(true);
      fetch('http://localhost:3000/residentRecords/?user_id=' + userId + '&completename=' + completeName + '&sin=' + resident + 
      '&day=' + day + '&blood_pressure=' + bloodP +'&respiration_rate=' + respR + '&blood_oxygen=' + bloodO + 
      '&heart_beat=' + heartB + '&status=' + status + '&comment=' + comment ,
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
          // If server response message same as Data Matched
          if (responseJson?.length != 0) {
              alert('Record created');
              clearData();
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
      <ScrollView>
        <View style={{ marginTop: 40, marginLeft: 35, flexDirection: "row" }}>
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
        <View style={{ marginTop: 5, marginLeft: 35, flexDirection: "row" }}>
        <SelectList
            data={data}
            setSelected = {setSelected}
            width={50}
          />
         <TouchableOpacity
              style={styles.selectStyle}
              activeOpacity={0.5}
              onPress={sinSelected}>
              <Text style={styles.buttonSelectTextStyle}>GET USER NAME</Text>
            </TouchableOpacity>  
        </View>
        <View style={{ marginTop: 10, marginLeft: 35, flexDirection: "row" }}>
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
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            onChangeText={(completeName) =>
                setName(completeName)
              }
            value={completeName}
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
            Status
          </Text>
        </View>
        <View style={{ marginTop: 0, marginLeft: 35, flexDirection: "row" }}>
          <SelectList
            data={patientStatus}
            setSelected = {setStatus} 
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
              Day
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            value={date.toDateString()}
            onSubmitEditing={Keyboard.dismiss}
            focusable={false}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
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

        <View style={{ marginTop: 5, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Hour
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            value={time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            focusable={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
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
        <View style={{ marginTop: 5, marginLeft: 35, flexDirection: "row" }}>
          <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Blood pressure
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            onChangeText={(bloodP) =>
                setBloodPress(bloodP)
              }
            value={bloodP}
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
              Respiration Rate
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            onChangeText={(respR) =>
                setRespRate(respR)
              }
            value={respR}
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
              Blood Oxygen
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            onChangeText={(bloodO) =>
                setBloodOxygen(bloodO)
              }
            value={bloodO}
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
              Heart Beat
            </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            onChangeText={(heartB) =>
                setHearBeat(heartB)
              }
            value={heartB}
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
              Comment
            </Text>
        </View>
        <View style={styles.CommentStyle}>
          <TextInput
            style={styles.inputCommentStyle}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            multiline={true}
            onChangeText={(comment) =>
                setComment(comment)
              }
            value={comment}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        </ScrollView>
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>CREATE</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
 
export default CreateRecordScreen;

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
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});