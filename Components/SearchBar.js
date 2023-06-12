import React from 'react';
import { TextInput, StyleSheet, Button, View, Text } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    color: '#3586f2',
    marginBottom: 10,
  },
});

export const SearchBar = ({ searchWord, fromDate, toDate, setSearchWord, setFromDate, setToDate, handleSearch }) => (
  <View>
    <Text style={styles.header}>Search Articles</Text>
    <TextInput style={styles.input} value={searchWord} onChangeText={setSearchWord} placeholder="Search articles..." />
    <TextInput style={styles.input} value={fromDate} onChangeText={setFromDate} placeholder="From date (YYYY:MM:DD)" />
    <TextInput style={styles.input} value={toDate} onChangeText={setToDate} placeholder="To date (YYYY:MM:DD)" />
    <Button title="Search" onPress={handleSearch} />
  </View>
);