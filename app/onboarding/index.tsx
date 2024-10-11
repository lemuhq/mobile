import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	Animated,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { onboardingData } from "@/data/onboardingData";
import OnboardingItem from "@/components/OnboardingItem";
import OnboardingPagination from "@/components/OnboardingPagination";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const Onboarding = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);

	const slidesRef = useRef<any>(null);
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currenIndex, setCurrenIndex] = useState(0);

	//Currently viewed index
	const viewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: any[] }) => {
			setCurrenIndex(viewableItems[0].index);
		}
	).current;

	//Next slide needs to be 50% on screen before it changes
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	function scrollToNext() {
		if (currenIndex < onboardingData.length - 1) {
			slidesRef.current.scrollToIndex({ index: currenIndex + 1 });
		} else {
			router.navigate("/register");
		}
	}

	return (
		<View
			style={{
				backgroundColor: theme.background,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View style={{ flex: 3 }}>
				<FlatList
					data={onboardingData}
					renderItem={({ item, index }) => (
						<OnboardingItem key={index} item={item} />
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					scrollEventThrottle={32}
					ref={slidesRef}
				/>
			</View>

			<View
				style={{
					flex: 0.5,

					width: "100%",
					gap: Colors.spacing * 2,
					paddingHorizontal: Colors.spacing * 2,
				}}
			>
				<OnboardingPagination
					data={onboardingData}
					currentIndex={currenIndex}
				/>
				<Button
					variant="primary"
					buttonText="Continue"
					onPress={scrollToNext}
				/>
			</View>
		</View>
	);
};

export default Onboarding;
