import React from "react";
import {BarChart} from "react-native-chart-kit";
import { Dimensions, View } from "react-native";

const colorName = ["blue", "blue", "blue", "orange", "orange", "orange"]

const width = 400;

const Equilibrage = (props) => {
  return(
    <View style ={{transform: [{rotate:'90deg'}]}}>
  <BarChart
  data={{
    labels: [
      'Ariel',
      'Alex',
      'Antoine',
      'Wilk', 
      'Gang'
    ],
    datasets: [
      {
        data: [33, 23, 13, -13, -56],
        colors: colorName.map(c =>{return ()=> c})
      },
    ],
  }}
  height={Dimensions.get('window').width/1.5}
  width={Dimensions.get('window').height/4}
  yAxisLabel={''}
  showValuesOnTopOfBars={true}
  yAxisSuffix={''}
  horizontalLabelRotation={30}
  chartConfig={{
    barPercentage: 1,
    backgroundColor: '#FFFAFA',
    backgroundGradientFrom: '#FFFAFA',
    backgroundGradientTo: '#FFFAFA',
    decimalPlaces: 2,
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      
    },
  }}
  withHorizontalLabels={false}
  withInnerLines={false}
  withCustomBarColorFromData={true}
  flatColor={true}
  style={{
    padding: 5,
    paddingRight: 0,
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems:'center'
  }}
  fromZero={true}
  
/>
</View>

  )
}
  
  export default Equilibrage;


