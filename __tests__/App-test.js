/**
 * @format
 */

import 'react-native';
import React from 'react';
//import App from '../App';
import Login from '../Screen/LoginScreen';
import Register from '../Screen/RegisterScreen';
import CreateUser from '../Screen/DrawerScreens/CreateUser';
import CreateRecord from '../Screen/DrawerScreens/CreateRecord';
import ResidentCell from '../Screen/DrawerScreens/DNResidentCell';
import RecordCell from '../Screen/DrawerScreens/DNRecordCell';
import ServiceCell from '../Screen/DrawerScreens/UserServiceCell';



// Note: test renderer must be required after react-native.
import render from 'react-test-renderer';
import {fireEvent, screen} from '@testing-library/react';
import { TestScheduler } from 'jest';

/*it('renders correctly', () => {
  renderer.create(<App />);
});*/

describe('Page components', () => {
  test('Login page elements', () => {
    render(<Login />)

    const emailInput = screen.getByPlaceholder('Enter User Email');
    const passInput = screen.getByPlaceholder('Enter Password');
    const loginBtn = screen.getByText('LOGIN');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  })

  test('Register page elements', () => {
    render(<Register />)

    const emailInput = screen.getByPlaceholder('Enter Email');
    const passInput = screen.getByPlaceholder('Enter Password');
    const nameInput = screen.getByPlaceholder('Enter User Name');
    const registerBtn = screen.getByText('REGISTER');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  })

  test('Create user page elements', () => {
    render(<CreateUser />)

    const emailInput = screen.getByText('E-Mail');
    const passInput = screen.getByText('Password');
    const nameInput = screen.getByText('User Name');
    const profileInput = screen.getByText('Profile');
    const saveBtn = screen.getByText('SAVE CHANGES');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(profileInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  })

  test('Create record page elements', () => {
    render(<CreateRecord />)

    const SINSelect = screen.getByText('SIN Number');
    const userNameBtn = screen.getByText('GET USER NAME');
    const nameInput = screen.getByText('Complete Name');
    const dayInput = screen.getByText('Day');
    const hourInput = screen.getByText('Hour');
    const bloodPress = screen.getByText('Blood pressure');
    const respRate = screen.getByText('Respiration Rate');
    const bloodOxygen = screen.getByText('Blood Oxygen');
    const heartBeat = screen.getByText('Heart Beat');
    const comment = screen.getByText('Comment');
    const createBtn = screen.getByText('CREATE');

    expect(SINSelect).toBeInTheDocument();
    expect(userNameBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(dayInput).toBeInTheDocument();
    expect(hourInput).toBeInTheDocument();
    expect(bloodPress).toBeInTheDocument();
    expect(respRate).toBeInTheDocument();
    expect(bloodOxygen).toBeInTheDocument();
    expect(heartBeat).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();
  })

  test('Resident cell elements', () => {
    render(<ResidentCell />)

    const nameText = screen.getByText('Name: ');
    const SINText = screen.getByText('SIN: ');
    const addressText = screen.getByText('Address: ');
    const cityText = screen.getByText('City: ');
    const phoneText = screen.getByText('Phone: ');
    const ageText = screen.getByText('Age: ');

    expect(nameText).toBeInTheDocument();
    expect(SINText).toBeInTheDocument();
    expect(addressText).toBeInTheDocument();
    expect(cityText).toBeInTheDocument();
    expect(phoneText).toBeInTheDocument();
    expect(ageText).toBeInTheDocument();
  })

  test('Record cell elements', () => {
    render(<RecordCell />)

    const dayText = screen.getByText('Day: ');
    const nameText = screen.getByText('Complete Name: ');
    const SINText = screen.getByText('SIN: ');
    const bloodPressText = screen.getByText('Blood pressure: ');
    const respRateText = screen.getByText('Respiration rate: ');
    const bloodOxText = screen.getByText('Blood oxygen: ');
    const heartBeatText = screen.getByText('Heart beat: ');
    const commentText = screen.getByText('Comment: ');

    expect(dayText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(SINText).toBeInTheDocument();
    expect(bloodPressText).toBeInTheDocument();
    expect(respRateText).toBeInTheDocument();
    expect(bloodOxText).toBeInTheDocument();
    expect(heartBeatText).toBeInTheDocument();
    expect(commentText).toBeInTheDocument();
  })

  est('Service cell elements', () => {
    render(<ServiceCell />)

    const dayText = screen.getByText('Day: ');
    const specialityText = screen.getByText('Speciality: ');
    const centerText = screen.getByText('Center: ');
    
    expect(dayText).toBeInTheDocument();
    expect(specialityText).toBeInTheDocument();
    expect(centerText).toBeInTheDocument();
  })
});
