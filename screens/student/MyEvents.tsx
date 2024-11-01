import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const events = [
  {
    id: '1',
    name: 'Oliver Tree Concert',
    location: 'Jakarta, Indonesia',
    date: 'Dec 29',
    time: '10:00 PM',
    price: '$45.90',
    image: 'https://example.com/event1.jpg', // Replace with actual image URLs
  },
  {
    id: '2',
    name: 'Halloween Party',
    location: 'Bandung, Indonesia',
    date: 'Mar 22',
    time: '9:00 PM',
    price: 'Free',
    image: 'https://example.com/event2.jpg',
  },
  // Add more events here
];

export default function MyEvents({ navigation }) {
  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <View style={styles.eventDateContainer}>
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventLocation}>{item.location} - {item.time}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.eventPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>My Events</Text>
      </View>
     
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventsList}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1c',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  eventsList: {
    paddingTop: 10,
  },
  eventCard: {
    backgroundColor: '#706656',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventInfo: {
    padding: 15,
  },
  eventDateContainer: {
    position: 'absolute',
    top: -15,
    right: 15,
    backgroundColor: '#dc4904',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  eventDate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventName: {
    color: '#cade7f',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  eventLocation: {
    color: '#a0a0a0',
    fontSize: 14,
    marginTop: 5,
  },
  priceContainer: {
    position: 'absolute',
    bottom: -15,
    right: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  eventPrice: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
