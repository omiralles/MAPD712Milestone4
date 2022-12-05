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

class AdminResidentCell extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {completename: this.props.completename, 
      sin: this.props.sin,
      address: this.props.address,
      city: this.props.city,
      phone: this.props.phone,
      age: this.props.age
    };
  }

  saveData = () => {
    Alert.alert(
      'Save changes',
      'Are you sure do you want to save the changes?',
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
            fetch('http://localhost:3000/residents/?user_id=' + this.props.userid + '&completename=' + this.state.completename + '&address=' + this.state.address + 
            '&city=' + this.state.city + '&phone=' + this.state.phone + '&age=' + this.state.age + '&sin=' + this.state.sin ,
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
      'Delete resident',
      'Are you sure do you want to delete the resident?',
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
            fetch('http://localhost:3000/residents/' + this.props.id ,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
            //Hide Loader
              Alert.alert('Resident deleted');
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
        <Image source = {require("../../Image/img-avatar-example4.png")} style = {styles.CellIcon}/>
        <View style={styles.CellDataContainer} margin={10}>
          <Text style={{fontWeight: "bold"}}>Name:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.completename} onChangeText={(completename) => this.setState({completename})} />
          <Text>SIN:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.sin} onChangeText={(sin) => this.setState({sin})} />
          <Text>Address:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.address} onChangeText={(address) => this.setState({address})} />
          <Text>City:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.city} onChangeText={(city) => this.setState({city})} />
          <Text>Phone:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.phone} onChangeText={(phone) => this.setState({phone})} />
          <Text>Age:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.age} onChangeText={(age) => this.setState({age})} />
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
    minHeight: 100,
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
  CellButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginRight: 30,
  },
  ResidentCell: {
    margin: 5,
    backgroundColor: '#bbb',
    borderWidth:2,
    borderRadius: 10,
    minHeight: 100,
  }
});

export default AdminResidentCell;