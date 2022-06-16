import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, View } from "react-native";
import { DefaultTransition } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets";
import { Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  {quarter: 1, earnings: 100},
  {quarter: 2, earnings: 150},
  {quarter: 3, earnings: 125},
  {quarter: 4, earnings: 240},
  {quarter: 5, earnings: 226},
  {quarter: 6, earnings: 140},
  {quarter: 7, earnings: 175},
];

class Depense extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jui"]}
            style={{ 
              axis: {stroke: "transparent"}, 
          }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}€`)}
            style={{ 
              axis: {stroke: "transparent"}, 
              grid: { stroke: '#E9E9E9', strokeWidth: .6 },
          }}
          />
          <VictoryBar
            cornerRadius={{ top: 3, bottom: 3 }}
            data={data}
            x="quarter"
            y="earnings"
            style={{ data: { fill: "#172ACE" } }}
          />
        </VictoryChart>
      </View>
    )
  }
}

const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        borderRadius: 9,
        marginBottom: 27,
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
})


export default Depense;