import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
  Modal,
} from 'react-native';

// Import HomeScreen - FIXED PATH
import HomeScreen from './src/screens/home/HomeScreen';

// Import Profile Screen - FIXED PATH
import ProfileScreen from './src/screens/Profile/profilescreen';

const { width } = Dimensions.get('window');

// Types
interface Category {
  id: string;
  name: string;
  image: any;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  weight?: string;
  image: any;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  image: any;
}

const App = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    area: 'Kumananchavadi',
    city: 'Tamil Nadu',
    pincode: '600056'
  });

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted) {
          setLocationPermission(true);
          console.log('Location permission already granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      setLoading(true);
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow Location Access',
            message: 'Krazo Mart needs access to your location to show nearby stores and faster delivery options.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Don\'t Allow',
            buttonPositive: 'Allow',
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission(true);
          console.log('Location permission granted');
          Alert.alert(
            'Success', 
            'Location access granted! You will now see nearby stores and faster delivery options.',
            [{ text: 'OK' }]
          );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied');
          Alert.alert(
            'Permission Denied',
            'Location permission helps us show nearby stores and provide faster delivery. You can enable it in settings.',
            [
              { text: 'Not Now', style: 'cancel' },
              { text: 'Open Settings', onPress: openAppSettings }
            ]
          );
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Location permission never ask again');
          Alert.alert(
            'Permission Required',
            'You have permanently denied location permission. Please enable it in settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: openAppSettings }
            ]
          );
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const handleLocationPress = () => {
    if (locationPermission) {
      Alert.alert(
        'Location Options',
        'Choose an option:',
        [
          {
            text: 'Use Current Location',
            onPress: () => {
              Alert.alert('Info', 'Fetching your current location...');
            }
          },
          {
            text: 'Select from Map',
            onPress: () => Alert.alert('Info', 'Map selection coming soon!')
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );
    } else {
      Alert.alert(
        'Enable Location',
        'Allow location access to see nearby stores and get faster delivery.',
        [
          {
            text: 'Later',
            style: 'cancel'
          },
          {
            text: 'Enable',
            onPress: requestLocationPermission
          }
        ]
      );
    }
  };

  const categories: Category[] = [
    { id: '1', name: 'All', image: { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop' } },
    { id: '2', name: 'Fruits', image: { uri: 'https://images.unsplash.com/photo-1619566621402-0c7e6c6b3d7f?w=100&h=100&fit=crop' } },
    { id: '3', name: 'Vegetables', image: { uri: 'https://images.unsplash.com/photo-1597362925123-77861c2f6c6b?w=100&h=100&fit=crop' } },
    { id: '4', name: 'Dress', image: { uri: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&h=100&fit=crop' } },
    { id: '5', name: 'Beauty', image: { uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' } },
  ];

  const productsByCategory = [
    {
      id: '1',
      title: 'Fresh Fruits',
      products: [
        {
          id: '1',
          name: 'Fresh Apples 1kg',
          price: '₹120',
          weight: '1kg',
          image: require('./assets/apple.png'),
        },
        {
          id: '2',
          name: 'Organic Bananas 1kg',
          price: '₹60',
          weight: '1kg',
          discount: '10% OFF',
          image: require('./assets/banana.png'),
        },
        {
          id: '3',
          name: 'Fresh Oranges 1kg',
          price: '₹80',
          weight: '1kg',
          image: require('./assets/orange.png'),
        },
      ],
    },
    {
      id: '2',
      title: 'Fresh Vegetables',
      products: [
        {
          id: '4',
          name: 'Fresh Tomatoes 1kg',
          price: '₹40',
          weight: '1kg',
          image: require('./assets/tomato.png'),
        },
        {
          id: '5',
          name: 'Potatoes 1kg',
          price: '₹30',
          weight: '1kg',
          originalPrice: '₹35',
          image: require('./assets/potato.png'),
        },
        {
          id: '6',
          name: 'Fresh Onions 1kg',
          price: '₹45',
          weight: '1kg',
          image: require('./assets/onion.png'),
        },
      ],
    },
    {
      id: '3',
      title: 'Women\'s Dresses',
      products: [
        {
          id: '7',
          name: 'Floral Summer Dress',
          price: '₹899',
          weight: 'M',
          image: require('./assets/floral.png'),
        },
        {
          id: '8',
          name: 'Casual Cotton Kurti',
          price: '₹699',
          weight: 'L',
          discount: '15% OFF',
          image: require('./assets/kurti.png'),
        },
        {
          id: '9',
          name: 'Evening Gown',
          price: '₹1999',
          weight: 'XL',
          image: require('./assets/gown.png'),
        },
      ],
    },
    {
      id: '4',
      title: 'Beauty Products',
      products: [
        {
          id: '10',
          name: 'Face Cream SPF 30',
          price: '₹299',
          weight: '50g',
          image: require('./assets/sun.png'),
        },
        {
          id: '11',
          name: 'Matte Lipstick',
          price: '₹199',
          weight: 'Red',
          discount: '20% OFF',
          image: require('./assets/lipstick.png'),
        },
        {
          id: '12',
          name: 'Face Wash',
          price: '₹149',
          weight: '100ml',
          image: require('./assets/facewash.png'),
        },
      ],
    },
  ];

  const offers: Offer[] = [
    {
      id: '1',
      title: 'FLAT ₹50 OFF',
      description: 'On first order above ₹199',
      image: { uri: 'https://images.unsplash.com/photo-1607083206868-6c7a3c9752e9?w=300&h=150&fit=crop' }
    },
    {
      id: '2',
      title: 'FREE deals',
      description: 'On all your orders',
      image: { uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=150&fit=crop' }
    },
  ];

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        {item.weight && <Text style={styles.productWeight}>{item.weight}</Text>}
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOfferCard = ({ item }: { item: Offer }) => (
    <View style={styles.offerCard}>
      <ImageBackground
        source={item.image}
        style={styles.offerImage}
        imageStyle={styles.offerImageStyle}
      >
        <View style={styles.offerContent}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  const renderProductSection = ({ item }: { item: typeof productsByCategory[0] }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.products}
        renderItem={renderProductCard}
        keyExtractor={product => product.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
      
      {}
      <View style={styles.topSpacing} />
      
      {}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.locationContainer} 
          onPress={handleLocationPress}
          disabled={loading}
        >
          <View style={styles.locationWrapper}>
            <View>
              <Text style={styles.locationText}>{currentAddress.area}</Text>
              <Text style={styles.locationSubtext}>
                {currentAddress.city}, {currentAddress.pincode}
              </Text>
            </View>
            {locationPermission ? (
              <View style={styles.locationActiveDot} />
            ) : (
              <View style={styles.locationInactiveDot} />
            )}
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#333333" style={styles.locationLoader} />
          ) : (
            <Text style={styles.locationChevron}>▼</Text>
          )}
        </TouchableOpacity>
        <View style={styles.headerRight}>
          {}
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => setShowProfile(true)}
          >
            <Text style={styles.headerIconText}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🛒</Text>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      {}
      {!locationPermission && (
        <TouchableOpacity 
          style={styles.locationPrompt}
          onPress={requestLocationPermission}
        >
          <Text style={styles.locationPromptIcon}>📍</Text>
          <Text style={styles.locationPromptText}>
            Enable location for better delivery experience
          </Text>
          <Text style={styles.locationPromptAction}>Enable</Text>
        </TouchableOpacity>
      )}
      
      {}
      <View style={styles.deliveryContainer}>
        <View style={styles.deliveryItem}>
          <Text style={styles.emojiIcon}>⏱️</Text>
          <Text style={styles.deliveryText}>15 mins</Text>
        </View>
        <View style={styles.deliveryDivider} />
        <View style={styles.deliveryItem}>
          <Text style={styles.emojiIcon}>🚚</Text>
          <Text style={styles.deliveryText}>Free delivery</Text>
        </View>
        <View style={styles.deliveryDivider} />
        <View style={styles.deliveryItem}>
          <Text style={styles.emojiIcon}>⭐</Text>
          <Text style={styles.deliveryText}>Trusted</Text>
        </View>
      </View>
      
      {}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder='Search "fruits, vegetables, dresses..."'
          placeholderTextColor="#666666"
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}
        />

        {}
        <Image
          source={require('./assets/banners.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {}
        <FlatList
          data={productsByCategory}
          renderItem={renderProductSection}
          keyExtractor={section => section.id}
          scrollEnabled={false}
        />
        
        {}
        <View style={styles.offersSection}>
          <View style={styles.offersHeader}>
            <Text style={styles.offersSectionTitle}>OFFERS FOR YOU</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={offers}
            renderItem={renderOfferCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />
        </View>
        
        {}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=150&fit=crop' }}
          style={styles.bestsellerSection}
          imageStyle={styles.bestsellerImage}
        >
          <View style={styles.bestsellerOverlay}>
            <View style={styles.bestsellerContent}>
              <Text style={styles.bestsellerTitle}>Bestsellers</Text>
              <Text style={styles.bestsellerSubtitle}>
                Get Flat ₹50 OFF on items worth ₹199
              </Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        
        {}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Krazo Mart</Text>
        </View>
      </ScrollView>

      {}
      <Modal
        visible={showProfile}
        animationType="slide"
        onRequestClose={() => setShowProfile(false)}
      >
        <ProfileScreen 
          visible={showProfile} 
          onClose={() => setShowProfile(false)} 
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  topSpacing: {
    height: 40,
    backgroundColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFD700',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  locationSubtext: {
    color: '#333333',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  locationActiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  locationInactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4444',
    marginLeft: 8,
  },
  locationLoader: {
    marginLeft: 8,
  },
  locationChevron: {
    color: '#333333',
    fontSize: 12,
    marginLeft: 8,
    opacity: 0.8,
  },
  locationPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 8,
    marginBottom: 5,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  locationPromptIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  locationPromptText: {
    flex: 1,
    color: '#333333',
    fontSize: 13,
  },
  locationPromptAction: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 20,
    position: 'relative',
  },
  headerIconText: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#FFD700',
  },
  deliveryText: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '500',
  },
  emojiIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#FFD700',
  },
  searchInput: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  categoriesTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    color: '#333333',
    marginTop: 8,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  seeAllText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
  },
  productList: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: width * 0.42,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 6,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  productImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  productWeight: {
    color: '#666666',
    fontSize: 11,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  productPrice: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  originalPrice: {
    color: '#999999',
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4444',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offersSection: {
    marginBottom: 25,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  offersSectionTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  offersList: {
    paddingHorizontal: 10,
  },
  offerCard: {
    width: width * 0.7,
    height: 130,
    marginHorizontal: 6,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#FFF9E6',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerImageStyle: {
    borderRadius: 15,
    opacity: 0.3,
  },
  offerContent: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 15,
  },
  offerTitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  offerDescription: {
    color: '#333333',
    fontSize: 12,
    marginTop: 2,
  },
  bestsellerSection: {
    height: 180,
    marginHorizontal: 15,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  bestsellerImage: {
    borderRadius: 15,
    opacity: 0.3,
  },
  bestsellerOverlay: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    padding: 20,
  },
  bestsellerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bestsellerTitle: {
    color: '#333333',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bestsellerSubtitle: {
    color: '#333333',
    fontSize: 14,
    marginVertical: 8,
  },
  shopNowButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  shopNowText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FFD700',
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  footerText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;