import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function usePressAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.set(withSpring(0.98));
  };

  const handlePressOut = () => {
    scale.set(withSpring(1));
  };

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
  };
}
