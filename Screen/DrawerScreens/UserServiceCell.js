import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Button,
  Alert
} from 'react-native';

class ResidentCell extends React.Component {

  showCancel = () => {
    var serviceDate = new Date(this.props.servDate);
    var today = new Date(Date.now());
      
    if (serviceDate.getTime() >= today.getTime()) {
      return (
        <View style={styles.CellButtons}>
            <Button title='Cancel Service' onPress={()=> this.deleteData()} />
          </View>
      );

    }
    else {
      return null;
    }
  }

  deleteData = () => {
   Alert.alert(
      'Cancel service',
      'Are you sure do you want canel the service?',
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
            fetch('http://localhost:3000/services/' + this.props.id ,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
            //Hide Loader
              Alert.alert('Service canceled');
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
    var textColor = {};
    var serviceDate = new Date(this.props.servDate);
    var today = new Date(Date.now());
      
    if (serviceDate.getTime() < today.getTime()) {
      textColor = {color: 'red', fontWeight: "bold"};
    }
    else {
      textColor = {color: 'black', fontWeight: "bold"};
    }

    return (
      <View style={styles.CellContainer}>
        <Image source = {require("../../Image/Notepad.png")} style = {styles.CellIcon}/>
        <View style={styles.CellDataContainer}>
          <Text style={[this.props.style, textColor]}>Day: {this.props.servDate}</Text>
          <Text>Especiality: {this.props.servSpeciality}</Text>
          <Text>Center: {this.props.servCenter}</Text>
          {this.showCancel()}
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
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    minHeight: 100,
  },
  CellDataContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  CellButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 60
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