import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SHADOWS } from '../utils/theme';
import { History, ChevronRight, ShieldCheck, MapPin } from 'lucide-react-native';

const HistoryScreen = ({ navigation }) => {
  const historyData = [
    { id: 'AGRI-992', crop: 'Alphonso Mango', farm: 'Ratna Exports', date: '24 Apr 2026', trust: '99%' },
    { id: 'AGRI-881', crop: 'Nagpur Oranges', farm: 'Priya Farms', date: '22 Apr 2026', trust: '98%' },
    { id: 'AGRI-776', crop: 'Basmati Rice', farm: 'Kisan Coop', date: '15 Apr 2026', trust: '100%' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <View style={styles.iconContainer}>
        <History size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cropName}>{item.crop}</Text>
        <Text style={styles.farmName}>{item.farm} • {item.date}</Text>
      </View>
      <View style={styles.endContainer}>
        <Text style={styles.trustText}>{item.trust}</Text>
        <ChevronRight size={20} color={COLORS.slate[400]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan History</Text>
        <Text style={styles.subtitle}>Verified provenance records.</Text>
      </View>
      <FlatList 
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingTop: 60, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.secondary },
  subtitle: { fontSize: 14, color: COLORS.slate[500], fontWeight: '600', marginTop: 4 },
  listContent: { padding: 24 },
  card: { 
    backgroundColor: COLORS.white, 
    borderRadius: 24, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
    ...SHADOWS.light 
  },
  iconContainer: { width: 50, height: 50, backgroundColor: COLORS.emerald[50], borderRadius: 16, alignItems: 'center', justifyCenter: 'center' },
  textContainer: { flex: 1, marginLeft: 16 },
  cropName: { fontSize: 16, fontWeight: '900', color: COLORS.secondary },
  farmName: { fontSize: 12, color: COLORS.slate[500], marginTop: 2, fontWeight: '600' },
  endContainer: { alignItems: 'flex-end', flexDirection: 'row', gap: 8 },
  trustText: { fontSize: 14, fontWeight: '900', color: COLORS.primary },
});

export default HistoryScreen;
