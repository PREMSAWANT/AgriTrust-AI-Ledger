import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ShieldCheck, MapPin, Calendar, Thermometer, Droplets, ChevronLeft, Info } from 'lucide-react-native';

const ProductDetailsScreen = ({ product, onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Batch Details</Text>
        <TouchableOpacity style={styles.infoBtn}>
          <Info color="#10b981" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Verification Status */}
        <View style={styles.statusCard}>
          <View style={styles.checkCircle}>
            <ShieldCheck color="white" size={32} />
          </View>
          <Text style={styles.statusTitle}>Authenticity Verified</Text>
          <Text style={styles.statusSubtitle}>Secured on Ethereum Blockchain</Text>
        </View>

        {/* Product Info */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>PRODUCT</Text>
              <Text style={styles.value}>{product.name}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={[styles.label, { textAlign: 'right' }]}>TRUST SCORE</Text>
              <Text style={styles.scoreValue}>{product.trustScore}%</Text>
            </View>
          </View>
        </View>

        {/* Journey Timeline */}
        <Text style={styles.sectionTitle}>Provenance Journey</Text>
        <View style={styles.timeline}>
          {[
            { status: 'Delivered', loc: 'Central Market', date: '2026-04-23', temp: 4 },
            { status: 'In-Transit', loc: 'Logistics Hub B', date: '2026-04-22', temp: 5 },
            { status: 'Harvested', loc: 'Green Valley Farms', date: '2026-04-20', temp: 18 },
          ].map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLine}>
                <View style={[styles.dot, i === 0 && styles.activeDot]} />
                {i < 2 && <View style={styles.line} />}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.row}>
                  <Text style={styles.itemStatus}>{item.status}</Text>
                  <View style={styles.badge}>
                    <Thermometer color="#60a5fa" size={10} />
                    <Text style={styles.badgeText}>{item.temp}°C</Text>
                  </View>
                </View>
                <Text style={styles.itemLoc}>{item.loc}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Technical Metadata */}
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>BLOCKCHAIN TRANSACTION</Text>
          <Text style={styles.metaValue} numberOfLines={1}>0x742d35Cc6634C0532925a3b844Bc454e4438f44e</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.reportBtn}>
        <Text style={styles.reportBtnText}>Report Issue with Batch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backBtn: { padding: 10, backgroundColor: '#1e293b', borderRadius: 12 },
  infoBtn: { padding: 10 },
  content: { padding: 20 },
  statusCard: { backgroundColor: '#1e293b', padding: 30, borderRadius: 25, alignItems: 'center', marginBottom: 30, borderBottomWidth: 4, borderBottomColor: '#10b981' },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  statusTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  statusSubtitle: { color: '#10b981', fontWeight: '500', marginTop: 5 },
  section: { marginBottom: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#64748b', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  value: { color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  scoreValue: { color: '#10b981', fontSize: 32, fontWeight: '900' },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  timeline: { paddingLeft: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 25 },
  timelineLine: { alignItems: 'center', marginRight: 20 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#334155' },
  activeDot: { backgroundColor: '#10b981', transform: [{ scale: 1.2 }] },
  line: { width: 2, flex: 1, backgroundColor: '#1e293b', marginVertical: 5 },
  timelineContent: { flex: 1 },
  itemStatus: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  itemLoc: { color: '#94a3b8', fontSize: 14, marginTop: 2 },
  itemDate: { color: '#64748b', fontSize: 12, marginTop: 5 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#1e293b', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#60a5fa', fontSize: 10, fontWeight: 'bold' },
  metaCard: { backgroundColor: '#111827', padding: 20, borderRadius: 15, marginTop: 10 },
  metaLabel: { color: '#475569', fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  metaValue: { color: '#94a3b8', fontSize: 11, fontRegular: 'monospace' },
  reportBtn: { margin: 20, height: 60, borderRadius: 15, borderWidth: 1, borderColor: '#ef4444', justifyContent: 'center', alignItems: 'center' },
  reportBtnText: { color: '#ef4444', fontWeight: 'bold' }
});

export default ProductDetailsScreen;
