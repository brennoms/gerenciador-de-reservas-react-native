import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import axios from "axios";

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}`);

        if (res.status === 200) {
          setLoaded(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.log("Servidor offline", error);
      }
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  if (loaded) {
    return <Redirect href="/property" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="text-[#3b82f6]">
        Conectando ao servidor...
      </Text>
    </View>
  );
}