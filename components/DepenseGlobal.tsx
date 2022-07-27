import React, {  } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase-config';
import { useCollection } from 'react-firebase-hooks/firestore';
import Depense from './DepenseDiagram';
import ContentLoader, { Rect } from 'react-content-loader/native';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  >
  <Rect x="0" y="10" rx="10" ry="10" width="100%" height="70" />
  </ContentLoader>)


type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

// props est colocID à passer dans la botomsheet avec usersList
const AllDepense = (props) => {

//on cherche la dernière transac en placant un ecouteur sur la db
const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), orderBy('timestamp', 'desc'), limit(1));
const [values, loading, error] = useCollection(q);

//on affiche la dernière transa
const getLastestTransac =  () => {
  
  if(values){
    if(values.docs.length > 0){
    return (
      values.docs.map(v=>{
        return(
          <View style={{marginTop: 12, marginLeft: 16, marginRight: 16}} key = {v.id}>
            <Transaction key = {v.id} giverID={v.data().giverID} receiversID={v.data().receiversID} amount={v.data().amount} desc={v.data().desc} date={v.data().timestamp} concerned={v.data().concerned}/>
          </View>
        )
      })
    )
  }
  else {
      return (
        <View style={styles.emptypage}>
          <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} transactions</Text>
      </View>
      )
    }

  }
}

  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();
  
  return (
    <View style={{flex:1}}>
        <Text style={styles.RecapDepense}>Récapitulatif dépenses</Text>
        <Depense clcID = {props.clcID} global = {true} userList={props.userList}/>
            <View style={styles.Title}>
              <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SousMenuDepense')} >
                <Text style={styles.VoirToutes}>Voir toutes {'>'}</Text>
              </TouchableOpacity>
            </View>
              {getLastestTransac()}
    </View>
  );
};

const styles = StyleSheet.create({

  Title:  {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16
  },

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },

  RecapDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 16,
    marginRight: 16
  },
  
  VoirToutes: {
  fontSize: 14,
  color: '#8F8F8F',
  },

  ImageContainer: {
    height: 175,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},

Image: {
    height: '100%',
    width: '100%',
    },

emptytext: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10
},

    emptypage: {
      alignItems: 'center',
      marginTop: 20
    }
})

export default AllDepense;


