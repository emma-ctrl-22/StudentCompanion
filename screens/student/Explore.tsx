import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const eventsData = [
  { id: '1', name: 'Football Match', type: 'Sports', location: 'Stadium', date: 'Dec 10', time: '7:00 PM', price: '$25', image: 'https://example.com/football.jpg' },
  { id: '2', name: 'Food Festival', type: 'Food', location: 'City Park', date: 'Jan 15', time: '12:00 PM', price: 'Free', image: 'https://example.com/food.jpg' },
  { id: '3', name: 'Live Concert', type: 'Entertainment', location: 'Music Arena', date: 'Dec 25', time: '9:00 PM', price: '$50', image: 'https://example.com/concert.jpg' },
  { id: '4', name: 'Tech Workshop', type: 'Educational', location: 'University Hall', date: 'Feb 20', time: '10:00 AM', price: '$30', image: 'https://example.com/workshop.jpg' },
  // Add more event items
];

const eventTypes = ['All', 'Sports', 'Food', 'Entertainment', 'Educational'];

export default function Explore({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredEvents = eventsData.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search events..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* Event Type Tabs */}
      <FlatList
        data={eventTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tab, selectedType === item && styles.activeTab]}
            onPress={() => setSelectedType(item)}
          >
            <Text style={[styles.tabText, selectedType === item && styles.activeTabText]}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.tabContainer}
      />

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ paddingBottom: 20,marginTop:10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 20,
  },
  searchBar: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  tabContainer: {
    paddingLeft: 15,
    paddingVertical: 10,
    height:55
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    height:35,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#333',
  },
  activeTab: {
    backgroundColor: '#cade7f',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
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
