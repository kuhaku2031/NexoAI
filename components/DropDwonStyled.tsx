// components/StyledSearchDropdown.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropDownStyledProps {
    value: any;
    onValueChange: any;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    items: any;
    setItems: any;
}

export function DropDownStyled({
    value,
    onValueChange,
    open,
    setOpen,
    items,
    setItems,
}: DropDownStyledProps) {



    return (
        <View>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={onValueChange}
                setItems={setItems}

                searchable={true}
                searchPlaceholder="Search locations..."
                listMode="MODAL"

                // ==========================================
                // ESTILOS DEL BOTÓN PRINCIPAL
                // ==========================================
                placeholder="Select a location"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholder}

                // ==========================================
                // ESTILOS DEL MODAL
                // ==========================================
                modalProps={{
                    animationType: "slide",
                    presentationStyle: "pageSheet", // iOS: medio modal
                }}

                // Container del modal completo
                modalContentContainerStyle={styles.modalContentContainer}

                // Header del modal personalizado
                // DropDownPicker does not support customModalTitle prop.
                // You may need to customize the modal header using modalContentContainerStyle or by wrapping DropDownPicker in a custom modal if you need a custom header.

                modalTitleStyle={styles.modalTitleText}
                // ==========================================
                // ESTILOS DEL SEARCH INPUT
                // ==========================================
                searchContainerStyle={styles.searchContainer}
                searchTextInputStyle={styles.searchInput}
                searchPlaceholderTextColor={Colors.disabled}

                // ==========================================
                // LISTA DE ITEMS PERSONALIZADOS
                // ==========================================
                flatListProps={{
                    style: styles.flatList,
                    contentContainerStyle: styles.flatListContent,
                }}

                // Renderizar cada item personalizado
                renderListItem={({ item, onPress }) => {
                    const itemData = item as any;
                    const isSelected = value === item.value;

                    return (
                        <TouchableOpacity
                            style={[
                                styles.customItem,
                                isSelected && styles.selectedCustomItem
                            ]}
                            onPress={onPress}
                            activeOpacity={0.7}
                        >
                            {/* Icono del location */}
                            <View style={[
                                styles.itemIconContainer,
                                isSelected && styles.selectedIconContainer
                            ]}>
                                <Ionicons
                                    name={itemData.icon || 'location'}
                                    size={24}
                                    color={isSelected ? '#ffffff' : Colors.primary}
                                />
                            </View>

                            {/* Información */}
                            <View style={styles.itemInfo}>
                                <Text style={[
                                    styles.itemLabel,
                                    isSelected && styles.selectedItemLabel
                                ]}>
                                    {item.label}
                                </Text>
                                <Text style={styles.itemDescription}>
                                    {itemData.description}
                                </Text>
                            </View>

                            {/* Status badge */}
                            <View style={styles.itemRight}>
                                <View style={[
                                    styles.statusBadge,
                                    itemData.status === 'open'
                                        ? styles.statusOpen
                                        : styles.statusClosed
                                ]}>
                                    <Text style={styles.statusText}>
                                        {itemData.status === 'open' ? 'Open' : 'Closed'}
                                    </Text>
                                </View>

                                {/* Check icon */}
                                {isSelected && (
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={24}
                                        color={Colors.primary}
                                        style={styles.checkIcon}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }}

                // ==========================================
                // ICONOS PERSONALIZADOS
                // ==========================================
                ArrowUpIconComponent={() => (
                    <View style={styles.arrowIcon}>
                        <Ionicons name="chevron-up" size={18} color={Colors.accent} />
                    </View>
                )}
                ArrowDownIconComponent={() => (
                    <View style={styles.arrowIcon}>
                        <Ionicons name="chevron-down" size={18} color={Colors.accent} />
                    </View>
                )}
                CloseIconComponent={() => (
                    <Ionicons name="search" size={20} color={Colors.secondary} />
                )}

                // ==========================================
                // EMPTY STATE PERSONALIZADO
                // ==========================================
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="search-outline" size={64} color={Colors.disabled} />
                        </View>
                        <Text style={styles.emptyTitle}>No locations found</Text>
                        <Text style={styles.emptySubtitle}>
                            Try adjusting your search terms or check if locations are available
                        </Text>
                        <TouchableOpacity style={styles.emptyButton}>
                            <Text style={styles.emptyButtonText}>Clear Search</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     marginBottom: 16,
    //     marginTop: 16,
    // },

    // ==========================================
    // DROPDOWN BUTTON STYLES
    // ==========================================
    dropdown: {
        backgroundColor: Colors.bg_light_secondary,
        borderWidth: 0,
        borderRadius: 16,
        paddingHorizontal: 16,
        elevation: 1,
    },
    dropdownText: {
        color: Colors.text_primary,
        fontSize: 8,
        fontWeight: '600',
    },
    placeholder: {
        color: Colors.text_primary,
        fontSize: 14,
    },
    arrowIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light_primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ==========================================
    // MODAL STYLES
    // ==========================================
    modalContentContainer: {
        backgroundColor: Colors.light_primary,
    },
    modalHeader: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    modalHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    modalSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ==========================================
    // SEARCH INPUT STYLES
    // ==========================================
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: Colors.light_secondary,
    },
    searchInput: {
        backgroundColor: Colors.light_primary,
        borderColor: Colors.light_secondary,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '500',
    },

    // ==========================================
    // LIST STYLES
    // ==========================================
    flatList: {
        backgroundColor: '#ffffff',
    },
    flatListContent: {
        paddingVertical: 8,
    },

    // ==========================================
    // CUSTOM ITEM STYLES
    // ==========================================
    customItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light_primary,
    },
    selectedCustomItem: {
        backgroundColor: Colors.light_primary,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    itemIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.light_primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selectedIconContainer: {
        backgroundColor: Colors.primary,
    },
    itemInfo: {
        flex: 1,
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 4,
    },
    selectedItemLabel: {
        color: Colors.accent,
    },
    itemDescription: {
        fontSize: 13,
        color: Colors.secondary,
    },
    itemRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusOpen: {
        backgroundColor: '#d4edda',
    },
    statusClosed: {
        backgroundColor: '#f8d7da',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.primary,
    },
    checkIcon: {
        marginTop: 4,
    },

    // ==========================================
    // EMPTY STATE STYLES
    // ==========================================
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    emptyIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.light_primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: Colors.secondary,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    emptyButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: Colors.primary,
        borderRadius: 12,
    },
    emptyButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
});