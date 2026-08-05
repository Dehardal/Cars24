import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { HorizontalRailProps, SduiAction, CarCardItem } from '../schema/types';

interface HorizontalRailComponentProps {
  props: HorizontalRailProps;
  actions?: {
    onItemTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const HorizontalRail = React.memo(({ props, actions, onAction }: HorizontalRailComponentProps) => {
  const handleItemPress = (item: CarCardItem) => {
    if (actions?.onItemTap) {
      const action = actions.onItemTap;
      const params: Record<string, any> = {};
      if (action.type === 'navigate' && action.paramsFromItem) {
        action.paramsFromItem.forEach(key => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.carId}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        getItemLayout={(_, index) => ({
          length: 180,
          offset: (180 + 12) * index,
          index,
        })}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handleItemPress(item)}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.km || 'Petrol'}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.carTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
              <Text style={styles.emiText}>EMI starts at ₹12,450/mo</Text>
            </View>
          </Pressable>
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
    backgroundColor: '#f8f9fb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#2D3E50',
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
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3E50',
  },
  emiText: {
    fontSize: 10,
    color: '#59413b',
  },
});
