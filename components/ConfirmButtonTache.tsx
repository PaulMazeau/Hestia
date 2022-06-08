import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const AppButton = ({ title }) => (
    <TouchableOpacity  style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#172ACE",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 60,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});

export default AppButton;