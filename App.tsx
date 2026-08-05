import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './components/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <HomeScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
