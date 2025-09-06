import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Make sure this includes 'Payment'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddAddress'>;

export default function AddAddressScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [addressType, setAddressType] = useState<'Home' | 'Work'>('Home');

  const handleNext = () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Only mobile is used in navigation, like your original code
    navigation.navigate('Payment', { mobile });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Full Name (Required)"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone number (Required)"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        maxLength={10}
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>+ Add Alternate Phone Number</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TextInput
          placeholder="Pincode (Required)"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          style={[styles.input, styles.half]}
        />
        <TouchableOpacity
          onPress={() => Alert.alert('Location', 'Use my location feature coming soon')}
          style={styles.useLocationBtn}
        >
          <Text style={{ color: '#fff' }}>📍 Use my location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="State (Required)"
          value={state}
          onChangeText={setState}
          style={[styles.input, styles.half]}
        />
        <TextInput
          placeholder="City (Required)"
          value={city}
          onChangeText={setCity}
          style={[styles.input, styles.half]}
        />
      </View>

      <TextInput
        placeholder="House No., Building Name (Required)"
        value={house}
        onChangeText={setHouse}
        style={styles.input}
      />

      <TextInput
        placeholder="Road name, Area, Colony (Required)"
        value={area}
        onChangeText={setArea}
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>+ Add Nearby Famous Shop/Mall/Landmark</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Type of address</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity
          onPress={() => setAddressType('Home')}
          style={[styles.typeBtn, addressType === 'Home' && styles.typeBtnSelected]}
        >
          <Text>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAddressType('Work')}
          style={[styles.typeBtn, addressType === 'Work' && styles.typeBtnSelected]}
        >
          <Text>🏢 Work</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  half: {
    flex: 1,
    marginRight: 8,
  },
  useLocationBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 12,
    marginLeft: 8,
  },
  linkText: {
    color: '#007bff',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    marginRight: 10,
  },
  typeBtnSelected: {
    backgroundColor: '#ddd',
  },
  saveBtn: {
    backgroundColor: '#ff5722',
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});