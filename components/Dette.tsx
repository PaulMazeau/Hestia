import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';


const ProfilImage=require('../Img/test2.png');
//props est amount, deveur, receveur;
const Dette  = (props) => {
  if(props.amount != 0){
  return (
    
        <View style={styles.container}>
                
            <ImageContainer image={ProfilImage} />  

          <View style={styles.Text}>
              <View style={styles.Left}>
                  <Text style={styles.titre}>{props.deveur} doit</Text>

                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>à {props.receveur}</Text>
                  </View>
              </View>

              <View style={styles.Right}>
                  <Text style={styles.titre}>{props.amount}</Text>

                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>05/04/2022</Text>
                  </View>
              </View>

            </View>
        </View>
    
  )};
  return(
    <View><Text>Ieeeee</Text></View>
  )
};

const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginBottom: 15,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  Left: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10
    },

  Right: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
    alignItems: 'center'
  },

  titre: {
    fontWeight: '600',
    fontSize: 19,

  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  date: {
    fontSize: 14,
  },

  avatar: {
    width: 40,
    height: 40,
  },

  ImageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 7,
},
    Image: {
        height: '100%',
        width: '100%',
    },

  Text:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  }
});

export default Dette;