import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#1c1c1c",
    flex:1
  }
})