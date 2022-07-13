import React from "react";
import {ProgressChart} from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from "victory-native";


const solde=[
  { x: 'paul', y: 2 },
  { x: 'pablo', y: 3 },
  { x: 'tomy', y: -5 },
  { x: 'kev', y: 4 }
];


class Equilibrage extends React.Component {
 


    
  render() {

    return (

      <View style={{
        backgroundColor: 'white', 
        borderRadius: 13, 
        width: 'auto', 
        height: 300,
        marginTop: 15,
        marginBottom: 15
      }}>
      
        <VictoryChart height={350} width={350}
          domainPadding={{ x: 10, y: 10 }}
          scale={{ x: "time" }}
          horizontal={true}        
        >
           <VictoryAxis dependentAxis crossAxis 
           standalone={true}
           style={{ 
            axis: {stroke: "transparent"}, 
            ticks: {stroke: "transparent"},
            tickLabels: { fill:"transparent"} 
           }}/>

           <VictoryAxis crossAxis
           style={{ 
            axis: {stroke: "transparent"}, 
            ticks: {stroke: "transparent"},
           }}
           />
          
          <VictoryBar
            dataComponent={ <Bar cornerRadius={4}/> }
            style={{data: {
              fill: ({ datum }) => datum.x === 1 ? "#000000" : "#172ACE",
            },}}
            data={solde}
          />
          
        </VictoryChart>
        </View>
    );
  }
 }

export default Equilibrage