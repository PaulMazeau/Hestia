import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Menu from '../components/Menu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';


//type Props = NativeStackScreenProps<RootStackParams, 'ExploreStack'>;

const ProfileScreen = () => {
  return (
  <View style={styles.container}>
      <Text style={styles.screenTitle}>Profile</Text>

      <Text>Name; Jhon Doe</Text>
      <TouchableOpacity><Text>Edit Profile</Text></TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 24,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    }
})

export default ProfileScreen;