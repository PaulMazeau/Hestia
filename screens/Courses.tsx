import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import AvatarColum from '../components/AvatarColum'



type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;


const data : Image[] = [
  require('../Img/Avatars/Avatar1-min.png'),
  require('../Img/Avatars/Avatar1.jpg'),
  require('../Img/Avatars/Avatar5.1000.jpg'),
  require('../Img/Avatars/Avatar5.jpg'),
  require('../Img/Avatars/Avatar7.png'),
  require('../Img/Avatars/Avatar3.png'),
  require('../Img/Avatars/Avatar8.png'),
  require('../Img/Avatars/Avatar9.png'),
  require('../Img/Avatars/Avatar10.png'),
  require('../Img/Avatars/Avatar11.png'),
  require('../Img/Avatars/Avatar12.png'),
  require('../Img/Avatars/Avatar13.png'),
  require('../Img/Avatars/Avatar14.png'),
  require('../Img/Avatars/Avatar17.png'),
  require('../Img/Avatars/Avatar15.png'),
  require('../Img/Avatars/Avatar16.png'),
];


const CoursesScreen = ({navigation}: Props) => {
  {/**variable dynamique de type Image pour changer l'appercu de l'avatar en cliquand dans la gallerie, on l'initialise avec une image*/}
  const [bigimage, setbigimage] = useState(require('../Img/Avatars/Avatar1.png'))
  

  return (

    

<View style={styles.Body} >
    
  <View style={styles.first50}>

    <SafeAreaView>
    <View style={styles.TopBar}>
        <TopBackNavigationClear/>
        <TouchableOpacity>
          <Text style={styles.SeConnecter}>Se connecter</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
      
    <Text style={styles.ChoisiTonAvatar}>Choisi ton Avatar</Text>

    <Image source={bigimage} style={styles.BigImage}/>
    
  </View>
    

  <ScrollView style={styles.AvatarGallerie}>  
  {/**Gallerie d'avatars */}
  <ScrollView  
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
      >
      {/**component qui prend deux images (la deuxieme peut etre null si pas assez d'images) et qui renvoit une colonne de deux avatars cliquable */}                
      <AvatarColum image1={data[0]} image2={data[1]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[2]} image2={data[3]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[4]} image2={data[5]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[6]} image2={data[7]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[8]} image2={data[9]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[10]} image2={data[11]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[12]} image2={data[13]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[14]} image2={data[15]} setbigimage={setbigimage}></AvatarColum>
      <AvatarColum image1={data[16]} image2={null} setbigimage={setbigimage}></AvatarColum> 
  </ScrollView>
    

  
  <TouchableOpacity>
    <View style={styles.CestPartiBouton}>
      <Text style={styles.CestPartiText}> C'est parti</Text>
    </View>
  </TouchableOpacity>
  
      
      
  </ScrollView>    
  </View>

  
   
 

    
  );
};



const styles = StyleSheet.create({
    TopBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:15,
      ...Platform.select({
        ios:{
          paddingTop:0
        },
        android:{
          paddingTop:30
        }
      })
    },
    Body: {
      backgroundColor: '#EDF0FA',
      flex: 1,
      overflow:'visible',
      clipToPadding:'false',
      flexDirection:'column',
      justifyContent:'space-evenly',      
    },
    first50:{
      backgroundColor: '#172ACE',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      height:'60%',
      flex:1.5,
      paddingBottom:40
    },
    AvatarGallerie:{
      flex:3,
      marginTop:10
    },
    SeConnecter:{
      color: 'white',
      textAlign: 'right',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 10
    },
    ChoisiTonAvatar:{
      color: 'white',
      textAlign: 'left',
      fontSize: 25,
      fontWeight: '500',
      margin:15,
      marginTop:50,
      marginBottom:30,
    },
    BigImage: {
      aspectRatio:1/1, 
      height: '50%',
      width: '50%',
      borderRadius:200,
      marginLeft:'auto',
      marginRight:'auto',
      
    },
    CestPartiBouton:{
      margin:20,
      marginTop:10,
      marginBottom:10,
      padding:10,
      backgroundColor:'#172ACE',
      borderRadius:10,
    },
    CestPartiText:{
      textAlign:'center',
      fontSize:20,
      color:'white',
    }
})

export default CoursesScreen;