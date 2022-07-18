import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Avance from './Avance';
import Dette from './Dette';
import{auth, db} from '../firebase-config'
import { useFocusEffect } from '@react-navigation/native';
import { getDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

const DepensePerso = (props) => {

  const MyLoader = () => ( 
    <ContentLoader 
    viewBox="0 0 380 70"
    speed={1}
    backgroundColor={'white'}
    foregroundColor={'#DDD'}
    >
  
    <Circle cx="30" cy="30" r="30" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>)

  const [userList, setUserList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getUsers = async () => {
        const data = await getDoc(doc(db, "Colocs", props.clcID));
        const membersID = data.data().membersID;
        const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
        const querySnapshot = await getDocs(q);
        setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
      }
      getUsers();

      return () => {
        // screen unfocus

      };
    }, [])
  );

  const renderSettle = () => {
    var debtList = [] //list des debts que l'on va afficher
    let usersCopy = userList;
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
<ScrollView showsVerticalScrollIndicator={false}>
    <Depense clcID= {props.clcID}/>

                <Text style={styles.DerniereDepense}>Tes transactions</Text>

                {renderSettle()}
              </ScrollView>

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

export default DepensePerso;