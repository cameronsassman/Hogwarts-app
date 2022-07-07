import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/styles';

function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary500,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%'
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.primary100,
  },
});