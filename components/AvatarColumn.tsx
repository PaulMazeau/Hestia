import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';


interface Props {
  imageUrl1: String;
  imageUrl2: String | null;
  setAvatarUrl: React.Dispatch<React.SetStateAction<String>>;
}

const AvatarColum: React.FC<Props> = ({imageUrl1, imageUrl2, setAvatarUrl}) => {
    return (
        <View style={{flexDirection:'column'}}>
        <TouchableOpacity onPress={() => {setAvatarUrl(imageUrl1)}}>
          <SmallImage source={{uri: imageUrl1}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {if(imageUrl2!=null){setAvatarUrl(imageUrl2)}}}>
          <SmallImage source={{uri: imageUrl2}}/>
        </TouchableOpacity>
      </View>
          
      
    );
};

const SmallImage = ({source}) => (
    <View style={styles.SmallImages}>
        <Image source={source} style={{height: '100%',width: '100%',borderRadius:15}}/>
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