import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
interface ProfileScreenProps {
  visible: boolean;
  onClose: () => void;
}
const ProfileScreen: React.FC<ProfileScreenProps> = ({ visible, onClose }) => {
  const [hideSensitiveItems, setHideSensitiveItems] = useState(false);
  if (!visible) return null;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    {}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>
<ScrollView showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Your account</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneNumber}>9344903058</Text>
            <TouchableOpacity>
              <Text style={styles.chevron}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>
{}
        <TouchableOpacity style={styles.birthdayContainer}>
          <Text style={styles.birthdayText}>Add your birthday</Text>
          <View style={styles.birthdayRight}>
            <Text style={styles.enterDetails}>Enter details</Text>
            <Text style={styles.chevron}>▶</Text>
          </View>
        </TouchableOpacity>
{}
        <View style={styles.updateCard}>
          <View style={styles.updateIconContainer}>
            <Text style={styles.updateIcon}>📱</Text>
          </View>
          <View style={styles.updateContent}>
            <Text style={styles.updateTitle}>App update available</Text>
            <Text style={styles.updateDescription}>bug fixes and improvements</Text>
            <Text style={styles.updateVersion}>v17.79.0</Text>
          </View>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
 {}
        <View style={styles.moneySection}>
          <Text style={styles.sectionTitle}>Blinkit Money</Text>
          {}
          <View style={styles.sensitiveContainer}>
            <View style={styles.sensitiveLeft}>
              <Text style={styles.sensitiveTitle}>Hide sensitive items</Text>
              <Text style={styles.sensitiveDescription}>
                Sexual wellness, nicotine products and other sensitive items will be hidden
              </Text>
              <TouchableOpacity>
                <Text style={styles.knowMore}>Know more</Text>
              </TouchableOpacity>
            </View>
            <Switch
              value={hideSensitiveItems}
              onValueChange={setHideSensitiveItems}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
 {}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need help?</Text>
          <TouchableOpacity style={styles.lightButton}>
            <Text style={styles.lightButtonText}>LIGHT</Text>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>
        </View> {}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Your information</Text>
           <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Address book</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Bookmarked recipes</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Your wishlist</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>GST details</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>E-gift cards</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Your prescriptions</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
        </View>
{}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment and coupons</Text>
          
    <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Wallet</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Blinkit Money</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Payment settings</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Claim Gift card</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Your collected rewards</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
        </View>
        {}
        <View style={styles.feedingSection}>
          <Text style={styles.sectionTitle}>Feeding India</Text>
           <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Your impact</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Get Feeding India receipt</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
        </View>
{}
        <View style={styles.otherSection}>
          <Text style={styles.sectionTitle}>Other Information</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Share the app</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
 <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>About us</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Account privacy</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Notification preferences</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
 <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <Text style={[styles.menuItemText, styles.logoutText]}>Log out</Text>
            <Text style={styles.chevron}>▶</Text>
          </TouchableOpacity>
        </View>
{}
        <View style={styles.footer}>
          <Text style={styles.footerText}>blinkit</Text>
          <Text style={styles.versionText}>v17.75.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    fontSize: 28,
    color: '#333333',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 32,
  },
  accountSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  accountTitle: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '400',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  birthdayContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  birthdayText: {
    fontSize: 16,
    color: '#333333',
  },
  birthdayRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enterDetails: {
    fontSize: 14,
    color: '#999999',
    marginRight: 8,
  },
  chevron: {
    fontSize: 16,
    color: '#999999',
  },
  updateCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateIcon: {
    fontSize: 24,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  updateDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  updateVersion: {
    fontSize: 12,
    color: '#999999',
  },
  updateButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  updateButtonText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '600',
  },
  moneySection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,+
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  sensitiveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sensitiveLeft: {
    flex: 1,
    marginRight: 16,
  },
  sensitiveTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  sensitiveDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
  knowMore: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  lightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  lightButtonText: {
    fontSize: 14,
    color: '#333333',
    marginRight: 6,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  paymentSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  feedingSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  otherSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    fontSize: 15,
    color: '#333333',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 13,
    color: '#999999',
  },
});

export default ProfileScreen;