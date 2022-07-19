import { collection, getDocs, orderBy, query, startAt, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import {db, auth} from '../firebase-config'
// const data = [
//   {quarter: 1, earnings: 100},
//   {quarter: 2, earnings: 150},
//   {quarter: 3, earnings: 125},
//   {quarter: 4, earnings: 240},
//   {quarter: 5, earnings: 226},
//   {quarter: 6, earnings: 140},
//   {quarter: 7, earnings: 175},
// ];


const today = new Date(Date.now())

const matchMonth = (index) => {
  const months = ['__', 'Jan','Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
  return months[index];
}

//pr recuperer les strings des 6 derniers mois et les indexs
const getLastSixMonthsStrings = () => {
    let monthIndex = today.getMonth() + 1
    let res = [];
    for(var i=0; i<7; i++){
      if((monthIndex - i) > 0){
        res.push(monthIndex-i)
      }else{
        res.push(12 + (monthIndex-i))
      }
    }
    res = res.reverse()
    return res.map(i => matchMonth(i));
}

const getLastSixMonthsIndexes = () => {
  let monthIndex = today.getMonth() + 1
  let res = [];
  for(var i=0; i<7; i++){
    if((monthIndex - i) > 0){
      res.push(monthIndex-i)
    }else{
      res.push(12 + (monthIndex-i))
    }
  }
  res = res.reverse()
  return res.map(i => (i-1)); //) car les mois commencent à 0
}

//pr dans la query 
const SixMonthsAgoFromToday = new Date(today);
SixMonthsAgoFromToday.setMonth(getLastSixMonthsIndexes()[0])

// const [transacs, setTransacs] = useState(null);
// useEffect(() => {
//   const getData = async () => {
//     const q = query(collection)
//   }
// }, [])

//props est la clc id pr get les dépense
const Depense = (props)  => {

  const[data, setData] = useState([
    {quarter: 1, earnings: 0},
    {quarter: 2, earnings: 0},
    {quarter: 3, earnings: 0},
    {quarter: 4, earnings: 0},
    {quarter: 5, earnings: 0},
    {quarter: 6, earnings: 0},
    {quarter: 7, earnings: 0},
  ]);

  //get toutes les transac dil y a mois de 6 moins
useEffect(() => {
  const getData = async ()=> {
    const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), where('concerned', 'array-contains', auth.currentUser.uid), orderBy('timestamp'), startAt(SixMonthsAgoFromToday));
    const docs =  await getDocs(q);
    setData(orderData(docs));
  }
  getData();
}, [])
//sommer les montants dépensés par mois

const orderData = (data) => {
  const res = [
    {quarter: 1, earnings: 0}, //il ya a 6 mois....
    {quarter: 2, earnings: 0},
    {quarter: 3, earnings: 0},
    {quarter: 4, earnings: 0},
    {quarter: 5, earnings: 0},
    {quarter: 6, earnings: 0},
    {quarter: 7, earnings: 0},//mois d'ojd
  ];
  
 if(data.docs.length==0) {return res}
  const startingMonth = data.docs[0].data().timestamp.toDate().getMonth();
  for(var i = 0; i<data.docs.length; i++){
    let currentMonth = data.docs[i].data().timestamp.toDate().getMonth();
    switch(currentMonth - startingMonth){ 
      case 0: res[6].earnings += data.docs[i].data().amount; break; //ça signifie currentMonth est il y a 6 mois
      case 1: res[5].earnings +=  data.docs[i].data().amount; break;
      case 2: res[4].earnings +=  data.docs[i].data().amount; break;
      case 3: res[3].earnings +=  data.docs[i].data().amount; break;
      case 4: res[2].earnings +=  data.docs[i].data().amount; break;
      case 5: res[1].earnings +=  data.docs[i].data().amount; break;
      case 6: res[0].earnings +=  data.docs[i].data().amount; break;
    }
  }
  return res 

}

    return (
      <View style={styles.container}>
        <VictoryChart
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={getLastSixMonthsStrings()}
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


const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        borderRadius: 9,
        marginBottom: 15,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
})


export default Depense;