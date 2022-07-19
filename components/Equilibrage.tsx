import React from "react";
import { View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup, VictoryLabel } from "victory-native";

const NegativeAwareTickLabel = props => {
  const {
    datum, // Bar's specific data object
    y, // Calculated y data value IN SVG SPACE (from top-right corner)
    dy, // Distance from data's y value to label's y value
    scale, // Function that converts from data-space to svg-space
    ...rest // Other props passed to label from Bar
  } = props;

  return (
    <VictoryLabel
      datum={datum} // Shove `datum` back into label. We destructured it from `props` so we'd have it available for a future step
      y={scale.y(0)} // Set y to the svg-space location of the axis
      dy={20 * Math.sign(datum.y)} // Change direction of offset based on the datum value
      {...rest} // Shove the rest of the props into the label
    />
  );
};


class Equilibrage extends React.Component {
  
  render() {
    const data = [
      { x: 'Paul', y: 7 },
      { x: 'Marcel', y: 3 },
      { x: 'Nicolas', y: -5 },
      { x: 'Lena', y: 9 },
      { x: 'Thibault', y: -9 },
    ];
    
    return (
      <View style={{
        backgroundColor: 'white', 
        borderRadius: 13,
        marginTop: 15,
        marginBottom: 15, 
        width:'auto'
      }}>
        
      <VictoryChart 
      domainPadding={{x: [25, 50], y: 15}}
       animate={{
        duration: 500,
         onLoad: { duration: 800 }
       }}
      padding={{ top: 20, bottom: 20, left: 10, right: 20 }}
      >
          <VictoryAxis
          style={{
            tickLabels: { fill: "none" },
            axis: {stroke: "none"}, 
            ticks: {fill: "none"},
          }}

        />
        
        <VictoryGroup data={data}>
          <VictoryBar 
          labels={({ datum }) => `${datum.y}€`} 
          cornerRadius={7}
          />
          <VictoryBar
          cornerRadius={7}
          labels={({ datum }) => `${datum.x}`}
          style={{data: {
            fill: ({ datum }) => datum.y < 0 ? "red" : "#172ACE",
          },}}
            labelComponent={<NegativeAwareTickLabel />}
          />
        </VictoryGroup>

       
      </VictoryChart>
      </View>
    );
  }
}


export default Equilibrage