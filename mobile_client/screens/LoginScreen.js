import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react-native';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <ShieldCheck color="#10b981" size={40} />
          </View>
          <Text style={styles.title}>Welcome to AgriTrust</Text>
          <Text style={styles.subtitle}>Sign in to verify your ledger access</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={styles.inputGroup}>
              <Mail color="#64748b" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. john@farm.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>PASSWORD</Text>
              <TouchableOpacity><Text style={styles.forgotText}>Forgot?</Text></TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Lock color="#64748b" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => onLogin(email, password)}>
            <Text style={styles.buttonText}>Sign In</Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to the platform? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  inner: { flex: 1, padding: 30, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 25, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  title: { color: '#0f172a', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#64748b', fontSize: 16, marginTop: 5 },
  form: { gap: 20 },
  inputWrapper: { gap: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#475569', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  forgotText: { color: '#10b981', fontSize: 10, fontWeight: 'bold' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 16, paddingHorizontal: 15, borderWeight: 1, borderColor: '#e2e8f0' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#0f172a', height: 56, fontSize: 16 },
  button: { backgroundColor: '#10b981', height: 60, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#64748b' },
  signupText: { color: '#10b981', fontWeight: 'bold' }
});

export default LoginScreen;
