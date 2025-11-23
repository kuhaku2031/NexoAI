import { MOCK_USERS } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

/**
 * Componente de desarrollo para cambiar entre usuarios estáticos
 * TODO: ELIMINAR EN PRODUCCIÓN
 */
export function UserSwitcher() {
    const { user, switchUser } = useAuth();

    if (!switchUser) {
        return null; // No mostrar en producción
    }

    const users = [
        { type: 'admin' as const, label: 'Admin', icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap },
        { type: 'employee' as const, label: 'Employee', icon: 'person' as keyof typeof Ionicons.glyphMap },
        { type: 'manager' as const, label: 'Manager', icon: 'briefcase' as keyof typeof Ionicons.glyphMap },
        { type: 'viewer' as const, label: 'Viewer', icon: 'eye' as keyof typeof Ionicons.glyphMap },
    ];

    return (
        <View style={styles.container}>
            <ThemedText type="defaultSemiBold" style={styles.title}>
                🔧 DEV: Switch User
            </ThemedText>
            <View style={styles.buttonsContainer}>
                {users.map(({ type, label, icon }) => {
                    const isActive = user?.role === MOCK_USERS[type].role;
                    return (
                        <TouchableOpacity
                            key={type}
                            style={[styles.button, isActive && styles.activeButton]}
                            onPress={() => switchUser(type)}
                        >
                            <Ionicons
                                name={icon}
                                size={20}
                                color={isActive ? '#ffffff' : '#64748b'}
                            />
                            <ThemedText
                                type="defaultSemiBold"
                                style={[styles.buttonText, isActive && styles.activeButtonText]}
                            >
                                {label}
                            </ThemedText>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <ThemedText type="default" style={styles.currentUser}>
                Current: {user?.name} ({user?.role})
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff3cd',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ffc107',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        color: '#856404',
        marginBottom: 12,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cbd5e1',
    },
    activeButton: {
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
    },
    buttonText: {
        fontSize: 14,
        color: '#64748b',
    },
    activeButtonText: {
        color: '#ffffff',
    },
    currentUser: {
        fontSize: 12,
        color: '#856404',
        marginTop: 12,
        textAlign: 'center',
    },
});
