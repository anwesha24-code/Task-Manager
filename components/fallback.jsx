import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
const Fallback = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
            <Image source={require('../assets/images/empty-list.webp')} style={{ height: 100, width: 100 }} />
            <Text style={styles.text }>
                Your task list is empty.Let’s get productive!
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#343A40',
        marginTop: 5,
        textAlign: 'center',
        width: '80%', // Optional: Add width to avoid text overflowing
    },
})
export default Fallback;
