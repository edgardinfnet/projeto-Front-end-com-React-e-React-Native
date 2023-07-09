import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: '60%',
  },
});

export function LoadingSimple() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size='large' color='##00cec9' />
    </View>
  );
}
