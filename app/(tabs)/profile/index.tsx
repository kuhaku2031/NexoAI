import { Image, Platform, Pressable, StyleSheet, Switch, TextInput, View } from 'react-native';

import { HeaderBar } from '@/components/HeaderBar';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ComponentColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@retailpro.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Downtown",
    role: "Store Manager",
    department: "Operations",
    employeeId: "EMP001",
    joinDate: "January 15, 2023",
    lastLogin: "Today at 9:30 AM",
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      <HeaderBar
        title="Profile"
        subtitle="Manage your account"
        showNotifications={true}
        notificationCount={3}
        showProfile={false}
        variant="default"
        showBackButton={false}
      />
      <SafeScreen
        scrollable={true}
        edges={['bottom', 'left', 'right']}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 88 : 68 }}
      >
        {/* Profile Header with Gradient */}
        <View style={styles.profileHeaderContainer}>
          <LinearGradient
            colors={[Colors.accent, Colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <View style={styles.headerActions}>
              {!isEditing ? (
                <Pressable
                  onPress={() => setIsEditing(true)}
                  style={styles.editButton}
                >
                  <Ionicons name="create-outline" size={16} color="#fff" />
                  <ThemedText style={styles.editButtonText}>Edit</ThemedText>
                </Pressable>
              ) : (
                <View style={styles.editActions}>
                  <Pressable
                    onPress={() => setIsEditing(false)}
                    style={styles.cancelButton}
                  >
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </Pressable>
                  <Pressable
                    onPress={handleSave}
                    style={styles.saveButton}
                  >
                    <Ionicons name="checkmark" size={16} color={Colors.primary} />
                    <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                  </Pressable>
                </View>
              )}
            </View>

            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.avatar}
                />
                {isEditing && (
                  <Pressable style={styles.cameraButton}>
                    <Ionicons name="camera" size={16} color={Colors.primary} />
                  </Pressable>
                )}
              </View>
              <View style={styles.profileInfo}>
                <ThemedText type="subtitle" style={styles.profileName}>
                  {profile.name}
                </ThemedText>
                <View style={styles.badgesContainer}>
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>{profile.role}</ThemedText>
                  </View>
                  <View style={[styles.badge, styles.badgeSecondary]}>
                    <ThemedText style={styles.badgeText}>{profile.department}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.employeeId}>
                  Employee ID: {profile.employeeId}
                </ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Personal Information */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={20} color={Colors.accent} />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Personal Information
            </ThemedText>
          </View>

          <View style={styles.sectionContent}>
            {/* Full Name */}
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={16} color={Colors.primary} />
                {isEditing ? (
                  <TextInput
                    value={profile.name}
                    onChangeText={(text) => setProfile({ ...profile, name: text })}
                    style={styles.input}
                    placeholderTextColor={Colors.text_seconday}
                  />
                ) : (
                  <ThemedText style={styles.inputText}>{profile.name}</ThemedText>
                )}
              </View>
            </View>

            {/* Email */}
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Email Address</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={16} color={Colors.primary} />
                {isEditing ? (
                  <TextInput
                    value={profile.email}
                    onChangeText={(text) => setProfile({ ...profile, email: text })}
                    style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.text_seconday}
                  />
                ) : (
                  <ThemedText style={styles.inputText}>{profile.email}</ThemedText>
                )}
              </View>
            </View>

            {/* Phone */}
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="call" size={16} color={Colors.primary} />
                {isEditing ? (
                  <TextInput
                    value={profile.phone}
                    onChangeText={(text) => setProfile({ ...profile, phone: text })}
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholderTextColor={Colors.text_seconday}
                  />
                ) : (
                  <ThemedText style={styles.inputText}>{profile.phone}</ThemedText>
                )}
              </View>
            </View>

            {/* Address */}
            <View style={styles.infoItem}>
              <ThemedText style={styles.label}>Address</ThemedText>
              <View style={styles.inputWrapper}>
                <Ionicons name="location" size={16} color={Colors.primary} />
                {isEditing ? (
                  <TextInput
                    value={profile.address}
                    onChangeText={(text) => setProfile({ ...profile, address: text })}
                    style={styles.input}
                    placeholderTextColor={Colors.text_seconday}
                  />
                ) : (
                  <ThemedText style={styles.inputText}>{profile.address}</ThemedText>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Work Information */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="briefcase-outline" size={20} color={Colors.accent} />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Work Information
            </ThemedText>
          </View>

          <View style={styles.sectionContent}>
            <View style={styles.workInfoItem}>
              <View style={styles.workInfoLeft}>
                <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.workInfoTitle}>
                    Role
                  </ThemedText>
                  <ThemedText style={styles.workInfoValue}>{profile.role}</ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.workInfoItem}>
              <View style={styles.workInfoLeft}>
                <Ionicons name="calendar" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.workInfoTitle}>
                    Join Date
                  </ThemedText>
                  <ThemedText style={styles.workInfoValue}>{profile.joinDate}</ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.workInfoItem}>
              <View style={styles.workInfoLeft}>
                <Ionicons name="time" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.workInfoTitle}>
                    Last Login
                  </ThemedText>
                  <ThemedText style={styles.workInfoValue}>{profile.lastLogin}</ThemedText>
                </View>
              </View>
              <View style={styles.activeBadge}>
                <ThemedText style={styles.activeBadgeText}>Active</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="settings-outline" size={20} color={Colors.accent} />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              App Settings
            </ThemedText>
          </View>

          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.settingTitle}>
                    Push Notifications
                  </ThemedText>
                  <ThemedText style={styles.settingSubtitle}>
                    Receive alerts and updates
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: Colors.bg_light_secondary, true: Colors.accent }}
                thumbColor={notifications ? Colors.primary : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.settingTitle}>
                    Dark Mode
                  </ThemedText>
                  <ThemedText style={styles.settingSubtitle}>
                    Switch to dark theme
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.bg_light_secondary, true: Colors.accent }}
                thumbColor={darkMode ? Colors.primary : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="sync" size={20} color={Colors.primary} />
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.settingTitle}>
                    Auto Sync
                  </ThemedText>
                  <ThemedText style={styles.settingSubtitle}>
                    Sync data automatically
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: Colors.bg_light_secondary, true: Colors.accent }}
                thumbColor={autoSync ? Colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Security & Privacy */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark-outline" size={20} color={Colors.accent} />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Security & Privacy
            </ThemedText>
          </View>

          <View style={styles.sectionContent}>
            <Pressable style={styles.securityButton}>
              <Ionicons name="lock-closed" size={16} color={Colors.primary} />
              <ThemedText style={styles.securityButtonText}>Change Password</ThemedText>
            </Pressable>

            <Pressable style={styles.securityButton}>
              <Ionicons name="phone-portrait" size={16} color={Colors.primary} />
              <ThemedText style={styles.securityButtonText}>Two-Factor Authentication</ThemedText>
            </Pressable>

            <Pressable style={styles.securityButton}>
              <Ionicons name="time-outline" size={16} color={Colors.primary} />
              <ThemedText style={styles.securityButtonText}>Login History</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutCard}>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
          </Pressable>
        </View>
      </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  // =============================
  // PROFILE HEADER STYLES
  // =============================
  profileHeaderContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  gradientHeader: {
    padding: 20,
    borderRadius: 24,
  },
  headerActions: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  profileInfo: {
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeSecondary: {
    backgroundColor: 'rgba(144, 224, 239, 0.2)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  employeeId: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },

  // =============================
  // SECTION CARD STYLES
  // =============================
  sectionCard: {
    backgroundColor: ComponentColors.card.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: Colors.bg_light_secondary,
    padding: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    color: Colors.text_primary,
    fontSize: 16,
  },
  sectionContent: {
    gap: 12,
  },

  // =============================
  // PERSONAL INFO STYLES
  // =============================
  infoItem: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.text_seconday,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.bg_light_secondary,
    padding: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.text_primary,
    padding: 0,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text_primary,
  },

  // =============================
  // WORK INFO STYLES
  // =============================
  workInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg_light_secondary,
    padding: 12,
    borderRadius: 12,
  },
  workInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  workInfoTitle: {
    color: Colors.text_primary,
    fontSize: 14,
  },
  workInfoValue: {
    color: Colors.text_seconday,
    fontSize: 12,
  },
  activeBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // =============================
  // SETTINGS STYLES
  // =============================
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg_light_secondary,
    padding: 12,
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    color: Colors.text_primary,
    fontSize: 14,
  },
  settingSubtitle: {
    color: Colors.text_seconday,
    fontSize: 12,
  },

  // =============================
  // SECURITY STYLES
  // =============================
  securityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    padding: 12,
    borderRadius: 12,
  },
  securityButtonText: {
    color: Colors.text_primary,
    fontSize: 14,
    fontWeight: '500',
  },

  // =============================
  // LOGOUT STYLES
  // =============================
  logoutCard: {
    backgroundColor: ComponentColors.card.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
