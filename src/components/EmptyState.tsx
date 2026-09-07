import { Text, View } from "react-native";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-center text-lg font-semibold text-[#171512]">
        {title}
      </Text>

      {description && (
        <Text className="mt-2 text-center text-sm text-[#6F6A63]">
          {description}
        </Text>
      )}
    </View>
  );
}
