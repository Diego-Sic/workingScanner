import { SafeAreaView } from "react-native";
import CodeScanner from "./scanner";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CodeScanner />
    </SafeAreaView>
  );
}
