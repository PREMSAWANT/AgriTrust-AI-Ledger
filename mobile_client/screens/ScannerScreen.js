import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera'; // Simulation
import { Scan, X, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ScannerScreen = ({ onScan, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <X color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Batch QR</Text>
        <TouchableOpacity>
          <Zap color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        {/* In real app, use <Camera /> from expo-camera */}
        <View style={styles.cameraMock}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.hintText}>Align QR code within the frame</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.simulateBtn} 
          onPress={() => onScan('AGRI-12345')}
        >
          <Scan color="white" size={20} />
          <Text style={styles.simulateText}>Simulate Successful Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraMock: { width: '100%', height: '100%', backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: width * 0.7, height: width * 0.7, borderWidth: 0, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#10b981', borderWidth: 4 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  hintText: { color: 'white', marginTop: 40, opacity: 0.7 },
  footer: { padding: 40, paddingBottom: 60, alignItems: 'center' },
  simulateBtn: { backgroundColor: '#1e293b', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 10, borderWeight: 1, borderColor: '#334155' },
  simulateText: { color: 'white', fontWeight: 'bold' }
});

export default ScannerScreen;
