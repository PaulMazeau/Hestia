import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';


interface Props {
  image1: Image;
  image2: Image | null;
  setbigimage: React.Dispatch<React.SetStateAction<Image>>;
}

const AvatarColum: React.FC<Props> = ({image1, image2, setbigimage}) => {
    return (
        <View style={{flexDirection:'column'}}>
        <TouchableOpacity onPress={() => {setbigimage(image1)}}>
          <SmallImage image={image1}></SmallImage>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {if(image2!=null){setbigimage(image2)}}}>
          <SmallImage image={image2}></SmallImage>
        </TouchableOpacity>
      </View>
          
      
    );
};

const SmallImage = ({image}) => (
    <View style={styles.SmallImages}>
        <Image source={image} style={{height: '100%',width: '100%',borderRadius:15}}/>
    </View>
);

const styles = StyleSheet.create({
    SmallImages:{
      height: 90,
      width: 90,
      margin:5
      
    },

})


export default AvatarColum;