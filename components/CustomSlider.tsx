import {
	View,
	Text,
	Dimensions,
	PanResponder,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

interface CustomSliderProps {
	min: number;
	max: number;
	step: number;
	onValueChange?: (value: number) => void;
}

export default function CustomSlider({
	min,
	max,
	step,
	onValueChange,
}: CustomSliderProps) {
	const [value, setValue] = useState(min);
	const sliderWidth = Dimensions.get("window").width * 0.7;
	const thumbPosition = useSharedValue(0);

	const updateValue = (newValue: number) => {
		const clampedValue = Math.min(max, Math.max(min, newValue));
		setValue(clampedValue);
		onValueChange?.(clampedValue);

		// Update thumb position
		const position = ((clampedValue - min) / (max - min)) * sliderWidth;
		thumbPosition.value = withSpring(position, { damping: 20 });
	};

	const increment = () => updateValue(value + step);
	const decrement = () => updateValue(value - step);
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			const newPosition = Math.min(
				Math.max(gestureState.dx, 0),
				sliderWidth
			);
			thumbPosition.value = newPosition;

			const newValue = Math.round(
				min + (newPosition / sliderWidth) * (max - min)
			);
			setValue(newValue);
			onValueChange?.(newValue);
		},
	});

	const thumbStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: thumbPosition.value }],
	}));

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={decrement}>
				<Text style={styles.button}>−</Text>
			</TouchableOpacity>

			<View style={styles.sliderContainer}>
				<View style={styles.track} />
				<Animated.View
					style={[styles.thumb, thumbStyle]}
					{...panResponder.panHandlers}
				/>
			</View>

			<TouchableOpacity onPress={increment}>
				<Text style={styles.button}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	button: {
		fontSize: 24,
		color: "#D98C5C",
		paddingHorizontal: 10,
	},
	sliderContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	track: {
		height: 2,
		backgroundColor: "#FFF",
		width: "100%",
	},
	thumb: {
		position: "absolute",
		width: 20,
		height: 20,
		backgroundColor: "#D98C5C",
		borderRadius: 10,
	},
});
