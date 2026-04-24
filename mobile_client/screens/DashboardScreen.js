import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { COLORS, SHADOWS } from '../utils/theme';
import { 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  Award, 
  MapPin, 
  ChevronRight,
  Bell,
  Search
} from 'lucide-react-native'; // Use -native version if available, or just use Icons

const DashboardScreen = ({ route, navigation }) => {
  const { role = 'Farmer' } = route.params || {};

  const stats = [
    { label: 'Trust Score', value: '99.2%', icon: <Award size={20} color={COLORS.primary} /> },
    { label: 'Batches', value: '12', icon: <Package size={20} color="#3b82f6" /> },
    { label: 'Revenue', value: '₹4.2L', icon: <TrendingUp size={20} color="#8b5cf6" /> }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <View>
            <Text style={styles.welcome}>Namaste, Rajesh</Text>
            <Text style={styles.roleTag}>{role} Portal</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
             <Bell size={24} color={COLORS.slate[900]} />
             <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
               <View style={styles.statIcon}>{s.icon}</View>
               <Text style={styles.statLabel}>{s.label}</Text>
               <Text style={styles.statValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        {/* Main Action Card */}
        <TouchableOpacity style={styles.mainActionCard}>
           <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Register New Batch</Text>
              <Text style={styles.actionDesc}>Anchor your latest harvest to the ledger.</Text>
           </View>
           <View style={styles.actionIcon}>
              <ShieldCheck size={32} color={COLORS.white} />
           </View>
        </TouchableOpacity>

        {/* Recent History */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Activity</Text>
           <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        {[
          { id: 'BATCH-MH-102', crop: 'Alphonso Mango', loc: 'Ratnagiri', trust: '99%' },
          { id: 'BATCH-MH-105', crop: 'Nagpur Oranges', loc: 'Nagpur', trust: '98%' },
          { id: 'BATCH-MH-098', crop: 'Basmati Rice', loc: 'Punjab', trust: '100%' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.historyItem}>
             <View style={styles.historyIcon}>
                <Package size={24} color={COLORS.primary} />
             </View>
             <View style={styles.historyText}>
                <Text style={styles.historyId}>{item.id}</Text>
                <Text style={styles.historyCrop}>{item.crop} • {item.loc}</Text>
             </View>
             <View style={styles.historyEnd}>
                <Text style={styles.historyTrust}>{item.trust}</Text>
                <ChevronRight size={20} color={COLORS.slate[400]} />
             </View>
          </TouchableOpacity>
        ))}

        {/* Verification Hub */}
        <View style={styles.verifyBanner}>
           <View style={styles.verifyText}>
              <Text style={styles.verifyTitle}>Verify on Nodes</Text>
              <Text style={styles.verifyDesc}>Check real-time network hashrate and smart contract status.</Text>
           </View>
           <TouchableOpacity style={styles.verifyBtn}>
              <Text style={styles.verifyBtnText}>Open Hub</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: -0.5,
  },
  roleTag: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  notifBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  dot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: COLORS.red,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 24,
    ...SHADOWS.light,
  },
  statIcon: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.slate[400],
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  mainActionCard: {
    backgroundColor: COLORS.primary,
    padding: 32,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    ...SHADOWS.medium,
  },
  actionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  actionDesc: {
    color: COLORS.emerald[100],
    fontSize: 12,
    fontWeight: '600',
    maxWidth: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  historyItem: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.light,
  },
  historyIcon: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.emerald[50],
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  historyText: {
    flex: 1,
  },
  historyId: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  historyCrop: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.slate[500],
    marginTop: 2,
  },
  historyEnd: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  historyTrust: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
  },
  verifyBanner: {
    backgroundColor: COLORS.secondary,
    padding: 32,
    borderRadius: 32,
    marginTop: 24,
    marginBottom: 40,
  },
  verifyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  verifyDesc: {
    color: COLORS.slate[400],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
  verifyBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  verifyBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});

export default DashboardScreen;
