import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import { RootStackParams } from '../App';
import TopBackNavigation from '../components/TopBackNavigation';
import Top from '../components/HeaderDark';
import Food from '../components/Food';
import { ScrollView } from 'react-native-gesture-handler';
import { doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AddFood from '../components/AddFood';
import { useHeaderHeight } from '@react-navigation/elements';
import { UserContext } from '../Context/userContextFile';


type Props = NativeStackScreenProps<RootStackParams, 'Course'>;

//dans la db course: Nom, boisson, fruits, maison, viandes, 
const CourseScreen = ({ route, navigation }: Props) => {
  const [user, setUser] = useContext(UserContext);
  //data est la liste de course
  const [data, loading, error] = useDocumentData(doc(db, "Colocs/"+route.params.clcID+ "/Courses", route.params.courseID))
  const renderDivers = () => { //super nom de variable....
    if(data && data.divers){
      return (
          data.divers.map((item)=> {if(!(item.selected)){
            return(
              <Food key= {item.item} name = {item.item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"divers"} isSelected={item.selected}></Food>
            )
          }
          })
      )
    }
    return (
      <></>
    )
  }
  const renderDiversSelected = () => { 
    if(data && data.divers){
      return (
          data.divers.map((item)=> {if(item.selected){
            return(
              <Food key= {item.item} name = {item.item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"divers"} isSelected={item.selected}></Food>
            )
          }
          })
      )
    }
    return (
      <></>
    )
  }
 



  // const renderViandes = () => {
  //   if(data && data.viandes){
  //     return (
          
  //         data.viandes.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"viandes"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderBoissons = () => {
  //   if(data && data.boisson){
  //     return (
          
  //         data.boisson.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"boisson"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderProduitsfrais = () => {
  //   if(data && data.produitsfrais){
  //     return (
          
  //         data.produitsfrais.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"produitsfrais"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderGoute = () => {
  //   if(data && data.goute){
  //     return (
          
  //         data.goute.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"goute"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderSurgeles = () => {
  //   if(data && data.surgeles){
  //     return (
          
  //         data.surgeles.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"surgeles"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderConserves = () => {
  //   if(data && data.conserves){
  //     return (
          
  //         data.conserves.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"conserves"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  // const renderMaison = () => {
  //   if(data && data.maison){
  //     return (
          
  //         data.maison.map((item)=> {
  //           return(
  //             <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"maison"}></Food>
  //           )
  //         })
  //     )
  //   }
  //   return (
  //     <></>
  //   )
  // }
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.container}>
     < Top  name={route.params.username} clcName={route.params.clcName} avatar = {user.avatarUrl}/>
    
      
      <View style = {styles.Title}>
        <TouchableOpacity style={{flexDirection: 'row'}}  onPress={() => {
      navigation.goBack() }}>
        <TopBackNavigation/>
        <Text style={styles.screenTitle}>{route.params.name}</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBackGround}>

          {renderDivers()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"divers"}></AddFood>
          {renderDiversSelected()}

          
          
          {/* <Text style={styles.Food_title}>Viandes & Poissons</Text>
            <View style = {styles.separator}></View>
              {renderViandes()}  
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"viandes"}></AddFood>

          <Text style={styles.Food_title}>Produits frais</Text>
            <View style = {styles.separator}></View>
              {renderProduitsfrais()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"produitsfrais"}></AddFood>

          <Text style={styles.Food_title}>Petit déjeuner & Gouter</Text>
            <View style = {styles.separator}></View>
              {renderGoute()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"goute"}></AddFood>

          <Text style={styles.Food_title}>Surgelés</Text>
            <View style = {styles.separator}></View>
              {renderSurgeles()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"surgeles"}></AddFood>

          <Text style={styles.Food_title}>Conserves</Text>
            <View style = {styles.separator}></View>
              {renderConserves()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"conserves"}></AddFood>

          <Text style={styles.Food_title}>Boissons</Text>
            <View style = {styles.separator}></View>
              {renderBoissons()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"boisson"}></AddFood>
          
          <Text style={styles.Food_title}>Maison</Text>
            <View style = {styles.separator}></View>
              {renderMaison()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"maison"}></AddFood> */}

        </View>
      </ScrollView>
  </KeyboardAvoidingView>
        
    
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: '#EDF0FA',
    paddingLeft:15,
    paddingRight:15,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  Title: {
    flexDirection : 'row', 
    marginBottom : 15,
  },

  whiteBackGround:{ 
    backgroundColor:'white',
    borderRadius:10,
    height:'auto',
    paddingLeft:10,
    paddingRight:10,
    paddingBottom: 10,
    paddingTop:10,
    minHeight : 103,
  },

  Food_title: {
    paddingLeft : 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15
  },

  separator: {
    height : 1,
    width : "100%",
    backgroundColor : "#172ACE",
    marginTop : 10,
    marginBottom : 10,
  },
});

export default CourseScreen;
