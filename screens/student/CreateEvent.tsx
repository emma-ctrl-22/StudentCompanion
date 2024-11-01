import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  // Open the map to select location
  const pickLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    setShowMap(true);
  };

  // Confirm location selection from map
  const confirmLocation = (selectedLocation: { latitude: number; longitude: number }) => {
    setLocation(selectedLocation);
    setShowMap(false);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) setEventDate(selectedDate);
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) setEventTime(selectedTime);
  };

  const handleCreateEvent = () => {
    console.log('Event Created:', { eventName, eventDate, eventTime, location, description, coverImage });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create New Event</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick Cover Image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Feather name="edit" size={20} color="#FFCD3C" />
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          placeholderTextColor="#a0a0a0"
          value={eventName}
          onChangeText={setEventName}
        />
      </View>

      <TouchableOpacity style={styles.inputGroup} onPress={() => setShowDatePicker(true)}>
        <Feather name="calendar" size={20} color="#58CC02" />
        <Text style={styles.inputText}>{eventDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && <DateTimePicker value={eventDate} mode="date" display="default" onChange={handleDateChange} />}

      <TouchableOpacity style={styles.inputGroup} onPress={() => setShowTimePicker(true)}>
        <Feather name="clock" size={20} color="#FFA500" />
        <Text style={styles.inputText}>
          {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && <DateTimePicker value={eventTime} mode="time" display="default" onChange={handleTimeChange} />}

      <TouchableOpacity style={styles.inputGroup} onPress={pickLocation}>
        <Feather name="map-pin" size={20} color="#56B4D3" />
        <Text style={styles.inputText}>{location ? `Lat: ${location.latitude}, Lng: ${location.longitude}` : 'Pick Location'}</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Feather name="file-text" size={20} color="#8E44AD" />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#a0a0a0"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>

      {showMap && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => confirmLocation(e.nativeEvent.coordinate)}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    flexGrow: 1,
  },
  header: {
    color: '#FFCD3C',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#333',
    height: 200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    color: '#FFCD3C',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  inputText: {
    color: '#FFCD3C',
    fontSize: 16,
    marginLeft: 10,
  },
  createButton: {
    backgroundColor: '#cade7f',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
