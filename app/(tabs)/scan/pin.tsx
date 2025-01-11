import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const Pin = () => {
    const [pin, setPin] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleNumberPress = (num: string) => {
        if (isProcessing) return;
        
        if (pin.length < 6) {
            const newPin = pin + num;
            setPin(newPin);
            
            // Check if this is the final digit
            if (newPin.length === 6) {
                setIsProcessing(true);
                // Simulate transaction processing
                setTimeout(() => {
                    setIsProcessing(false);
                    //clear the pin
                    setPin('');
                    router.push('/(tabs)/scan/success');
                }, 3000);
            }
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Enter your pin</Text>
            <Text style={styles.subtitle}>Enter your six digit transaction pin</Text>

            {/* PIN Indicator Dots */}
            <View style={styles.dotsContainer}>
                {[...Array(6)].map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            pin.length > index && styles.dotFilled
                        ]}
                    />
                ))}
            </View>

            {isProcessing && (
                <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#FF6B00" />
                    <Text style={styles.processingText}>Processing transaction...</Text>
                </View>
            )}

            {/* Numeric Keypad */}
            <View style={styles.keypadContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.key}
                        onPress={() => handleNumberPress(num.toString())}
                    >
                        <Text style={styles.keyText}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.key} />
                <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleNumberPress('0')}
                >
                    <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.key}
                    onPress={handleDelete}
                >
                    <Text style={styles.keyText}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 40,
        gap: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#eee',
    },
    dotFilled: {
        backgroundColor: '#FF6B00',
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
        gap: 20,
    },
    key: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        fontSize: 24,
        fontWeight: '500',
    },
    processingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    processingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
});

export default Pin;