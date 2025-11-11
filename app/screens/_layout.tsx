import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="index" options={{ title: "Gestão de Turmas" }} />
    <Stack.Screen name="atividades" options={{ title: "Atividades" }}/>
  </Stack>;
}