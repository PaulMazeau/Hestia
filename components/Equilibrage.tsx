import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack, VictoryTheme } from "victory-native";

const dataA = [
    { x: "Thomas", y: 57 },
    { x: "Paul", y: 40 },
    { x: "Wilk", y: 38 },
    { x: "Ariel", y: 37 },
  ];
  
  const dataB = dataA.map((point) => {
    const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    return { ...point, y };
  });
  
  const width = 350;
  

  class Equilibrage extends React.Component {
  
    render() {
      return (
        <VictoryChart horizontal
          width={width}
          padding={40}
        >
          <VictoryStack
            style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
          >
            <VictoryBar
              style={{ data: { fill: "red" } }}
              data={dataA}
              y={(data) => (-Math.abs(data.y))}
              labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
            />
            <VictoryBar
              style={{ data: { fill: "blue" } }}
              data={dataB}
              labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
            />
          </VictoryStack>
  
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fontSize: 15, fill: "white" }
            }}
            /*
              Use a custom tickLabelComponent with
              an absolutely positioned x value to position
              your tick labels in the center of the chart. The correct
              y values are still provided by VictoryAxis for each tick
            */
            tickLabelComponent={
              <VictoryLabel
                x={width / 2}
                textAnchor="middle"
              />
            }
            tickValues={dataA.map((point) => point.x).reverse()}
          />
        </VictoryChart>
      );
    }
  }
  
  export default Equilibrage;


