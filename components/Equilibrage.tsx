import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
 
const Equilibrage = () => {

  const fill = '#172ACE'
  const data = [50, -4, 40, 95, -24, 10]

    return(     
            <BarChart 
            style={{ height: 200 }} 
            data={data} 
            svg={{ fill }} 
            horizontal={true}
            >
            {/* <Image source={require(../Img/avatar1.png)} /> */}
            </BarChart>
        )
}

export default Equilibrage