import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Success() {
    const router = useRouter();
    const { amount, recipient } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle-outline" size={80} color="#4CAF50" />
            </View>
            
            <Text style={styles.title}>Successful</Text>
            
            <Text style={styles.message}>
                You have sent N{amount} to {recipient} successfully.
            </Text>

            <Pressable 
                style={styles.button}
                onPress={() => router.navigate('/(tabs)/scan')}
            >
                <Text style={styles.buttonText}>Done</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 48,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});