import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>(
        'http://10.78.55.81:8000/api/verify-otp/',
        { phone: mobile, otp }
      );

      console.log('OTP verification response:', response.data);

      if (response.data.message.includes('OTP verified')) {
        navigation.replace('BookingSuccess');
      } else {
        Alert.alert('Invalid OTP', 'Please try again.');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Verify with OTP</Text>
      <Text style={styles.subText}>OTP has been sent to your number</Text>
      <Text style={styles.mobileText}>+91 {mobile}</Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerifyOTP}
        disabled={loading}
      >
        <Text style={styles.verifyButtonText}>
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        Didn't receive OTP? <Text style={styles.resendText}>Resend</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  mobileText: {
    fontSize: 16,
    color: '#0b57d0',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
    color: '#212121',
    backgroundColor: '#f9f9f9',
    marginBottom: 25,
  },
  verifyButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '600',
  },
  footerNote: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 13,
  },
  resendText: {
    color: '#0b57d0',
    fontWeight: 'bold',
  },
});