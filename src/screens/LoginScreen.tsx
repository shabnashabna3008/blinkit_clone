import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigations/navigations';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const validatePassword = (text: string) => {
    setPassword(text);
    setPasswordErrors({
      length: text.length >= 8,
      uppercase: /[A-Z]/.test(text),
      lowercase: /[a-z]/.test(text),
      number: /[0-9]/.test(text),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(text),
    });
  };

  const showPasswordAlert = () => {
    const missingRequirements = [];
    if (!passwordErrors.length) missingRequirements.push('• At least 8 characters');
    if (!passwordErrors.uppercase) missingRequirements.push('• One uppercase letter (A-Z)');
    if (!passwordErrors.lowercase) missingRequirements.push('• One lowercase letter (a-z)');
    if (!passwordErrors.number) missingRequirements.push('• One number (0-9)');
    if (!passwordErrors.special) missingRequirements.push('• One special character (!@#$%^&*)');

    Alert.alert(
      '⚠️ Weak Password',
      `Your password must contain:\n\n${missingRequirements.join('\n')}`,
      [{ text: 'OK' }]
    );
  };

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const allConditionsMet = Object.values(passwordErrors).every(value => value === true);
    
    if (!allConditionsMet) {
      showPasswordAlert();
      return;
    }

    Alert.alert('Success', 'Login successful!');
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
      
      {/* Top Yellow Section with Floating Groceries */}
      <View style={styles.topSection}>
        <View style={styles.topSpacing} />
        
        {/* Floating Grocery Items */}
        <View style={styles.floatingItems}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1147/1147805.png' }} 
            style={[styles.floatingItem, styles.item1]} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' }} 
            style={[styles.floatingItem, styles.item2]} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1147/1147812.png' }} 
            style={[styles.floatingItem, styles.item3]} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2935/2935307.png' }} 
            style={[styles.floatingItem, styles.item4]} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1147/1147802.png' }} 
            style={[styles.floatingItem, styles.item5]} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2935/2935308.png' }} 
            style={[styles.floatingItem, styles.item6]} 
          />
        </View>

        {/* Shopping Cart Icon */}
        <View style={styles.cartIconContainer}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>10 min</Text>
          </View>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170627.png' }} 
            style={styles.cartIcon} 
          />
        </View>

        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>blinkit</Text>
          <Text style={styles.tagline}>Delivery in minutes</Text>
        </View>
      </View>

      {/* Bottom White Section with Form */}
      <View style={styles.bottomSection}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to continue shopping</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter phone number"
                  placeholderTextColor="#999999"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={validatePassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon 
                    name={showPassword ? 'visibility' : 'visibility-off'} 
                    size={20} 
                    color="#666666" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Live Password Requirements Display */}
            {password.length > 0 && (
              <View style={styles.passwordRequirements}>
                <Text style={styles.requirementsTitle}>Password requirements:</Text>
                <View style={styles.requirementItem}>
                  <Icon 
                    name={passwordErrors.length ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={passwordErrors.length ? '#4CAF50' : '#999999'} 
                  />
                  <Text style={[styles.requirementText, passwordErrors.length && styles.requirementMet]}>
                    At least 8 characters
                  </Text>
                </View>
                <View style={styles.requirementItem}>
                  <Icon 
                    name={passwordErrors.uppercase ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={passwordErrors.uppercase ? '#4CAF50' : '#999999'} 
                  />
                  <Text style={[styles.requirementText, passwordErrors.uppercase && styles.requirementMet]}>
                    One uppercase letter
                  </Text>
                </View>
                <View style={styles.requirementItem}>
                  <Icon 
                    name={passwordErrors.lowercase ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={passwordErrors.lowercase ? '#4CAF50' : '#999999'} 
                  />
                  <Text style={[styles.requirementText, passwordErrors.lowercase && styles.requirementMet]}>
                    One lowercase letter
                  </Text>
                </View>
                <View style={styles.requirementItem}>
                  <Icon 
                    name={passwordErrors.number ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={passwordErrors.number ? '#4CAF50' : '#999999'} 
                  />
                  <Text style={[styles.requirementText, passwordErrors.number && styles.requirementMet]}>
                    One number
                  </Text>
                </View>
                <View style={styles.requirementItem}>
                  <Icon 
                    name={passwordErrors.special ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={passwordErrors.special ? '#4CAF50' : '#999999'} 
                  />
                  <Text style={[styles.requirementText, passwordErrors.special && styles.requirementMet]}>
                    One special character (!@#$%^&*)
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>New to blinkit? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <Text style={styles.socialText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
                  style={styles.socialIcon} 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }} 
                  style={styles.socialIcon} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    height: height * 0.3,
    backgroundColor: '#FFD700',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  topSpacing: {
    height: 45,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  floatingItems: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingItem: {
    width: 50,
    height: 50,
    position: 'absolute',
    opacity: 0.3,
  },
  item1: {
    top: 20,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  item2: {
    top: 60,
    right: 30,
    transform: [{ rotate: '10deg' }],
    width: 60,
    height: 60,
  },
  item3: {
    bottom: 40,
    left: 50,
    transform: [{ rotate: '20deg' }],
    width: 45,
    height: 45,
  },
  item4: {
    top: 100,
    left: 100,
    transform: [{ rotate: '-5deg' }],
    width: 40,
    height: 40,
  },
  item5: {
    bottom: 60,
    right: 60,
    transform: [{ rotate: '30deg' }],
    width: 55,
    height: 55,
  },
  item6: {
    top: 30,
    right: 100,
    transform: [{ rotate: '-25deg' }],
    width: 35,
    height: 35,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    alignItems: 'center',
    zIndex: 20,
  },
  cartBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 5,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cartIcon: {
    width: 50,
    height: 50,
    tintColor: '#333333',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 12,
    backgroundColor: '#FFF9E6',
  },
  countryCode: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333333',
    borderRightWidth: 1,
    borderRightColor: '#FFD700',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF9E6',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  passwordRequirements: {
    marginTop: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 8,
  },
  requirementMet: {
    color: '#4CAF50',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666666',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  socialSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default LoginScreen;