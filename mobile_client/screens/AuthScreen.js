import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { COLORS, SHADOWS } from '../utils/theme';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmId, setFarmId] = useState('');
  const [role, setRole] = useState('Farmer');

  const handleAuth = () => {
    setLoading(true);
    // Simulation
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard', { role });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>AgriTrust</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back to the ledger.' : 'Join the trusted network.'}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              onPress={() => setIsLogin(true)}
              style={[styles.toggleBtn, isLogin && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsLogin(false)}
              style={[styles.toggleBtn, !isLogin && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Register</Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <>
              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Rajesh Kumar"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input} 
                placeholder="+91 98765 43210"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <Text style={styles.label}>Farm ID / GSTIN</Text>
              <TextInput 
                style={styles.input} 
                placeholder="GST27ABCDE1234"
                value={farmId}
                onChangeText={setFarmId}
              />
            </>
          )}

          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="farmer@agritrust.in"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.mainBtn}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.mainBtnText}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          © 2026 AgriTrust AI-Ledger • Made in India
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: -1,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.slate[500],
    fontWeight: '600',
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 24,
    ...SHADOWS.light,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    padding: 6,
    borderRadius: 20,
    marginBottom: 32,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.slate[400],
  },
  toggleTextActive: {
    color: COLORS.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.slate[400],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  mainBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    ...SHADOWS.medium,
  },
  mainBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.slate[400],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default AuthScreen;
