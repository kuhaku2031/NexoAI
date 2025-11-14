// components/FilterBottomSheet.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useImperativeHandle, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export interface FilterOptions {
  stockStatus?: ('all' | 'in-stock' | 'low-stock' | 'out-of-stock')[];
  categories?: string[];
  priceRange?: { min: number; max: number };
  sortBy?: 'name' | 'price' | 'stock' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

interface FilterBottomSheetProps {
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export interface FilterBottomSheetRef {
  open: () => void;
  close: () => void;
}

export const FilterBottomSheet = forwardRef<FilterBottomSheetRef, FilterBottomSheetProps>(
  ({ onApplyFilters, initialFilters = {} }, ref) => {
    const [visible, setVisible] = useState(false);
    const [translateY] = useState(new Animated.Value(SCREEN_HEIGHT));
    
    // Estados de filtros
    const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>(
      initialFilters.stockStatus || []
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
      initialFilters.categories || []
    );
    const [priceMin, setPriceMin] = useState<string>(
      initialFilters.priceRange?.min?.toString() || ''
    );
    const [priceMax, setPriceMax] = useState<string>(
      initialFilters.priceRange?.max?.toString() || ''
    );
    const [sortBy, setSortBy] = useState<string>(initialFilters.sortBy || 'name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
      initialFilters.sortOrder || 'asc'
    );

    // Categorías disponibles (esto vendría de tu API)
    const categories = [
      { id: 'electronics', label: 'Electronics', icon: 'phone-portrait-outline' },
      { id: 'clothing', label: 'Clothing', icon: 'shirt-outline' },
      { id: 'food', label: 'Food & Beverages', icon: 'fast-food-outline' },
      { id: 'home', label: 'Home & Garden', icon: 'home-outline' },
      { id: 'sports', label: 'Sports', icon: 'basketball-outline' },
      { id: 'beauty', label: 'Beauty', icon: 'color-palette-outline' },
    ];

    const stockOptions = [
      { id: 'all', label: 'All Products', color: Colors.primary },
      { id: 'in-stock', label: 'In Stock', color: Colors.success },
      { id: 'low-stock', label: 'Low Stock', color: Colors.warning },
      { id: 'out-of-stock', label: 'Out of Stock', color: Colors.error },
    ];

    const sortOptions = [
      { id: 'name', label: 'Name' },
      { id: 'price', label: 'Price' },
      { id: 'stock', label: 'Stock' },
      { id: 'newest', label: 'Newest' },
    ];

    // Pan responder para cerrar al arrastrar hacia abajo
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          close();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    });

