import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Confirm() {
    const { amount, recipientAddress } = useLocalSearchParams();
    return (
        <View>
           <Text>Confirm</Text>
            <Text>{amount}</Text>
            <Text>{recipientAddress}</Text>

        </View>
    );
}