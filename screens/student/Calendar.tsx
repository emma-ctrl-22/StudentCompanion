import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

const sampleEvents = [
  { id: '1', date: '2024-11-01', name: 'Morning Standup', time: '09:30 AM - 10:00 AM', location: 'Zoom' },
  { id: '2', date: '2024-11-01', name: 'Design Meeting', time: '11:00 AM - 12:00 PM', location: 'Google Meet' },
  { id: '3', date: '2024-11-02', name: 'Code Review', time: '02:00 PM - 03:00 PM', location: 'Teams' },
  // Add more events with different dates for testing
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleDayPress = (day) => {
    setCurrentDate(day.dateString);
    filterEvents(day.dateString);
  };

  const filterEvents = (selectedDate) => {
    const eventsForSelectedDate = sampleEvents.filter(event => event.date === selectedDate);
    setFilteredEvents(eventsForSelectedDate);
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventTime}>{item.time}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarView}>
        <Calendar
          current={currentDate}
          onDayPress={handleDayPress}
          theme={{
            backgroundColor: '#633be9',
            calendarBackground: '#633be9',
            textSectionTitleColor: '#cade7f',
            dayTextColor: '#cade7f',
            monthTextColor: '#cade7f',
            selectedDayBackgroundColor: '#cade7f',
            selectedDayTextColor: '#1f1f1f',
            arrowColor: '#cade7f',
            todayTextColor: '#cade7f',
          }}
          style={{
            borderRadius: 10,
            width: '100%',
          }}
        />
      </View>
      <View style={styles.eventList}>
        {filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={renderEvent}
            style={styles.flatList}
          />
        ) : (
          <Text style={styles.noEventsText}>No events for this day</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    paddingTop: 10,
  },
  calendarView: {
    width: '95%',
    height: '40%',
    marginTop: '2%',
  },
  eventList: {
    backgroundColor: '#2c2c2c',
    height: '55%',
    width: '95%',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  flatList: {
    width: '100%',
  },
  eventCard: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 2 ,
    borderLeftColor: '#633be9',
  },
  eventName: {
    color: '#cade7f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
  },
  eventLocation: {
    color: '#a0a0a0',
    fontSize: 14,
    marginTop: 5,
  },
  noEventsText: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
