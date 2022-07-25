import { collection, getDocs, orderBy, query, startAt, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import {db, auth} from '../firebase-config'


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



//props est la clc id pr get les dépenses + global: bool pr savoir si on affiche depense perso ou globale
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
    if(!(props.global)){
    const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), where('concerned', 'array-contains', auth.currentUser.uid), orderBy('timestamp'), startAt(SixMonthsAgoFromToday));
    const docs =  await getDocs(q);
    setData(orderData(docs));}
    else{
      const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), orderBy('timestamp'), startAt(SixMonthsAgoFromToday));
      const docs =  await getDocs(q);
      setData(orderData(docs));
    }
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
  let uuid = auth.currentUser.uid
  if(props.global){ //calcul des dépense totales
  for(var i = 0; i<data.docs.length; i++){
    let currentMonth = data.docs[i].data().timestamp.toDate().getMonth();
    let transac = data.docs[i].data()
    switch(currentMonth - startingMonth){ 
      case 0: res[6].earnings += transac.amount; break; //ça signifie currentMonth est il y a 6 mois
      case 1: res[5].earnings +=  transac.amount; break;
      case 2: res[4].earnings +=  transac.amount; break;
      case 3: res[3].earnings +=  transac.amount; break;
      case 4: res[2].earnings +=  transac.amount; break;
      case 5: res[1].earnings +=  transac.amount; break;
      case 6: res[0].earnings +=  transac.amount; break;
    }
  }}else{ //calcul des dépenses ou luser est concerné
    for(var i = 0; i<data.docs.length; i++){
      let currentMonth = data.docs[i].data().timestamp.toDate().getMonth();
      let transac = data.docs[i].data()
      if(transac.receiversID.includes(uuid)){
      switch(currentMonth - startingMonth){ 
        case 0: res[6].earnings += transac.amount/transac.receiversID.length; break; //ça signifie currentMonth est il y a 6 mois
        case 1: res[5].earnings +=  transac.amount/transac.receiversID.length; break;
        case 2: res[4].earnings +=  transac.amount/transac.receiversID.length; break;
        case 3: res[3].earnings +=  transac.amount/transac.receiversID.length; break;
        case 4: res[2].earnings +=  transac.amount/transac.receiversID.length; break;
        case 5: res[1].earnings +=  transac.amount/transac.receiversID.length; break;
        case 6: res[0].earnings +=  transac.amount/transac.receiversID.length; break;
      }}
    }
  }
  return res 

}

    return (
      <View style={styles.container}>
        <VictoryChart
          domainPadding={20}
          height={275}
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
        height: 275
      },
})


export default Depense;