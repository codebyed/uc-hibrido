import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import BirthdayInvitation from './src/components/BirthdayInvitation/BirthdayInvitation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <BirthdayInvitation />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
