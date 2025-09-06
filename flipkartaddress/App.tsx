import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAddressScreen from './screens/ AddAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import BookingSuccessScreen from './screens/BookingConfirmation'; // If this is correct file
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddAddress">
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}