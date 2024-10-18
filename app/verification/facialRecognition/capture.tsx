import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SmileIDCapture = () => {
  const { isDarkMode, theme } = useContext(ThemeContext);
  const [isCapturing, setIsCapturing] = useState(false);
  // TODO: Add capture functionality after 3 seconds of countdown navigate to takeSelfie
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/verification/facialRecognition/takeSelfie');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.text }]}>Lemu ID</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.camera}>
          <View style={styles.captureArea}>
            <View style={styles.outlineCircle} />
          </View>
        </View>
      </View>
      <Text style={[styles.capturingText, { color: Colors.orange }]}>Capturing...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_20,
  },
  headerText: {
    fontSize: FONTSIZE.size_20,
    fontFamily: 'PoppinsSemiBold',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 3/4,
  },
  captureArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineCircle: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderStyle: 'dashed',
  },
  capturingText: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_16,
    fontFamily: 'PoppinsRegular',
    marginBottom: SPACING.space_20,
  },
});

export default SmileIDCapture;
