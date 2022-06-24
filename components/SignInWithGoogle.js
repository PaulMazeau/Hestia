import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "69579247938-fefjncj92g62m9ag457k10jp5h02q5l3.apps.googleusercontent.com",
    iosClientId: "669579247938-e3ckas4j3sei1l9lvl3rr6c1qm5hvrct.apps.googleusercontent.com",
    expoClientId: "69579247938-2siuv7f4n4tg3pcj432btt4uo8ucs15l.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <View style={styles.container}>
     
      <Button 
        title={"Login with google"}
        onPress={() => { promptAsync({useProxy: false, showInRecents: true}) }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});