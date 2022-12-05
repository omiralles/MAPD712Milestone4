import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';

class UsersCell extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {name: this.props.name, 
      email: this.props.email,
      password: this.props.password,
      profile: this.props.profile
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
            fetch('http://localhost:3000/users/?id=' + this.props.id + '&name=' + this.state.name + '&email=' + this.state.email + 
            '&profile=' + this.state.profile ,
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
                    Alert.alert('Changes saved');
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
      'Delete user',
      'Are you sure do you want to delete the user?',
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
            fetch('http://localhost:3000/user/' + this.props.id ,
            {
                method: "DELETE",
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
                Alert.alert('User deleted');
                console.log('Data changed');
            } else {
                setErrortext("Error on deleting data");
                console.log('Error on deleting data');
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

  render() {   
    return (
      <View style={styles.CellContainer}>
        <Image source = {require("../../Image/img-avatar-example4.png")} style = {styles.CellIcon}/>
        <View style={styles.CellDataContainer} margin={10}>
          <Text style={{fontWeight: "bold"}}>Name:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.name} onChangeText={(name) => this.setState({name})} />
          <Text>E-Mail:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.email} onChangeText={(email) => this.setState({email})} />
          <Text>Password:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.password} onChangeText={(password) => this.setState({password})} />
          <Text>Profile:</Text>
          <TextInput style={{backgroundColor: '#DCDCDC'}} value={this.state.profile} onChangeText={(profile) => this.setState({profile})} />
          <View style={styles.CellButtons}>
            <Button title='Save' onPress={()=> this.saveData()}/>
            <Button title='Delete' onPress={()=> this.deleteData()}/>
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
  CellButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginRight: 30,
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

export default UsersCell;