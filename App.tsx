// App.js
import { SafeAreaView } from "react-native";
import CodeScanner from "./scanner";
import BookInfo from "./BookInfo";
import { useState } from "react";

export default function App() {
  const [isbn, setIsbn] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CodeScanner onScan={setIsbn} />
      <BookInfo isbn={isbn} />
    </SafeAreaView>
  );
}
