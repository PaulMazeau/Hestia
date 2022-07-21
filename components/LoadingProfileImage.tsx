import React, {  } from 'react';
import {View} from 'react-native';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'

const LoadingProfileImage = () => {
  
    const MyLoader = () => ( 
    <ContentLoader 
    viewBox="0 0 380 70"
    speed={1}
    backgroundColor={'white'}
    foregroundColor={'#DDD'}
    >
  
    <Circle cx="30" cy="30" r="30" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>)

    return (
        <View>
            {MyLoader()}
        </View>
    )

}


export default LoadingProfileImage