import React from "react";
import {ProgressChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from "victory-native";

const dataA = [
  { x: "Paul", y: 57 },
  { x: "Thomas", y: 40 },
  { x: "Pierre", y: 38 },
  { x: "Jacques", y: 37 },
];

const dataB = [
  { x: "Paul", y: 57 },
  { x: "Thomas", y: 40 },
  { x: "Pierre", y: 38 },
  { x: "Jacques", y: 37 },
];


const width = 400;
const height = 400;

  class Equilibrage extends React.Component {
  
    render() {
      return (
        
         <VictoryChart horizontal
          width={width}
          padding={80}
        >
          <VictoryStack
            style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
          >
            <VictoryBar
              style={{ data: { fill: "red" } }}
              data={dataA}
              y={(data) => (-Math.abs(data.y))}
              labels={({ datum }) => (`${Math.abs(datum.y)}€`)}
              cornerRadius={{ topRight: 5, topLeft: 5 }}
            />
            <VictoryBar
              style={{ data: { fill: "blue" },  }}
              data={dataB}
              labels={({ datum }) => (`${Math.abs(datum.y)}€`)}
              cornerRadius={{ topRight: 5, topLeft: 5 }}
            />
          </VictoryStack>
  
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fontSize: 15, fill: "white" }
            }}
          />
        </VictoryChart>     
            
      );
    }
  }
  
  export default Equilibrage;


