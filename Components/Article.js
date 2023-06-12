import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';

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
  articlePublishedAt: {
    color: '#fff',
    fontSize: 14,
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleContent: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  articleDescription: {
    color: '#fff',
  },
  articleAuthor: {
    color: '#fff',
    fontSize: 14,
  },
  articleUrl: {
    color: '#0065eb',
    fontSize: 14,
  },
  articleSource: {
    color: '#fff',
    fontSize: 14,
  },
});

const Article = ({ route }) => {
  const { article } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{article.title}</Text>
      <Text style={styles.articlePublishedAt}>Published  {article.publishedAt}</Text>
      <Image style={styles.articleImage} source={{ uri: article.urlToImage || 'https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg'} } />   
      <Text style={styles.articleContent}> {article.content}</Text>
      <Text style={styles.articleDescription}>{article.description}</Text>
      <Text>-------------------------------------------------------------------------------------</Text>  
      {article.author &&  <Text style={styles.articleAuthor}>Author: {article.author}</Text> }
      {article.url &&  <Text style={styles.articleAuthor}>link:<Text style={styles.articleUrl}  onPress={() => {
              Linking.openURL(article.url);
            }}> {article.url}</Text> </Text>}
      <Text style={styles.articleSource}>Source: {article.source.name}</Text>
    </View>
  );
};

export default Article;
