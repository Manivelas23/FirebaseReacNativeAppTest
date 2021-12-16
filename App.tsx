import React from 'react';
import { StyleSheet } from 'react-native';
import AppMainNav from './src/navigation/main_nav';
import "./src/constants/firebase"

export default function App() {
  return (
    <AppMainNav />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
