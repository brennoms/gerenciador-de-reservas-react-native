import { View } from "react-native"
import { Link } from "expo-router";

const linkclass: string = "text-blue-500 text-center mb-2 text-4xl"

export default function Index() {
  return (
    <View className="flex-1 justify-center">

      <Link className={linkclass} href={"/login"}>/login</Link>

      <Link className={linkclass} href={"/register"}>/register</Link>

      <Link className={linkclass} href={"/property"}>/property</Link>

    </View>
  );
}
