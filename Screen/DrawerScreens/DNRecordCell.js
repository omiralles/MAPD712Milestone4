import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Image,
  Alert
} from 'react-native';

class ResidentCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {bloodPress: this.props.bloodPressure, 
      respRate: this.props.respiratoryRate,
      bloodOx: this.props.bloodOxygen,
      hBeat: this.props.heartBeat,
      cmmt: this.props.comment
    };
  }
  
  saveData = () => {
    Alert.alert(
      'Save record',
      'Are you sure do you want save the changes?',
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
            fetch('http://localhost:3000/residentRecords/?id=' + this.props.id + '&user_id=' + this.props.userid + '&completename=' + this.props.completename + 
              '&sin=' + this.props.sin + '&day=' + this.props.recordDate + '&blood_pressure=' + this.state.bloodPress + 
              '&respiration_rate=' + this.state.respRate + '&blood_oxygen=' + this.state.bloodOx + 
              '&heart_beat=' + this.state.hBeat + '&comment=' + this.state.cmmt ,
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
                  console.log(responseJson);
                  // If server response message same as Data Matched
                  if (responseJson?.length != 0) {
                      Alert.alert('Data saved');
                      console.log('Data saved');
                  } else {
                  setErrortext("Error on changing data");
                  console.log('Error on changing data');
                  }
              })
              .catch((error) => {
                  //Hide Loader
                  console.error(error);
              })
          },
        },
      ],
      {cancelable: false},
    );
  }

  deleteData = () => {
    Alert.alert(
      'Delete record',
      'Are you sure do you want delete this record?',
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
            fetch('http://localhost:3000/residentRecords/' + this.props.id ,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
            //Hide Loader
              Alert.alert('Record deleted');
              console.log('Data changed');
            })
            .catch((error) => {
            //Hide Loader
            console.error(error);
            })
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.CellContainer}>
        <Image source = {require("../../Image/heartrate.png")} style = {styles.CellIcon}/>
        <View style={styles.CellDataContainer} margin={10}>
          <Text style={{fontWeight: "bold"}}>Day: {this.props.recordDate}</Text>
          <Text>Complete name: {this.props.completename}</Text>
          <Text>SIN: {this.props.sin}</Text>
          <Text style={{fontWeight: "bold"}}>Blood pressure:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.bloodPress} onChangeText={(bloodPress) => this.setState({bloodPress})} />
          <Text style={{fontWeight: "bold"}}>Respiration rate:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.respRate} onChangeText={(respRate) => this.setState({respRate})} />
          <Text style={{fontWeight: "bold"}}>Blood oxygen:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.bloodOx} onChangeText={(bloodOx) => this.setState({bloodOx})} />
          <Text style={{fontWeight: "bold"}}>Heart beat:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.hBeat} onChangeText={(hBeat) => this.setState({hBeat})} />
          <Text style={{fontWeight: "bold"}}>Comment:</Text>
          <TextInput style={styles.Input} multiline={true} value={this.state.cmmt} onChangeText={(cmmt) => this.setState({cmmt})} />
          <View style={styles.CellButtons}>
            <Button title='Save' onPress={()=> this.saveData()} />
            <Button title='Delete' onPress={()=> this.deleteData()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CellAccessory: {
    width: 30,
    height: 30,
  },
  CellContainer: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    minHeight: 150,
  },
  CellButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginRight: 30,
  },
  Input: {
    height: 60,
    backgroundColor: '#DCDCDC',
  },
  CellDataContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  CellIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  }, 
  ResidentCell: {
    margin: 5,
    backgroundColor: '#bbb',
    borderWidth:2,
    borderRadius: 10,
    minHeight: 100,
  }
});

export default ResidentCell;