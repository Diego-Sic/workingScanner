import { SafeAreaView } from "react-native";
import CodeScanner from "./scanner";
import BookInfo from "./BookInfo";
import { useState } from "react";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CodeScanner />
    </SafeAreaView>
  );
}
