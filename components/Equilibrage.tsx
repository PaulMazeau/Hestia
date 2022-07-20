import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup, VictoryLabel } from "victory-native";



//props est userList
const Equilibrage = (props) => {

  console.log(props.userList);
  const datab = [{x:'test', y: 10}, {x:'tg', y:-10},]
   
    const NegativeAwareTickLabel = damn => {
      const {
        datum, // Bar's specific data object
        y, // Calculated y data value IN SVG SPACE (from top-right corner)
        dy, // Distance from data's y value to label's y value
        scale, // Function that converts from data-space to svg-space
        ...rest // Other props passed to label from Bar
      } = damn;
    
      return (
        <VictoryLabel
          datum={datum} // Shove `datum` back into label. We destructured it from `props` so we'd have it available for a future step
          y={scale.y(0)} // Set y to the svg-space location of the axis
          dy={20 * Math.sign(datum.y)} // Change direction of offset based on the datum value
          {...rest} // Shove the rest of the props into the label
        />
      );
    };

// const orderData = () => {
//     if(props.userList){
//       let res  = []
//       for(var i= 0; i<props.userList.length; i++){
//         res.push({x: props.userList[i].nom, y: props.userList[i].solde})
//       }
//       res.sort((a, b) => a.y - b.y)
//       return res
//     }
//     return [{x:'test', y: 10}, {x:'tg', y:-10},]
  // }
  

    return (
      <></>
      // <View style={{
      //   backgroundColor: 'white', 
      //   borderRadius: 13,
      //   marginTop: 15,
      //   marginBottom: 15, 
      //   width:'auto'
      // }}>
      //   <Text>Gang</Text>
      // {/* <VictoryChart 
      // domainPadding={{x: [25, 50], y: 15}}
      //  animate={{
      //   duration: 500,
      //    onLoad: { duration: 800 }
      //  }}
      // padding={{ top: 20, bottom: 20, left: 10, right: 20 }}
      // >
      //     <VictoryAxis
      //     style={{
      //       tickLabels: { fill: "none" },
      //       axis: {stroke: "none"}, 
      //       ticks: {fill: "none"},
      //     }}

      //   />
        
      //   <VictoryGroup data={datab}>
      //     <VictoryBar 
      //     labels={({ datum }) => `${datum.y}€`} 
      //     cornerRadius={7}
      //     />
      //     <VictoryBar
      //     cornerRadius={7}
      //     labels={({ datum }) => `${datum.x}`}
      //     style={{data: {
      //       fill: ({ datum }) => datum.y < 0 ? "red" : "#172ACE",
      //     },}}
      //       labelComponent={<NegativeAwareTickLabel />}
      //     />
      //   </VictoryGroup>

       
      // </VictoryChart> */}
      // </View>
    );
  }


export default Equilibrage