/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

export default class ImageCapture extends React.Component {
  state = {
    flash: 'off',
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    imageUri: null
  };

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  closePicture() {

  }

  confirmPicture() {

  }

  takePicture = async function() {
    const options = { 
      quality: 0.1, //image quality
      base64: true, //base64 format enabled
      // doNotSave: true, //preventing image saving in device
      pauseAfterCapture: true, //pausing camera after capturing
      fixOrientation: true, //sticking picture in portrait mode
    };
          const data = await this.camera.takePictureAsync(options);
          // let saveResult = CameraRoll.saveToCameraRoll(data.uri);
          // console.warn("takePicture ", saveResult);
          console.log("uri ", data.uri);
          console.log("base64  ", data.base64);
          console.log("width ", data.width);
          console.log("height ", data.height);

          this.setState({ imageUri: data });

        //   <View>
        //     <Image
        //   style={{width: data.width, height: data.height}}
        //   source={{uri: data.uri}}
        // />
        //   </View>
  };

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onBarCodeRead={(barcodes) => {
          console.warn(barcodes.data);
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.warn(barcodes);
          // conditional part for barcode
          // if (barcodes) {
          //   this.props.navigation.navigate('ButtonRoute')
          // } else {
          //   console.log(barcodes);
          // }
        }}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  }

  render() {
    const imageUri = this.state.imageUri;
    if (imageUri) {
    return (
        <ImageBackground source={imageUri} style={{width: '100%', height: '100%'}}>
        <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
        <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.closePicture.bind(this)}
          >
            <Text style={styles.flipText}> Close </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.confirmPicture.bind(this)}
          >
            <Text style={styles.flipText}> Confirm </Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
    );
    }
    return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
});