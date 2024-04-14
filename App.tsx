import { View, SafeAreaView, Button, ScrollView, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };
  const selectImage = async (useLibrary: boolean) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filname = new Date().getTime() + ".jpg";
    const dest = imgDir + filname;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button
          title="Photo Library"
          onPress={() => selectImage(true)}
        ></Button>

        <Button
          title="Capture Image"
          onPress={() => selectImage(false)}
        ></Button>
      </View>
      <ScrollView>
        {images.map((img) => (
          <Image
            key={img}
            source={{ uri: img }}
            style={{ width: 300, height: 300 }}
          ></Image>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
