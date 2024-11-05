import { View, FlatList, Animated, Platform } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { onboardingData } from "@/data/onboardingData";
import OnboardingItem from "@/components/OnboardingItem";
import OnboardingPagination from "@/components/OnboardingPagination";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { SPACING } from "@/constants/Theme";

const Onboarding = () => {
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
				backgroundColor: Colors.orangeTintTwo,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
			}}
		>
			<StatusBar style={"dark"} />

			<View
				style={{
					flex: 3,
					position: "relative",
					zIndex: 30,
					backgroundColor: "transparent",
				}}
			>
				<FlatList
					data={onboardingData}
					renderItem={({ item, index }) => (
						<OnboardingItem key={index} item={item} index={index} />
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
					// flex: 0.5,
					width: "100%",
					gap: Colors.spacing * 2,
					paddingHorizontal: Colors.spacing * 2,
					zIndex: 30,
					backgroundColor: "transparent",
					position: "absolute",
					bottom: 0,
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop:
						Platform.OS === "ios" ? SPACING.space_10 : SPACING.space_10,
					paddingBottom:
						Platform.OS === "ios" ? SPACING.space_24 : SPACING.space_10,
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
