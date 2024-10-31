import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const handleMonthChange = (date: string) => {
    setCurrentDate(date);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarView}>
        <Calendar
          current={currentDate}
          onDayPress={(day) => console.log("Selected Date: ", day.dateString)}
          onMonthChange={(month) => handleMonthChange(month.dateString)}
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
            width: '100%'
          }}
        />
      </View>
      <View style={styles.eventList}>
        <ScrollView>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    paddingTop: 10
  },
  calendarView: {
    width: "95%",
    height: "40%",
    marginTop:"2%"
  },
  eventList:{
    backgroundColor:"dodgerblue",
    height:"59%",
    width:"95%",
  }
})