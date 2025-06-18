import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type MyButtonProps = {
  title: string;
  onPress: () => void;
};

const MyButton: React.FC<MyButtonProps> = ({ title, onPress }) => {
    return (
        <View>
            <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.button}
            onPress={onPress}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    text: { 
        color: "white", 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    button: { 
        backgroundColor: "#1B3A7A", 
        paddingHorizontal: 30, 
        paddingVertical: 15, 
        borderRadius: 20 
    }
})
export default MyButton