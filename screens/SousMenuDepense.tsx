import React, { useCallback, useContext, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Top from '../components/HeaderDark';
import { Drawer, Colors, SegmentedControl, BorderRadiuses } from 'react-native-ui-lib';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import TopBackNavigation from '../components/TopBackNavigation';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getDoc, doc, collection, orderBy, query, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import{db} from '../firebase-config'
import { UserContext } from '../Context/userContextFile';
import DepenseCollective from '../components/DepenseCollective';
import TesDepense from '../components/TesDepenses';

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const SousMenuDepense = ({route, navigation}: Props) => {

// gestion du segmented control
  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Depenses générales'}, {label: 'Dépenses personelles'}]}
  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);
  
  const [oldData, setOldData] = useState(null);
  const[user, setUser] = useContext(UserContext);
  const EmptyDepense=require('../Img/EmptyDepense.png');
  const handleDelete = async (id) => { //update le solde et delete le doc
    const oldDoc = await getDoc(doc(db, "Colocs/"+user.colocID+"/Transactions/", id));
    updateSolde(oldDoc);
    await deleteDoc(doc(db, "Colocs/"+user.colocID+"/Transactions/", id));

  }
  //update le solde après supression de la transac
  const updateSolde = async (docu) => {
    const areConcerned  = docu.data().receiversID;
    const length = areConcerned.length;
    const amount = docu.data().amount;
    const payeur = docu.data().giverID;
    var payeurIsIn = false;
    for(var i = 0; i<length; i++){
      if(!(areConcerned[i]==payeur)){//si c pas le payeur
        await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(+amount/length)});
        
      }else {// si le payeur a payé pr lui aussi
        payeurIsIn = true;
        await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(-amount+(amount/length))});
      }
     
      }
      if(!payeurIsIn){
        await updateDoc(doc(db, "Users", payeur), {solde: increment(-amount)});
    }
    const refreshedData = await getDoc(doc(db, "Users", user.uuid)) // pr refresh le contexte av le nouveau solde
    setUser({...user, solde: refreshedData.data().solde}) //update le contexte av le nouvo solde
  }
  const [allTransacs] = useCollection(query(collection(db, "Colocs/"+user.colocID+ "/Transactions"), orderBy('timestamp', 'desc')))
  const renderContent = () =>{
    if(allTransacs){
      if(allTransacs.docs.length > 0)
      return(
        allTransacs.docs.map(c => {
          return(
            <View style= {{marginTop: 12}} key = {c.id}>
            <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}]}
            leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('2 prout')}}
            key = {c.id}>
            <Transaction key={c.id} giverID={c.data().giverID} receiverID={c.data().receiverID} amount={c.data().amount} desc={c.data().desc} date={c.data().timestamp} concerned={c.data().concerned}/>
            </Drawer>
            </View>
          )
    
        })
      )
      
    } 
    return (
      <View style={styles.emptypage}>
      <ImageContainer image={EmptyDepense} /> 
      <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} dépense</Text>
      </View>
    )
  
    }
    const ImageContainer = ({image}) => (
      <View style={styles.ImageContainer}>
          <Image source={image} style={styles.Image}/>
      </View>
    );

  return (
 

<View style={styles.container}>
< Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
  
  <View style={styles.Title}>
  <TopBackNavigation/>
  <Text style={styles.screenTitle}>Gestion des Dépenses</Text>
  </View>
  <View style={{flex: 1}}>

  <SegmentedControl 
        onChangeIndex={onChangeIndex}
        initialIndex={0}
        containerStyle={styles.control}
        segments={segments.second}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'white'
        outlineWidth= {2}
        throttleTime= {200}
        />

{show ? <DepenseCollective navigation={undefined} route={undefined} />:<TesDepense navigation={undefined} route={undefined} />}


</View>

</View>


  );
};



const styles = StyleSheet.create({

  Title: {
    flexDirection : 'row', 
  },

DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  
screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
},

container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#EDF0FA'
},

ImageContainer: {
  height: 120,
  width: 175,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},

Image: {
  height: '70%',
  width: '70%',
  },

emptytext: {
  textAlign: 'center',
  color: 'black',
  fontWeight: '700',
  fontSize: 16,
  marginTop: 10
},

  emptypage: {
    alignItems: 'center',
  },

  control: {
    marginBottom: 15,
  },

})

export default SousMenuDepense;