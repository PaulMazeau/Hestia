import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import BackIcon from '../Icons/BackIcon'
import { useNavigation } from '@react-navigation/core'

const TopBackNavigation = () => {
  const navigation = useNavigation()

  return <View style={styles.container}>
    <TouchableHighlight style={styles.backButton} underlayColor= "transparent" onPress={() => {
      navigation.goBack()
    }}>
      <BackIcon color="#333" size={30} />
    </TouchableHighlight>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 7,
  }
})

export default TopBackNavigation