import axios from 'axios';
import React from 'react';
import { Alert, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import { useTheme } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const { colors } = useTheme();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://newsapi.org/v2/everything?q=keyword&apiKey=9c4b6caedb7e40c38d9283a2fa439b83')
      .then(({ data }) => {
        setItems(data.articles);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Could not retrieve articles');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} colors={[colors.primary]} />}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('FullPost', { id: item.source.id, title: item.title })}>
            <Post title={item.title} imageUrl={item.urlToImage} createdAt={item.publishedAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
