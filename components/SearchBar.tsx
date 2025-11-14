// components/SearchBar.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  showFilter?: boolean;
  onFilterPress?: () => void;
  autoFocus?: boolean;
  variant?: 'default' | 'compact';
}

export function SearchBar({
  placeholder = 'Search products...',
  value,
  onChangeText,
  onSearch,
  onClear,
  showFilter = false,
  onFilterPress,
  autoFocus = false,
  variant = 'default',
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    <View style={[
      styles.container,
      variant === 'compact' && styles.compactContainer,
      isFocused && styles.focusedContainer
    ]}>
      {/* Search Icon */}
      <Ionicons
        name="search-outline"
        size={20}
        color={isFocused ? Colors.primary : Colors.text_seconday}
        style={styles.searchIcon}
      />

      {/* Input */}
      <TextInput
        style={[styles.input, variant === 'compact' && styles.compactInput]}
        placeholder={placeholder}
        placeholderTextColor={Colors.text_seconday}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={Colors.text_seconday}
          />
        </TouchableOpacity>
      )}

    </View>
    {/* Filter Button */}
      {showFilter && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={onFilterPress ? styles.filterButton : [styles.filterButton,styles.focusedContainer]}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={onFilterPress ? Colors.primary : Colors.text_seconday}
          />
        </TouchableOpacity>
      )}
      </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    width: '85%',
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    height: 44,
    paddingHorizontal: 10,
  },
  focusedContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text_primary,
    paddingVertical: 0,
  },
  compactInput: {
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});