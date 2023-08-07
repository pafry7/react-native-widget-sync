import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getItem, reloadAll, setItem } from "react-native-widget-sync";

const GROUP_NAME = "group.expo.modules.widgetsync.example";

const getSharedData = getItem(GROUP_NAME);
const setSharedData = setItem(GROUP_NAME);

function Button({ onPress, title }: { title: string; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default function App() {
  const [value, setValue] = useState(getSharedData(GROUP_NAME) ?? "");

  useEffect(() => {
    setSharedData("savedData", value);
    reloadAll();
  }, [value]);

  const onPress = () => {
    setValue("Hello from App.tsx");
  };

  const clear = () => {
    setValue("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.description}>Current value</Text>
        <Text style={styles.value}> {value}</Text>
      </View>
      <View style={styles.spacer} />
      <Button onPress={onPress} title="Set value" />
      <Button onPress={clear} title="Clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
  },
  description: {
    fontSize: 14,
    color: "dimgray",
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  spacer: {
    height: 10,
  },
});
