import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';

function App() {
  return (
    <View style={styles.container}>
    	<Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />
      <Text style={styles.instructions}>Tap to share a photo from your phone to your friends phone</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
	
	logo: {
		 width: 305, 
		 height: 160 ,
		 marginBottom: 10
	},
	
	instructions: {
		color:'#888', 
		fontSize: 19 ,
		marginHorizontal: 15,
	},
	
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
