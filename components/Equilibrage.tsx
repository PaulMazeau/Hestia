import React from "react";
import {ProgressChart} from "react-native-chart-kit";
import { Button, Dimensions, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from "victory-native";

const dataA = [
  { x: "Paul", y: 57 },
  { x: "Thomas", y: 40 },
  { x: "Pierre", y: 0 },
  { x: "Jacques", y: 37 },
];

const dataB = [
  { x: "Paul", y: 57 },
  { x: "Thomas", y: 40 },
  { x: "Pierre", y: 38 },
  { x: "Jacques", y: 37 },
];


const width = 400;

  class Equilibrage extends React.Component {
  
    render() {
      return (
        <View>
        <Button title='prout'/>
        </View> 
      );
    }
  }
  
  export default Equilibrage;


