import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';


function App() {
	const [selectedImage, setSelectedImage] = React.useState(null);
	
	// Select the Image
  let openImagePickerAsync = async () => {
			let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
			
			if (permissionResult.granted === false) {
				alert('Warning!!! Permission to access camera is required');
				return;
			}
			
			let pickerResult = await ImagePicker.launchImageLibraryAsync();
			
			if (pickerResult.cancelled === true ) {
			return;  	
			}
			
			setSelectedImage({ localUri: pickerResult.uri });
	// Share to website
	if (Platform.OS === 'web') {
		let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
		setSelectedImage({ localUri: pickerResult.uri, remoteUri })
	} else {
		setSelectedImage({ localUri: pickerResult.uri, remoteUri: null })
	}
		};

	
		
  // Share the selected Image
  let openShareDialogAsync = async () => {
  	if (!(await Sharing.isAvailableAsync())) {
  		alert(`The image is available for sharing at: ${selectedImage.remoteUri}`)
  		return;
  	}
  	await Sharing.shareAsync(selectedImage.localUri);
  };
  
  
  // After picking an image
  if (selectedImage !== null) {
  	return (
  		<View style={styles.container}>
  			<Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
  			<TouchableOpacity onPress={openShareDialogAsync} style={styles.button} >
  				<Text style={styles.buttonText}>Are you sure to share this photo? </Text>
  			</TouchableOpacity>
  		</View>
  	)
  }


  return (
    <View style={styles.container}>
    	<Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />
      <Text style={styles.instructions}>Tap to share a photo from your phone to your friends phone</Text>
      
      <TouchableOpacity onPress={openImagePickerAsync} style={ styles.btn }>
      	<Text style={ styles.btnTxt }>  Pick a photo </Text>
      </TouchableOpacity>	
      	
    </View>
  );
}

const styles = StyleSheet.create({
	
	btn: {
	backgroundColor: 'blue',
	padding: 20,
	borderRadius: 10,
	},
	
	btnTxt: {
	fontSize: 20,
	color: '#fff',
	},
	
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
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  thumbnail: {
  	width: 300,
  	height: 300,
  	resizeMode: 'contain'
  }
});

export default App;
