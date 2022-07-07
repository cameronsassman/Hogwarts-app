import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

function IconButton({ icon, text, onPress }) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Image style={styles.img} source={icon} />
            </View>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.75
    },
    textBtn: {
        color: '#d9f5ff',
        fontWeight: 'bold'
    },
    img: {
        width: 44,
        height: 40,
    }
})