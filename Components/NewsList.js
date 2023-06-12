import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, TextInput, StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b3b3b',
    padding: 10,
  },
  header: {
    fontSize: 20,
    color: '#3586f2',
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
    backgroundColor: '#2f4a6b',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  articleTitle: {
    color: '#cdff00',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15,
  },
  articleDescription: {
    color: '#fff',
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
});

const NewsList = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [searchWord, setSearchWord] = useState('news');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSearch = () => {
    setSubmit(true);
  };

  useEffect(() => {
    if (!submit) return;

    const fetchData = async () => {
      try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchWord}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=5e8133d01af548edac48b3b05cb47bd7`);
        setArticles(result.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setSubmit(false); // reset submit state after fetch
  }, [submit, searchWord, fromDate, toDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Articles</Text>
      <TextInput style={styles.input} value={searchWord} onChangeText={setSearchWord} placeholder="Search articles..." />
      <TextInput style={styles.input} value={fromDate} onChangeText={setFromDate} placeholder="From date (YYYY:MM:DD)" />
      <TextInput style={styles.input} value={toDate} onChangeText={setToDate} placeholder="To date (YYYY:MM:DD)" />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.articleItem} onPress={() => navigation.navigate('Article', { article: item })}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Image style={styles.articleImage} source={{ uri: item.urlToImage || 'https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg'} } />   
            <Text style={styles.articleDescription}>{item.description}</Text>
        </TouchableOpacity>
      )}
      />

    </View>
  );
};

export default NewsList;
