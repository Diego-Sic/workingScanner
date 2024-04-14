import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { CameraView, Camera } from "expo-camera/next";

const CodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData((prevData) => [...prevData, { type, data }]);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Type: {item.type}</Text>
      <Text style={styles.text}>Data: {item.data}</Text>
    </View>
  );

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
        <View style={styles.cameraSquare}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "code128",
                "aztec",
                "ean13",
                "ean8",
                "pdf417",
                "upc_e",
                "datamatrix",
                "code39",
                "code93",
                "itf14",
                "codabar",
                "upc_a",
              ],
            }}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>

      <FlatList
        data={scannedData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Tap to Scan Again"
            onPress={() => setScanned(false)}
            color="#4CAF50"
            style={styles.button}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  cameraSquare: {
    width: 300,
    height: 300,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 3,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default CodeScanner;
