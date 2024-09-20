import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>Our Best Courses</Text>
       
      <View style={styles.container}>
        <View style={[styles.card, styles.card1]}> 
          <Text>ReactJs</Text>
        </View>
        <View style={[styles.card, styles.card2]}> 
          <Text>NodeJs</Text>
        </View>
        <View style={[styles.card, styles.card3]}> 
          <Text>Python</Text>
        </View>
        <View style={[styles.card, styles.card1]}> 
          <Text>C++</Text>
        </View>
        <View style={[styles.card, styles.card2]}> 
          <Text>Laraval</Text>
        </View>
        <View style={[styles.card, styles.card3]}> 
          <Text>NextJs</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent:'space-evenly' 
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 150,
    borderRadius: 4,
    margin: 9
  },
  card1: {
    backgroundColor: '#EF5354'
  },
  card2: {
    backgroundColor: '#50DBB4'
  },
  card3: {
    backgroundColor: '#5DA3FA'
  }
})
