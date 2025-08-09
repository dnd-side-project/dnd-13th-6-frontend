import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.runningButton}
        onPress={() => router.push('/(tabs)/(single-running)')}
      >
        <Text style={styles.runningButtonText}>달리기 시작하기</Text>
      </Pressable>
      <Pressable
        style={styles.runningButton}
        onPress={() => router.push('/(tabs)/(single-running)')}
      >
        <Text style={styles.runningButtonText}>달리기 시작하기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
  runningButton: {
    backgroundColor: 'gray',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  runningButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
