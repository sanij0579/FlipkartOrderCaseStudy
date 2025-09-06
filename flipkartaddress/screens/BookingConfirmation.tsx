import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function BookingConfirmationScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Success.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subText}>
        🎉 Thank you! Your booking was successful.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animation: {
    width: width * 0.6,
    height: width * 0.6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1C8D73',
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 10,
  },
});