import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Image } from "expo-image";

export default function NewScreen() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://test.blockfuselabs.com/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setNews(data.data || data);
      })
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#001F3F" />
        <Text className="text-lg mt-2 text-gray-600">Loading news...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4 pt-16">
      <Text className="text-3xl font-bold mb-6 text-[#001F3F]">
        📰 Latest News
      </Text>

      <FlatList
        data={news}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Pressable className="mb-6 rounded-2xl bg-white shadow-lg overflow-hidden">
            {item.featured_image && (
              <Image
                source={{ uri: item.featured_image }}
                className="w-full h-48"
                contentFit="cover"
              />
            )}
            <View className="p-4">
              <Text className="text-xl font-semibold text-[#001F3F] mb-2">
                {item.title}
              </Text>
              <Text className="text-gray-600 leading-6" numberOfLines={10}>
                {item.body}
              </Text>
              <Text className="mt-3 text-sm text-blue-600 font-medium">
                Read more →
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
