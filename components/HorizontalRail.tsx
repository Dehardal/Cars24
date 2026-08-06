import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Animated } from 'react-native';
import { HorizontalRailProps, SduiAction, CarCardItem } from '../schema/types';
import { Ionicons, Feather } from '@expo/vector-icons';

interface HorizontalRailComponentProps {
  props: HorizontalRailProps;
  actions?: {
    onItemTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const CarCard = ({ 
  item, 
  actions, 
  onAction 
}: { 
  item: CarCardItem; 
  actions: any; 
  onAction: (action: SduiAction) => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const [isFavorited, setIsFavorited] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.5, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1.0, useNativeDriver: true, friction: 3 }),
    ]).start();
  };

  const handleItemPress = () => {
    if (actions?.onItemTap) {
      const action = actions.onItemTap;
      const params: Record<string, any> = {};
      if (action.type === 'navigate' && action.paramsFromItem) {
        action.paramsFromItem.forEach((key: string) => {
          params[key] = (item as any)[key];
        });
      }
      onAction({
        ...action,
        params: {
          ...(action.type === 'navigate' ? action.params : {}),
          ...params,
        },
      } as any);
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleItemPress}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          
          {/* Cars24 Certified Tag */}
          <View style={styles.tag}>
            <Feather name="shield" size={9} color="#00B67A" style={{ marginRight: 2 }} />
            <Text style={styles.tagText}>Certified</Text>
          </View>

          {/* Favorite Heart Button */}
          <Pressable 
            style={styles.favoriteBtn} 
            onPress={toggleFavorite}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons 
                name={isFavorited ? "heart" : "heart-outline"} 
                color={isFavorited ? "#EF5F3C" : "#ffffff"} 
                size={16} 
              />
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.carTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <Text style={styles.emiText}>EMI starts at ₹12,450/mo</Text>
          <View style={styles.kmRow}>
            <Feather name="map-pin" size={10} color="#8d716a" style={{ marginRight: 3 }} />
            <Text style={styles.kmText}>{item.km || 'Petrol'}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const HorizontalRail = React.memo(({ props, actions, onAction }: HorizontalRailComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.carId}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CarCard item={item} actions={actions} onAction={onAction} />
        )}
      />
    </View>
  );
});

export default HorizontalRail;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3E50',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#edeef0',
    elevation: 2,
    shadowColor: '#2D3E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  imageWrapper: {
    height: 110,
    position: 'relative',
    backgroundColor: '#f2f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#edeef0',
  },
  tagText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#00B67A',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(25, 28, 30, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  infoWrapper: {
    padding: 10,
    flexDirection: 'column',
    gap: 2,
  },
  carTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#191c1e',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3E50',
  },
  emiText: {
    fontSize: 10,
    color: '#8d716a',
    marginTop: 1,
  },
  kmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  kmText: {
    fontSize: 10,
    color: '#59413b',
    fontWeight: '500',
  },
});
