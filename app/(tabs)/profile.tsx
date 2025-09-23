import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);
  const firstName = user?.name?.split(" ")[0] || "User";
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-black">
      <View className="items-center bg-[#001F3F] pb-8 pt-16 rounded-b-3xl">
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${firstName}&background=001F3F&color=fff&size=128`, }}
          className="w-28 h-28 rounded-full border-4 border-white mb-4"
        />
        <Text className="text-2xl font-bold text-white">{user?.name || "Guest User"}</Text>
        <Text className="text-gray-200">{user?.email || "guest@example.com"}</Text>
      </View>

      <View className="px-6 mt-8 gap-y-10">
        <TouchableOpacity className="flex-row items-center bg-white dark:bg-neutral-900 rounded-xl px-4 py-5 shadow">
          <Feather name="user" size={22} color="#001F3F" />
          <Text className="ml-3 text-lg text-gray-800 dark:text-gray-200">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white dark:bg-neutral-900 rounded-xl px-4 py-5 shadow">
          <Feather name="settings" size={22} color="#001F3F" />
          <Text className="ml-3 text-lg text-gray-800 dark:text-gray-200">
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white dark:bg-neutral-900 rounded-xl px-4 py-5 shadow">
          <Feather name="bell" size={22} color="#001F3F" />
          <Text className="ml-3 text-lg text-gray-800 dark:text-gray-200">
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white dark:bg-neutral-900 rounded-xl px-4 py-5 shadow">
          <Feather name="help-circle" size={22} color="#001F3F" />
          <Text className="ml-3 text-lg text-gray-800 dark:text-gray-200">
            Help & Support
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 mt-10">
        <TouchableOpacity
          onPress={() => router.push("/signin")}
          className="bg-red-500 rounded-full py-4 items-center shadow-lg"
        >
          <Text className="text-white text-lg font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
