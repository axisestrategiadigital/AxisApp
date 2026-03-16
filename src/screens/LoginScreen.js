import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Adicionamos { navigation } aqui para o botão saber que pode mudar de tela
export default function LoginScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe', '#6a11cb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          
          <View style={styles.headerContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="share-social" size={40} color="#FFF" />
            </View>
            <Text style={styles.appName}>Praxis</Text>
            <Text style={styles.appTagline}>social media</Text>
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.greetingText}>Bem-vindo!</Text>
            
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Seu e-mail profissional" 
                  placeholderTextColor="#999"
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Sua senha secreta" 
                  placeholderTextColor="#999" 
                  secureTextEntry 
                />
              </View>
            </View>

            {/* BOTÃO CORRIGIDO AQUI EMBAIXO */}
            <TouchableOpacity 
              style={styles.buttonLoginContainer}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <LinearGradient
                colors={['#6a11cb', '#2575fc']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonLoginGradient}
              >
                <Text style={styles.buttonText}>Acessar Painel</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" style={{marginLeft: 10}} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>ou conecte com</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, {borderColor: '#DB4437'}]}><Ionicons name="logo-google" size={22} color="#DB4437" /></TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, {borderColor: '#4267B2'}]}><Ionicons name="logo-facebook" size={22} color="#4267B2" /></TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, {borderColor: '#E1306C'}]}><Ionicons name="logo-instagram" size={22} color="#E1306C" /></TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, {borderColor: '#000'}]}><Ionicons name="logo-tiktok" size={22} color="#000" /></TouchableOpacity>
            </View>
          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    maxWidth: isWeb ? 450 : '100%', 
    alignSelf: 'center',
    width: '100%'
  },
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  logoCircle: { 
    width: 80, height: 80, borderRadius: 40, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  appName: { fontSize: 42, fontWeight: 'bold', color: '#FFF', letterSpacing: 1 },
  appTagline: { fontSize: 16, color: '#FFF', opacity: 0.8, marginTop: -5, textTransform: 'uppercase', letterSpacing: 2 },
  loginCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    width: '100%', 
    borderRadius: 24, 
    padding: 30,
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 15,
  },
  greetingText: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 25, textAlign: 'center' },
  inputGroup: { marginBottom: 20 },
  inputWrapper: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#F0F2F5', borderRadius: 12, 
    marginBottom: 15, paddingHorizontal: 15,
    borderWidth: 1, borderColor: '#E0E0E0'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  buttonLoginContainer: { width: '100%', marginTop: 10, borderRadius: 12, overflow: 'hidden' },
  buttonLoginGradient: { flexDirection: 'row', padding: 18, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  forgotPassword: { textAlign: 'center', color: '#6a11cb', marginTop: 15, fontSize: 14, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 10, color: '#999', fontSize: 13 },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  socialButton: { 
    backgroundColor: '#FFF', width: isWeb ? 60 : (width - 120) / 4, height: 55, 
    borderRadius: 12, justifyContent: 'center', alignItems: 'center', 
    borderWidth: 1, borderColor: '#EEE',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
});