import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Confirm() {
    const { amount, scannedData } = useLocalSearchParams();
    console.log("scannedData", scannedData);    
    const router = useRouter();
    const url = new URL(scannedData as string);
    const accountNumber = url.searchParams.get('accountNumber');
    const accountName = url.searchParams.get('accountName')?.replace(/\+/g, ' ');
    console.log("accountNumber", accountNumber, accountName);
   


    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Confirm transaction</Text>
                    <Pressable
                        onPress={() => router.navigate('/(tabs)/scan')}
                    >
                        <Ionicons name="close" size={24} color="black" />
                    </Pressable>
                </View>
                <Text style={styles.amount}>₦{amount}</Text>
                <View style={styles.line} />

                <View style={styles.amountCard}>
                    <Image 
                        source={require('../../../assets/user-transaction.png')}
                        style={styles.logo}
                    />
                    <View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 3}}>{accountName}</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#CDCED1'}}>{accountNumber}</Text>
                    </View>
                </View>

              

                <Pressable 
                    style={styles.sendButton}
                    onPress={() => router.navigate({
                        pathname: '/(tabs)/scan/pin',
                        params: {
                            amount,
                            accountName,
                            accountNumber
                        }
                    })}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: '#CDCED1',
        marginVertical: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        height: '60%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
    },
    closeButton: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        height: 30,
        width: 30,
        borderRadius: 360,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    amountCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
        gap: 10,
        
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'black',
    },
    amount: {
        color: 'black',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
     
        
    },
    detailsCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 16,
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
    },
    subtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
    },
    sendButton: {
        backgroundColor: '#FF4500',
        borderRadius: 15,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});