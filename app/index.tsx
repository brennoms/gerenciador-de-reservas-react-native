import { Redirect } from "expo-router";
import { useEffect } from "react";
import axios from "axios"

export default function Index() {

  useEffect(() => {
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}`)
    .then((data) => {
      console.log(data.data);
    })
  }, [])

  return (
    <Redirect href="/login"/>
  );
}
