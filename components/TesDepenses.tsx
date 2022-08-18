import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Drawer, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from './Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useCollection } from 'react-firebase-hooks/firestore';
import { doc, collection, orderBy, query, deleteDoc, where } from 'firebase/firestore';
import{db} from '../firebase-config'
import { UserContext } from '../Context/userContextFile';
import DepenseDiagram from './DepenseDiagram';
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
  
  const renderContent = () =>{
    if (loading) {
      return(
        <View>
          {MyLoader()}
        </View>
      )
    }
    if(allTransacs){
      if(allTransacs.docs.length > 0)
      return(
        allTransacs.docs.map(c => {
          return(
            <View style= {styles.card} key = {c.id+user.uuid}>
            <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}]}
            leftItem={{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}}
            key = {c.id+user.uuid}
            style={{borderRadius: 10, elevation:2}}>
            <Transaction key={c.id} giverID={c.data().giverID} receiversID={c.data().receiversID} amount={c.data().amount} desc={c.data().desc} date={c.data().timestamp} concerned={c.data().concerned}/>
            </Drawer>
            </View>
          )
    
        })
      )
      
    } 
    return (
      <View style={styles.emptypage}>
      <ImageContainer image={EmptyDepense} /> 
      <Text style={styles.emptytext}>Oops, il n’y a pas encore de {'\n'} dépense</Text>
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

        
<ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:7}} stickyHeaderIndices={[2]}>
 

  <Text style={styles.sousTitre}>Récapitulatif de tes dépenses</Text>
    <DepenseDiagram global={false} clcID = {user.colocID}/>
    <View style={styles.listeTransac}><Text style={{fontSize:19, fontWeight: 'bold',marginBottom:12,}}>Dépenses te concernant</Text></View>
    {renderContent()}
    

</ScrollView>

</View>

</View>


  );
};



const styles = StyleSheet.create({


sousTitre:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
  },

  listeTransac:{
    marginLeft: 16,
    marginRight: 16,
    backgroundColor:'#EDF0FA'
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
  fontWeight: '600',
  fontSize: 16,
  marginTop: 10
},

  emptypage: {
    alignItems: 'center',
  },

  control: {
    marginBottom: 15,
  },

  card: {
    marginBottom:12,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 16,
  }
})

export default TesDepense;