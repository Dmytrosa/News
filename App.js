import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08d9d6',
    padding: 10,
  },
  header: {
    fontSize: 20,
    color: '#252a34',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  articleItem: {
    backgroundColor: '#ff2e63',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  articleTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  articleDescription: {
    color: '#fff',
  },
});

const NewsList = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchWord}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=9c4b6caedb7e40c38d9283a2fa439b83`);
        setArticles(result.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchWord, fromDate, toDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Articles</Text>
      <TextInput style={styles.input} value={searchWord} onChangeText={setSearchWord} placeholder="Search articles..." />
      <TextInput style={styles.input} value={fromDate} onChangeText={setFromDate} placeholder="From date (YYYY-MM-DD)" />
      <TextInput style={styles.input} value={toDate} onChangeText={setToDate} placeholder="To date (YYYY-MM-DD)" />
      <FlatList
        data={articles}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.articleItem} onPress={() => navigation.navigate('Article', { article: item })}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const Article = ({ route }) => {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{article.title}</Text>
      <Text style={styles.articleDescription}>{article.description}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NewsList" component={NewsList} options={{ title: 'News' }} />
        <Stack.Screen name="Article" component={Article} options={{ title: 'Article Details' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
