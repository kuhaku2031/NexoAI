import { Platform, StyleSheet, View } from 'react-native';

import { DropDownStyled } from '@/components/DropDwonStyled';
import { KPICard } from '@/components/KPICard';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function DashboardScreen() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [pointsofsale, setPointsOfSale] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  return (
    <SafeScreen scrollable={true} contentContainerStyle={{ paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 100 : 80, }}>
      <View>
        <ThemedText type="title" style={{ color: Colors.text_primary,  marginBottom: 16 }} >Dashboard</ThemedText>
      </View>
      <View>
        <ThemedText type="subtitle" style={{ color: Colors.text_seconday, fontWeight: '400' }} >Welcome back! Here's your business overview.</ThemedText>
      </View>

      {/* Point Sale */}
      <View style={styles.pointOfSaleContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ backgroundColor: Colors.bg_light_secondary, padding: 8, borderRadius: 8 }}>
            <Ionicons name="location-outline" size={24} className='text-white' color={Colors.accent} />
          </View>
          <View>
            <ThemedText type="defaultSemiBold" style={{ color: Colors.text_primary }} >
              Point of Sale Location
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: Colors.text_seconday }} >
              Select location to view data
            </ThemedText>
          </View>
        </View>

        <View>
          <DropDownStyled
            value={value}
            onValueChange={setValue}
            open={open}
            setOpen={setOpen}
            items={pointsofsale}
            setItems={setPointsOfSale}
          />
        </View>
      </View>

      {/* KPI Cards Grid*/}
      <View style={styles.kpiContainer}>

        {/* Daily Sales */}
        <View style={styles.kpiCard}>
          <KPICard
            title="Daily Sales"
            value="$4,329"
            icon="cash"
            trend={{
              value: '+12.5%',
              type: 'up',
            }}
            subtitle="from yesterday"
            location="Downtown Branch"
            status="success"
          />
        </View>

        {/* Revenue */}
        <View  style={styles.kpiCard}>
          <KPICard
            title="Revenue"
            value="$28,450"
            icon="trending-up"
            trend={{
              value: '+8.2%',
              type: 'up',
            }}
            subtitle="from last week"
            location="Downtown Branch"
            status="success"
          />
        </View>

       {/* Low Stock */}
        <View  style={styles.kpiCard}>
          <KPICard
            title="Low Stock"
            value="7"
            icon="alert-circle"
            subtitle="Items need restocking"
            location="Downtown Branch"
            status="danger"
          />
        </View>

        {/* Products */}
        <View  style={styles.kpiCard}>
          <KPICard
            title="Products"
            value="1,247"
            icon="cart-outline"
            trend={{
              value: '+12.5%',
              type: 'neutral',
            }}
            subtitle="from yesterday"
            location="Downtown Branch"
            status="warning"
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({

  // =============================
  // PRINCIPAL CONTAINER
  // =============================
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },


  // =============================
  // POIN OF SALE STYLES
  // =============================
  pointOfSaleContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.bg_light_accent,
    gap: 16,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: Colors.light_secondary,
    borderWidth: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },


  // =======================================
  // METRICS STYLES
  // =======================================
kpiContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 24,
},
kpiCard: {
  width: '48%',
  minWidth: 154,
  marginBottom: 12,
},

});
