import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';


interface Props {
  image1: String;
  image2: String | null;
  setAvatar: React.Dispatch<React.SetStateAction<Image>>;
  avatar1: Image;
  avatar2: Image;
  setAvatarUrl: React.Dispatch<React.SetStateAction<String>>;
}

const AvatarColum: React.FC<Props> = ({image1, image2, setAvatar, avatar1, avatar2, setAvatarUrl}) => {
    return (
        <View style={{flexDirection:'column'}}>
        <TouchableOpacity onPress={() => {setAvatar(avatar1), setAvatarUrl(image1), console.log(image1)}}>
          <SmallImage image={image1}></SmallImage>
          <SmallImage image={avatar1}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {if(image2!=null){setAvatar(avatar2), setAvatarUrl(image1), console.log(image2)}}}>
          <SmallImage image={image2}></SmallImage>
          <SmallImage image={avatar2}/>
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
      height: 110,
      width: 110,
      margin:5

    },

})


export default AvatarColum;