import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color="#000" />
          ),
        }}
      />
    </Tabs>
  );
}
