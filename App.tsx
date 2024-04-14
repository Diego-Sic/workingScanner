import { SafeAreaView } from "react-native";
import CodeScanner from "./Scanner";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CodeScanner></CodeScanner>
    </SafeAreaView>
  );
}
