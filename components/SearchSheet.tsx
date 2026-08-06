import React, { useState, useRef, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  FlatList, 
  Image, 
  Animated 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchSheetProps {
  visible: boolean;
  onClose: () => void;
}

const SEARCH_DATABASE = [
  {
    carId: 'swift-2021',
    title: '2021 Maruti Swift',
    price: '₹6.45L',
    km: '15,000 km',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw',
  },
  {
    carId: 'creta-2020',
    title: '2020 Hyundai Creta',
    price: '₹12.8L',
    km: '32,000 km',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPcOUnkBx_4feZ37LbsoRkl36Pf-Jayac86JLpQ3e1-xxQLLwMdLVKfnMDeZLHsPn3FNWd8XFPQZXbCYuVQ7MhSXYw0HNTeJ6NX4On_A3xvMfVBZ1-TCfjph-qDdt_SIL8REGKvKMZxAPwRAfsVp5T53iXUS0O956NsdTdReBGhlOc0M7KAMXHwgYC1-EdqefiTTonj6ae-5bHUYuBh3ULD9GqoOTiVj5a5_wFn1TOIIAMSQ-yKeD9g',
  },
  {
    carId: 'city-2019',
    title: '2019 Honda City',
    price: '₹8.95L',
    km: '41,000 km',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw',
  }
];

const POPULAR_BRANDS = [
  { id: 'maruti', name: 'Maruti', logo: '🚗' },
  { id: 'hyundai', name: 'Hyundai', logo: '🚙' },
  { id: 'honda', name: 'Honda', logo: '🏎️' },
  { id: 'tata', name: 'Tata', logo: '🚕' },
];

const RECENT_SEARCHES = [
  'Swift under 6 Lakhs',
  'Hyundai Creta AT',
  'Automatic Hatchback',
];

export default function SearchSheet({ visible, onClose }: SearchSheetProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof SEARCH_DATABASE>([]);
  const inputRef = useRef<TextInput>(null);

  // Auto-focus input when sheet opens
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [visible]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    const filtered = SEARCH_DATABASE.filter(car => 
      car.title.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const selectSuggestedQuery = (text: string) => {
    handleSearch(text);
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={onClose} hitSlop={12}>
            <Feather name="arrow-left" size={22} color="#2D3E50" />
          </Pressable>
          <View style={styles.inputWrapper}>
            <Feather name="search" size={16} color="#8d716a" style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Search by brand, model, budget..."
              placeholderTextColor="#cbd5e1"
              value={query}
              onChangeText={handleSearch}
              autoCorrect={false}
            />
            {query.length > 0 && (
              <Pressable style={styles.clearBtn} onPress={() => handleSearch('')} hitSlop={8}>
                <Feather name="x" size={14} color="#8d716a" />
              </Pressable>
            )}
          </View>
        </View>

        {query.length === 0 ? (
          /* Initial View: Recent & Brands */
          <View style={styles.innerContent}>
            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.recentList}>
                {RECENT_SEARCHES.map((item, idx) => (
                  <Pressable 
                    key={idx} 
                    style={styles.recentItem}
                    onPress={() => selectSuggestedQuery(item)}
                  >
                    <Feather name="clock" size={12} color="#8d716a" style={{ marginRight: 6 }} />
                    <Text style={styles.recentText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Popular Brands */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Brands</Text>
              <View style={styles.brandsGrid}>
                {POPULAR_BRANDS.map(brand => (
                  <Pressable 
                    key={brand.id} 
                    style={styles.brandCard}
                    onPress={() => selectSuggestedQuery(brand.name)}
                  >
                    <View style={styles.brandLogoCircle}>
                      <Text style={styles.brandEmoji}>{brand.logo}</Text>
                    </View>
                    <Text style={styles.brandName}>{brand.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* Live Results View */
          <FlatList
            data={results}
            keyExtractor={item => item.carId}
            contentContainerStyle={styles.resultsList}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Feather name="info" size={24} color="#8d716a" />
                <Text style={styles.emptyText}>No cars matching "{query}" found.</Text>
                <Text style={styles.emptySub}>Try searching for "Swift", "Creta", or "City".</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <Pressable style={styles.carCard} onPress={onClose}>
                <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
                <View style={styles.carInfo}>
                  <Text style={styles.carTitle}>{item.title}</Text>
                  <Text style={styles.carPrice}>{item.price}</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                      <Feather name="shield" size={10} color="#00B67A" style={{ marginRight: 2 }} />
                      <Text style={styles.badgeText}>Certified</Text>
                    </View>
                    <Text style={styles.kmText}>{item.km || '15,000 km'}</Text>
                  </View>
                </View>
                <Feather name="arrow-right" size={14} color="#8d716a" style={styles.arrowIcon} />
              </Pressable>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    gap: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e1e2e4',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2D3E50',
    fontWeight: '600',
  },
  clearBtn: {
    padding: 4,
  },
  innerContent: {
    padding: 20,
    flexDirection: 'column',
    gap: 24,
  },
  section: {
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8d716a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentList: {
    flexDirection: 'column',
    gap: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3E50',
  },
  brandsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  brandCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#edeef0',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  brandLogoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 95, 60, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D3E50',
  },
  resultsList: {
    padding: 16,
    gap: 12,
  },
  carCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#edeef0',
    padding: 10,
    gap: 12,
    position: 'relative',
  },
  carImage: {
    width: 72,
    height: 48,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  carInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  carTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191c1e',
  },
  carPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3E50',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 182, 122, 0.08)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    color: '#00B67A',
    fontWeight: 'bold',
  },
  kmText: {
    fontSize: 10,
    color: '#8d716a',
  },
  arrowIcon: {
    position: 'absolute',
    right: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3E50',
    marginTop: 8,
  },
  emptySub: {
    fontSize: 12,
    color: '#8d716a',
  },
});
