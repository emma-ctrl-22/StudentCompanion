import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const handleMonthChange = (date: string) => {
    setCurrentDate(date);
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchComponent}>
        <TextInput placeholder='Search event here' placeholderTextColor="#c1c1c1" style={styles.searchbar} />
        <TouchableOpacity style={styles.icon}>
          <Feather name="search" size={24} color="#cade7f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('create')} style={styles.icon}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        <View style={styles.top}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={()=>navigation.navigate('explore')} style={styles.lT}>
              <Text style={{ fontSize: 25, textAlign: "center" }}>Explore</Text>
              {/* <FontAwesome name="wpexplorer" size={40} color="black" /> */}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('myevent')} style={styles.lB}>
              <Text style={{ fontSize: 18, fontWeight: "400" }}>My Events</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inner}>
            <TouchableOpacity onPress={()=>navigation.navigate('Note')} style={styles.RT}>
              <Text style={{ fontWeight: "bold" }}>Notes</Text>
              <Text style={{ fontWeight: "300", fontSize: 23 }}>Write down personal notes</Text>
            </TouchableOpacity>

            <View style={styles.RB}>
              <TouchableOpacity onPress={()=>navigation.navigate('create')} style={styles.Button1}>
                <Feather name="plus" size={44} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.Button2}>
                <MaterialIcons name="report" size={44} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('calendar')} style={styles.down}>

          <Calendar
            current={currentDate}
            onDayPress={(day) => console.log("Selected Date: ", day.dateString)}
            onMonthChange={(month) => handleMonthChange(month.dateString)}
            theme={{
              backgroundColor: '#673ceb',
              calendarBackground: '#673ceb',
              textSectionTitleColor: '#cade7f',
              dayTextColor: '#cade7f',
              monthTextColor: '#cade7f',
              selectedDayBackgroundColor: '#e1d27c',
              selectedDayTextColor: '#1f1f1f',
              arrowColor: '#cade7f',
              todayTextColor: '#cade7f',
            }}
            style={{
              borderRadius: 10,
              width: '100%'
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
    alignItems: "center"
  },
  searchComponent: {
    height: "10%",
    width: "95%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  searchbar: {
    backgroundColor: "#706656",
    color: "white",
    width: "70%",
    height: "70%",
    borderRadius: "50%",
    paddingHorizontal: 20
  },
  icon: {
    backgroundColor: "#706656",
    padding: 10,
    borderRadius: "50%"
  },
  options: {
    height: "85%",
    width: "95%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "column"
  },
  top: {
    height: "56%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  down: {
    backgroundColor: "#673ceb",
    height: "40%",
    borderRadius: 20,
    display: "flex",
   
  },
  inner: {
    height: "100%",
    width: "49%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"

  },
  lT: {
    backgroundColor: "#e1d27c",
    height: "30%",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center"
  },
  lB: {
    backgroundColor: "#e1d27c",
    height: "65%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-between"
  },
  RT: {
    backgroundColor: "#cade7f",
    height: "65%",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  RB: {
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  Button1: {
    backgroundColor: "#dc4904",
    width: "49%",
    height: "100%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  Button2: {
    backgroundColor: "#5bc296",
    width: "49%",
    height: "100%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 10,
  },
  headerTitle: {
    color: '#cade7f',
    fontSize: 20,
    fontWeight: 'bold',
  },
})