    const open = () => {
      setVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
      }).start();
    };

    const close = () => {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const toggleStockStatus = (id: string) => {
      setSelectedStockStatus(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    };

    const toggleCategory = (id: string) => {
      setSelectedCategories(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    };

    const handleApply = () => {
      const filters: FilterOptions = {
        stockStatus: selectedStockStatus.length > 0 
          ? selectedStockStatus as any 
          : undefined,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        priceRange:
          priceMin || priceMax
            ? {
                min: parseFloat(priceMin) || 0,
                max: parseFloat(priceMax) || Infinity,
              }
            : undefined,
        sortBy: sortBy as any,
        sortOrder,
      };
      onApplyFilters(filters);
      close();
    };

    const handleReset = () => {
      setSelectedStockStatus([]);
      setSelectedCategories([]);
      setPriceMin('');
      setPriceMax('');
      setSortBy('name');
      setSortOrder('asc');
    };

    const activeFiltersCount =
      selectedStockStatus.length +
      selectedCategories.length +
      (priceMin || priceMax ? 1 : 0);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={close}
          />

          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            {/* Handle Bar */}
            <View {...panResponder.panHandlers} style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>Filters</Text>
                {activeFiltersCount > 0 && (
                  <Text style={styles.headerSubtitle}>
                    {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={close}>
                <Ionicons name="close" size={24} color={Colors.text_primary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Stock Status */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stock Status</Text>
                <View style={styles.chipsContainer}>
                  {stockOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.chip,
                        selectedStockStatus.includes(option.id) && {
                          backgroundColor: option.color,
                          borderColor: option.color,
                        },
                      ]}
                      onPress={() => toggleStockStatus(option.id)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selectedStockStatus.includes(option.id) && styles.chipTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoryGrid}>
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryCard,
                        selectedCategories.includes(category.id) &&
                          styles.categoryCardActive,
                      ]}
                      onPress={() => toggleCategory(category.id)}
                    >
                      <Ionicons
                        name={category.icon as any}
                        size={24}
                        color={
                          selectedCategories.includes(category.id)
                            ? Colors.primary
                            : Colors.text_seconday
                        }
                      />
                      <Text
                        style={[
                          styles.categoryLabel,
                          selectedCategories.includes(category.id) &&
                            styles.categoryLabelActive,
                        ]}
                      >
                        {category.label}
                      </Text>
                      {selectedCategories.includes(category.id) && (
                        <View style={styles.checkmark}>
                          <Ionicons name="checkmark" size={16} color="#ffffff" />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Price Range</Text>
                <View style={styles.priceInputContainer}>
                  <View style={styles.priceInputWrapper}>
                    <Text style={styles.priceLabel}>Min</Text>
                    <View style={styles.priceInput}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <Text
                        style={styles.priceText}
                        onPress={() => {
                          // Aquí implementarías un input numérico
                          console.log('Open price input');
                        }}
                      >
                        {priceMin || '0'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.priceSeparator}>-</Text>

                  <View style={styles.priceInputWrapper}>
                    <Text style={styles.priceLabel}>Max</Text>
                    <View style={styles.priceInput}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <Text
                        style={styles.priceText}
                        onPress={() => {
                          console.log('Open price input');
                        }}
                      >
                        {priceMax || '∞'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Sort By */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sort By</Text>
                <View style={styles.sortContainer}>
                  {sortOptions.map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.sortOption,
                        sortBy === option.id && styles.sortOptionActive,
                      ]}
                      onPress={() => setSortBy(option.id)}
                    >
                      <Text
                        style={[
                          styles.sortOptionText,
                          sortBy === option.id && styles.sortOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {sortBy === option.id && (
                        <TouchableOpacity
                          onPress={() =>
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                          }
                        >
                          <Ionicons
                            name={
                              sortOrder === 'asc'
                                ? 'arrow-up'
                                : 'arrow-down'
                            }
                            size={18}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
              >
                <Text style={styles.applyButtonText}>
                  Apply Filters
                  {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.disabled,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_secondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text_primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.text_seconday,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text_primary,
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.bg_light_accent,
    borderWidth: 1,
    borderColor: Colors.light_secondary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.text_primary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: Colors.bg_light_accent,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  categoryCardActive: {
    backgroundColor: Colors.light_primary,
    borderColor: Colors.primary,
  },
  categoryLabel: {
    fontSize: 11,
    color: Colors.text_seconday,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.text_seconday,
    marginBottom: 8,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg_light_accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light_secondary,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text_primary,
    marginRight: 4,
  },
  priceText: {
    fontSize: 16,
    color: Colors.text_primary,
    fontWeight: '500',
  },
  priceSeparator: {
    fontSize: 18,
    color: Colors.text_seconday,
    marginTop: 20,
  },
  sortContainer: {
    gap: 8,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.bg_light_accent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light_secondary,
  },
  sortOptionActive: {
    backgroundColor: Colors.light_primary,
    borderColor: Colors.primary,
  },
  sortOptionText: {
    fontSize: 14,
    color: Colors.text_primary,
    fontWeight: '500',
  },
  sortOptionTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light_secondary,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.bg_light_accent,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light_secondary,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text_primary,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});