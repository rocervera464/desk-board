import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>FocusFlow</Text>
        <Text style={styles.subtitle}>Tu espacio de productividad personal y académica.</Text>
        <Text style={styles.note}>Base del proyecto · Etapa 1</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FB' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  title: { fontSize: 36, fontWeight: '700', color: '#172554', textAlign: 'center' },
  subtitle: { fontSize: 18, lineHeight: 26, color: '#334155', textAlign: 'center', maxWidth: 480 },
  note: { fontSize: 14, color: '#475569', textAlign: 'center' },
});
