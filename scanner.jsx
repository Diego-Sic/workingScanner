// scanner.js
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import PropTypes from "prop-types";

const CodeScanner = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onScan(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned`);
  };

  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan your Book!</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <Button
          title="Tap to Scan Again"
          onPress={() => setScanned(false)}
          color="#4CAF50"
        />
      )}
    </View>
  );
};

CodeScanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CodeScanner;
