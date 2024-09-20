import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElavatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>About Us</Text>
      <View style={styles.container}>
        <View style={[styles.card, styles.card1]}> 
          <Text>ghjkl</Text>
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
        width: 390,
        height: 390,
        borderRadius: 4,
        margin: 9
      },
      card1: {
        backgroundColor: '#50DBB4'
      }
    })
      
