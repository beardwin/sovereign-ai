import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

interface ServerItem {
  id: string;
}

export default function ServerListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sovereign AI</Text>
        <Text style={styles.subtitle}>Self-hosted LLM Chat</Text>
      </View>
      <FlatList
        data={[] as ServerItem[]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No servers configured</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No servers configured</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 17,
    color: '#8E8E93',
  },
});
