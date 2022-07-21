import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Depense from './DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Dette from './Dette';
import{db} from '../firebase-config'
import { useFocusEffect } from '@react-navigation/native';
import { getDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';
import Equilibrage from './Equilibrage';
import AddDepenseBS from './AddDepenseBS';
import { connectStorageEmulator } from 'firebase/storage';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryGroup, VictoryLabel } from "victory-native";
import { UserContext, UserListContext } from '../Context/userContextFile';
import { useCollection } from 'react-firebase-hooks/firestore';

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


const PageEquilibrage = (props) => {
  const [user, setUser] = useContext(UserContext);
  // const[userList, setUserList] = useState([]);
  //get la userList pr foutre la data ds le chart
  // useEffect(()=> {
  //   const getUsers = async () => {
  //     const data = await getDoc(doc(db, "Colocs", user.colocID));
  //     const membersID = data.data().membersID;
  //     const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
  //     const querySnapshot = await getDocs(q);
  //     setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
  //   }
  //   getUsers();
  // }, [])

  const [userList, loading, error] = useCollection(query(collection(db, "Users"), where('uuid', 'in', user.membersID)))

  const orderData = () => {
    if(userList){
      let res = []
      for(var i = 0; i<userList.docs.length; i++){
        res.push({x: userList.docs[i].data().nom, y: Number(userList.docs[i].data().solde.toFixed(1))})
      }
      return res;
    }
  }
//rendu des dettes cards
  const renderSettle = () => {
    var debtList = [] //list des debts que l'on va afficher
    if(userList){
    let usersCopy = userList.docs.map((doc) => ({...doc.data()}));
     usersCopy.sort((a, b) => b.solde - a.solde) //tri par ordre décroissant de soldes
     while(usersCopy.length >= 2) {//tant qu'il existe des gens av des dettes pos ou neg 
      let maxEnHess = usersCopy.pop() // on pop le dernier de la liste qui ne devra plus rien 
      let maxEnBenef = usersCopy[0]
      if(!((-0.1 < maxEnBenef.solde && maxEnBenef.solde < 0.1) || (-0.1 < maxEnHess.solde && maxEnHess.solde < 0.1))){ // si un mec est en benef
      debtList.push(<Dette amount={-maxEnHess.solde} deveur={maxEnHess} receveur = {maxEnBenef.nom} key ={maxEnHess.uuid}/>)//on ajoute que le plus en hess rembourse toute sa dette a le plus en benef
      usersCopy[0] = {colocID: maxEnBenef.colocID, nom: maxEnBenef.nom, nomColoc: maxEnBenef.nomColoc, solde: (maxEnBenef.solde + maxEnHess.solde), tache: maxEnBenef.tache, uuid: maxEnBenef.uuid} //on update le nouveau solde du plus riche qui a recu ses tals 
      if(-0.1 < usersCopy[0].solde && usersCopy[0].solde < 0.1){ //si le nouveau solde du riche est proche de 0
        usersCopy = [...usersCopy.slice(1)]; //on le cut de la liste pcq il a été remboursé
      }
      usersCopy.sort((a, b) => b.solde - a.solde) //on retrie la liste avec les nouveaux soldes 
  }else{usersCopy.pop()}}// si personne est en benef, donc personne est en hess, donc on sort de la boucle (met un warning qd je sors dc je pop petit a petit)
}
  if (debtList.length > 0) {
    return (
      debtList.map(d =>{
        return(
          d
        )
      }
      )
    )
    
  }
  return(
    <View><Text>Vous n'avez encore rien dépensé ensemble... </Text></View>
  )
  }


  return (

<View style={{flex: 1}}>
<ScrollView showsVerticalScrollIndicator={false} >
<View style={{
        backgroundColor: 'white', 
        borderRadius: 13,
        marginTop: 15,
        marginBottom: 15, 
        width:'auto'
      }}>
      <VictoryChart 
      domainPadding={{x: [25, 50], y: 15}}
       
      padding={{ top: 20, bottom: 20, left: 10, right: 20 }}
      >
          <VictoryAxis
          style={{
            tickLabels: { fill: "none" },
            axis: {stroke: "none"}, 
            ticks: {fill: "none"},
          }}

        />
        
        <VictoryGroup data={orderData()}>
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
                <Text style={styles.DerniereDepense}>Tes transactions</Text>
                {renderSettle()}
              </ScrollView>

          
          <AddDepenseBS />

      </View>   
       

  );
};

const styles = StyleSheet.create({

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15
  },
  

})

export default PageEquilibrage;