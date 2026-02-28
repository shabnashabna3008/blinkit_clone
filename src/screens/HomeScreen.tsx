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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { RootStackParamList } from '../navigations/navigations';

const { width, height } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Category {
  id: string;
  name: string;
  image: any;
  imageUrl: string; // Added for realistic images
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

interface Location {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'other';
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // Location states
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    area: 'Kumananchavadi',
    city: 'Chennai',
    pincode: '600056'
  });
  const [locations] = useState<Location[]>([
    { id: '1', name: 'Home', address: '123 Main Street, Kumananchavadi, Chennai - 600056', type: 'home' },
    { id: '2', name: 'Work', address: '456 Business Park, Anna Nagar, Chennai - 600040', type: 'work' },
    { id: '3', name: 'Gym', address: '789 Fitness Road, Kumananchavadi, Chennai - 600056', type: 'other' },
    { id: '4', name: 'Parents Home', address: '321 Old Town, T Nagar, Chennai - 600017', type: 'other' },
  ]);

  // Navigate to Profile
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // Location handlers
  const handleLocationPress = () => {
    setLocationModalVisible(true);
  };

  const handleUseCurrentLocation = () => {
    setLocationModalVisible(false);
    Alert.alert(
      'Fetching Location',
      'Getting your current location...',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedLocation({
              area: 'Current Location',
              city: 'Chennai',
              pincode: '600056'
            });
            Alert.alert('Success', 'Location updated successfully!');
          }
        }
      ]
    );
  };

  const handleSelectFromMap = () => {
    setLocationModalVisible(false);
    Alert.alert(
      'Map Selection',
      'Opening map to select location...',
      [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              setSelectedLocation({
                area: 'Selected from Map',
                city: 'Chennai',
                pincode: '600056'
              });
              Alert.alert('Success', 'Location selected from map!');
            }, 1500);
          }
        }
      ]
    );
  };

  const handleLocationSelect = (location: Location) => {
    const addressParts = location.address.split(',');
    setSelectedLocation({
      area: addressParts[0].trim(),
      city: addressParts[1]?.trim() || 'Chennai',
      pincode: addressParts[2]?.split('-')[1]?.trim() || '600056'
    });
    setLocationModalVisible(false);
  };

  // Realistic category images from Unsplash
  const categories: Category[] = [
    { 
      id: '1', 
      name: 'All', 
      image: { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop'
    },
    { 
      id: '2', 
      name: 'Fruits', 
      image: { uri: 'https://images.unsplash.com/photo-1619566621402-0c7e6c6b3d7f?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1619566621402-0c7e6c6b3d7f?w=200&h=200&fit=crop'
    },
    { 
      id: '3', 
      name: 'Vegetables', 
      image: { uri: 'https://images.unsplash.com/photo-1597362925123-77861c2f6c6b?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861c2f6c6b?w=200&h=200&fit=crop'
    },
    { 
      id: '4', 
      name: 'Dairy', 
      image: { uri: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop'
    },
    { 
      id: '5', 
      name: 'Meat', 
      image: { uri: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop'
    },
    { 
      id: '6', 
      name: 'Bakery', 
      image: { uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop'
    },
    { 
      id: '7', 
      name: 'Beverages', 
      image: { uri: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop'
    },
    { 
      id: '8', 
      name: 'Snacks', 
      image: { uri: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop' },
      imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop'
    },
  ];

  const productsByCategory = [
    {
      id: '1',
      title: 'Fresh Fruits',
      products: [
        { id: '1', name: 'Fresh Apples', price: '₹120', weight: '1kg', image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop' } },
        { id: '2', name: 'Organic Bananas', price: '₹60', weight: '1kg', discount: '10% OFF', image: { uri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' } },
        { id: '3', name: 'Fresh Oranges', price: '₹80', weight: '1kg', image: { uri: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop' } },
      ],
    },
    {
      id: '2',
      title: 'Fresh Vegetables',
      products: [
        { id: '4', name: 'Fresh Tomatoes', price: '₹40', weight: '1kg', image: { uri: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop' } },
        { id: '5', name: 'Potatoes', price: '₹30', weight: '1kg', originalPrice: '₹35', image: { uri: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop' } },
        { id: '6', name: 'Fresh Onions', price: '₹45', weight: '1kg', image: { uri: 'https://images.unsplash.com/photo-1508747703729-005c2f2f0b0f?w=200&h=200&fit=crop' } },
      ],
    },
    {
      id: '3',
      title: 'Dairy Products',
      products: [
        { id: '7', name: 'Fresh Milk', price: '₹60', weight: '1L', image: { uri: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' } },
        { id: '8', name: 'Greek Yogurt', price: '₹80', weight: '400g', discount: '5% OFF', image: { uri: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop' } },
        { id: '9', name: 'Cheddar Cheese', price: '₹150', weight: '200g', image: { uri: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' } },
      ],
    },
    {
      id: '4',
      title: 'Bakery Items',
      products: [
        { id: '10', name: 'Whole Wheat Bread', price: '₹40', weight: '400g', image: { uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' } },
        { id: '11', name: 'Chocolate Croissant', price: '₹60', weight: '1pc', discount: '10% OFF', image: { uri: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=200&h=200&fit=crop' } },
        { id: '12', name: 'Bagels (4 pcs)', price: '₹90', weight: '4pcs', image: { uri: 'https://images.unsplash.com/photo-1585478259715-4e42a38d1d41?w=200&h=200&fit=crop' } },
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
    {
      id: '3',
      title: '20% OFF',
      description: 'On dairy products',
      image: { uri: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=150&fit=crop' }
    },
  ];

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryImageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.categoryImage} 
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
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
      
      {/* Top Spacing Above Location - Increased height for better spacing */}
      <View style={styles.topSpacing} />

      {/* Header with Location Selector */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationSelector}
          onPress={handleLocationPress}
        >
          <Icon name="location-on" size={20} color="#333333" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Deliver to</Text>
            <Text style={styles.locationValue}>
              {selectedLocation.area}, {selectedLocation.city}
            </Text>
          </View>
          <Icon name="arrow-drop-down" size={24} color="#333333" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={handleProfilePress}
          >
            <FontAwesome name="user-circle" size={24} color="#333333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={24} color="#333333" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryContainer}>
        <View style={styles.deliveryItem}>
          <Ionicons name="time-outline" size={18} color="#FFD700" />
          <Text style={styles.deliveryText}>15 mins</Text>
        </View>
        <View style={styles.deliveryDivider} />
        <View style={styles.deliveryItem}>
          <Ionicons name="bicycle-outline" size={18} color="#FFD700" />
          <Text style={styles.deliveryText}>Free delivery</Text>
        </View>
        <View style={styles.deliveryDivider} />
        <View style={styles.deliveryItem}>
          <Ionicons name="star-outline" size={18} color="#FFD700" />
          <Text style={styles.deliveryText}>Trusted</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#FFD700" />
        <TextInput
          style={styles.searchInput}
          placeholder='Search "fruits, vegetables, bakery..."'
          placeholderTextColor="#666666"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Categories */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}
        />

        {/* Products */}
        <FlatList
          data={productsByCategory}
          renderItem={renderProductSection}
          keyExtractor={section => section.id}
          scrollEnabled={false}
        />

        {/* Offers */}
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

        {/* Bestseller Banner */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=150&fit=crop' }}
          style={styles.bestsellerSection}
          imageStyle={styles.bestsellerImage}
        >
          <View style={styles.bestsellerOverlay}>
            <View style={styles.bestsellerContent}>
              <Text style={styles.bestsellerTitle}>Bestsellers</Text>
              <Text style={styles.bestsellerSubtitle}>Get Flat ₹50 OFF on items worth ₹199</Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>blinkit</Text>
        </View>
      </ScrollView>

      {/* Location Selection Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Delivery Location</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Icon name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            {/* Location Options */}
            <TouchableOpacity 
              style={styles.locationOption}
              onPress={handleUseCurrentLocation}
            >
              <View style={styles.locationIconContainer}>
                <Icon name="my-location" size={24} color="#FFD700" />
              </View>
              <View style={styles.locationOptionText}>
                <Text style={styles.locationOptionTitle}>Use Current Location</Text>
                <Text style={styles.locationOptionSubtitle}>Automatically detect your location</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.locationOption}
              onPress={handleSelectFromMap}
            >
              <View style={styles.locationIconContainer}>
                <Icon name="map" size={24} color="#FFD700" />
              </View>
              <View style={styles.locationOptionText}>
                <Text style={styles.locationOptionTitle}>Select from Map</Text>
                <Text style={styles.locationOptionSubtitle}>Pick your exact location on map</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#666666" />
            </TouchableOpacity>

            <View style={styles.savedLocationsHeader}>
              <Text style={styles.savedLocationsTitle}>Saved Locations</Text>
            </View>

            <FlatList
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.locationOption}
                  onPress={() => handleLocationSelect(item)}
                >
                  <View style={styles.locationIconContainer}>
                    <Icon 
                      name={item.type === 'home' ? 'home' : item.type === 'work' ? 'work' : 'place'} 
                      size={24} 
                      color="#FFD700" 
                    />
                  </View>
                  <View style={styles.locationOptionText}>
                    <Text style={styles.locationOptionTitle}>{item.name}</Text>
                    <Text style={styles.locationOptionSubtitle}>{item.address}</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color="#666666" />
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF9E6' 
  },
  // Top spacing - Increased height for better spacing above location
  topSpacing: { 
    height: 45, // Increased from 40 to 45 for better spacing
    backgroundColor: '#FFD700' 
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
  locationSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  locationLabel: {
    fontSize: 10,
    color: '#666666',
  },
  locationValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  headerRight: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  headerIcon: { 
    marginLeft: 15, 
    position: 'relative' 
  },
  cartBadge: {
    position: 'absolute', 
    top: -8, 
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
    fontWeight: 'bold' 
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
    gap: 4 
  },
  deliveryDivider: { 
    width: 1, 
    height: 20, 
    backgroundColor: '#FFD700' 
  },
  deliveryText: { 
    color: '#333333', 
    fontSize: 13, 
    fontWeight: '500' 
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
  searchInput: { 
    flex: 1, 
    color: '#333333', 
    fontSize: 15, 
    padding: 0, 
    marginLeft: 8 
  },
  scrollView: { 
    flex: 1 
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
    fontWeight: 'bold' 
  },
  viewAllText: { 
    color: '#FFD700', 
    fontSize: 12, 
    fontWeight: '500', 
    textDecorationLine: 'underline' 
  },
  categoriesList: { 
    marginBottom: 20 
  },
  categoriesContent: { 
    paddingHorizontal: 10 
  },
  categoryItem: { 
    alignItems: 'center', 
    marginHorizontal: 8, 
    width: 70 
  },
  categoryImageContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFD700',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryText: { 
    color: '#333333', 
    marginTop: 8, 
    fontSize: 11, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  sectionContainer: { 
    marginBottom: 25 
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
    fontWeight: 'bold' 
  },
  seeAllButton: { 
    backgroundColor: '#FFD700', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 15 
  },
  seeAllText: { 
    color: '#333333', 
    fontSize: 12, 
    fontWeight: '500' 
  },
  productList: { 
    paddingHorizontal: 10 
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
    marginBottom: 8 
  },
  productInfo: { 
    marginBottom: 8 
  },
  productName: { 
    color: '#333333', 
    fontSize: 13, 
    fontWeight: '500', 
    marginBottom: 2 
  },
  productWeight: { 
    color: '#666666', 
    fontSize: 11, 
    marginBottom: 4 
  },
  priceContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5 
  },
  productPrice: { 
    color: '#333333', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  originalPrice: { 
    color: '#999999', 
    fontSize: 11, 
    textDecorationLine: 'line-through' 
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
  },
  discountText: { 
    color: '#FFFFFF', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  addButton: { 
    backgroundColor: '#FFD700', 
    borderRadius: 15, 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    alignSelf: 'flex-end' 
  },
  addButtonText: { 
    color: '#333333', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  offersSection: { 
    marginBottom: 25 
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
    fontWeight: 'bold' 
  },
  offersList: { 
    paddingHorizontal: 10 
  },
  offerCard: {
    width: width * 0.7, 
    height: 130, 
    marginHorizontal: 6, 
    borderRadius: 15,
    overflow: 'hidden', 
    borderWidth: 2, 
    borderColor: '#FFD700', 
    backgroundColor: '#FFF9E6',
  },
  offerImage: { 
    width: '100%', 
    height: '100%' 
  },
  offerImageStyle: { 
    borderRadius: 15, 
    opacity: 0.3 
  },
  offerContent: { 
    flex: 1, 
    backgroundColor: '#FFF9E6', 
    padding: 15, 
    justifyContent: 'center', 
    borderRadius: 15 
  },
  offerTitle: { 
    color: '#333333', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  offerDescription: { 
    color: '#333333', 
    fontSize: 12, 
    marginTop: 2 
  },
  bestsellerSection: {
    height: 180, 
    marginHorizontal: 15, 
    marginBottom: 25, 
    borderRadius: 15,
    overflow: 'hidden', 
    borderWidth: 2, 
    borderColor: '#FFD700',
  },
  bestsellerImage: { 
    borderRadius: 15, 
    opacity: 0.3 
  },
  bestsellerOverlay: { 
    flex: 1, 
    backgroundColor: '#FFF9E6', 
    padding: 20 
  },
  bestsellerContent: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  bestsellerTitle: { 
    color: '#333333', 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  bestsellerSubtitle: { 
    color: '#333333', 
    fontSize: 14, 
    marginVertical: 8 
  },
  shopNowButton: {
    backgroundColor: '#FFD700', 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 25, 
    alignSelf: 'flex-start', 
    marginTop: 5,
  },
  shopNowText: { 
    color: '#333333', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  footer: {
    alignItems: 'center', 
    padding: 25, 
    backgroundColor: '#FFD700',
    marginTop: 10, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  footerText: { 
    color: '#333333', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationOptionText: {
    flex: 1,
  },
  locationOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  locationOptionSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  savedLocationsHeader: {
    marginTop: 15,
    marginBottom: 10,
  },
  savedLocationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});

export default HomeScreen;