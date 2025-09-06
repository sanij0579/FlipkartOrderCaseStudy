import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export default function PaymentScreen({ route, navigation }: Props) {
  const { mobile } = route.params;
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleSelectMethod = (method: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedMethod((prev) => (prev === method ? '' : method));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('http://10.78.55.81:8000/api/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('OTPVerification', { mobile });
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step 3 of 3: Payments</Text>
      <Text style={styles.amount}>₹633</Text>

      <View style={styles.section}>
        <Text style={styles.cashback}>🎉 5% Cashback</Text>
        <Text style={styles.subText}>Claim now with payment offers</Text>
      </View>

      {/* UPI */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelectMethod('UPI')}>
        <Text style={styles.optionText}>💸 UPI</Text>
        <Text style={styles.subText}>Pay using any UPI app</Text>
      </TouchableOpacity>

      {/* Card */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelectMethod('Card')}>
        <Text style={styles.optionText}>💳 Credit / Debit / ATM Card</Text>
        <Text style={styles.subText}>5% cashback on Flipkart Axis Bank Card</Text>
      </TouchableOpacity>

      {/* NetBanking */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelectMethod('NetBanking')}>
        <Text style={styles.optionText}>🏦 Net Banking</Text>
      </TouchableOpacity>

      {/* COD - Expandable */}
      <TouchableOpacity
        style={[styles.option, styles.codBox]}
        onPress={() => handleSelectMethod('COD')}
        activeOpacity={0.8}
      >
        <Text style={styles.optionText}>💰 Cash on Delivery</Text>

        {selectedMethod === 'COD' && (
          <View>
            <Text style={styles.codNote}>₹9 non-refundable fee for handling cash orders.</Text>
            <TouchableOpacity style={styles.codButton} onPress={handlePlaceOrder}>
              <Text style={styles.codButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      {/* Gift Card */}
      <TouchableOpacity style={styles.option} onPress={() => handleSelectMethod('GiftCard')}>
        <Text style={styles.optionText}>🎁 Have a Flipkart Gift Card?</Text>
      </TouchableOpacity>

      {/* Disabled EMI */}
      <View style={styles.disabledOption}>
        <Text style={styles.optionText}>📅 EMI</Text>
        <Text style={styles.subText}>Currently unavailable</Text>
      </View>

      <Text style={styles.footer}>35 Crore happy customers and counting! 😊</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  amount: {
    fontSize: 22,
    color: '#0a84ff',
    marginBottom: 15,
  },
  section: {
    backgroundColor: '#e6f9ea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  cashback: {
    fontWeight: 'bold',
    color: '#008000',
    fontSize: 15,
    marginBottom: 3,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  codBox: {
    borderColor: '#ffc107',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: '#fffbe6',
  },
  codNote: {
    fontSize: 13,
    color: '#555',
    marginVertical: 8,
  },
  codButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  codButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  disabledOption: {
    padding: 14,
    opacity: 0.5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 13,
  },
});