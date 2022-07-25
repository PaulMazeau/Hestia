import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Drawer, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from './Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getDoc, doc, collection, orderBy, query, deleteDoc, updateDoc, increment, where } from 'firebase/firestore';
import{db} from '../firebase-config'
import { UserContext } from '../Context/userContextFile';
import DepenseDiagram from './DepenseDiagram';
import { useFocusEffect } from '@react-navigation/native';
import ContentLoader, { Rect } from 'react-content-loader/native';

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  >
  <Rect x="0" y="0" rx="10" ry="10" width="100%" height="275" />
  <Rect x="0" y="285" rx="10" ry="10" width="100%" height="25" />
  <Rect x="0" y="320" rx="10" ry="10" width="100%" height="50" />
  <Rect x="0" y="380" rx="10" ry="10" width="100%" height="50" />
  <Rect x="0" y="440" rx="10" ry="10" width="100%" height="50" />
  </ContentLoader>)

const TesDepense = ({route, navigation}: Props) => {
  
  const [oldData, setOldData] = useState(null);
  const[user, setUser] = useContext(UserContext);
  const EmptyDepense=require('../Img/EmptyDepense.png');
  const handleDelete = async (id) => { //update le solde et delete le doc
    await deleteDoc(doc(db, "Colocs/"+user.colocID+"/Transactions/", id));
  }
  //update le solde après supression de la transac
  const [allTransacs, loading, error] = useCollection(query(collection(db, "Colocs/"+user.colocID+ "/Transactions"), where('concerned', 'array-contains', user.uuid), orderBy('timestamp', 'desc')));
 
  if (loading) {
    return(
      <View>
        {MyLoader()}
      </View>
    )
  }
  

  const renderContent = () =>{
    if(allTransacs){
      if(allTransacs.docs.length > 0)
      return(
        allTransacs.docs.map(c => {
          return(
            <View style= {{marginTop: 12}} key = {c.id+user.uuid}>
            <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}]}
            leftItem={{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}}
            key = {c.id+user.uuid}
            style={{borderRadius: 10, elevation:2}}>
            <Transaction key={c.id+user.uuid} giverID={c.data().giverID} amount={(c.data().amount + 0.001).toFixed(1)} desc={c.data().desc}/>
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

  <View style={{flex: 1}}>

        
<ScrollView showsVerticalScrollIndicator={false}>
 

  <Text style={styles.sousTitre}>Récapitulatif de tes dépenses</Text>
    <DepenseDiagram global={false} clcID = {user.colocID}/>
    <Text style={styles.listeTransac}>Toutes tes transactions</Text>
    {renderContent()}
    

</ScrollView>



</View>

</View>


  );
};



const styles = StyleSheet.create({

  Title: {
    flexDirection : 'row', 
  },

sousTitre:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  listeTransac:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
},

container: {
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

export default TesDepense;