import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const ProfileScreen = () => {
  return (
    <LinearGradient colors={["#334155", "#131624"]} style={{flex:1}}>
      <ScrollView style={{marginTop:50}}>
        <Text>ProfileScreen</Text>
      </ScrollView>
    </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})