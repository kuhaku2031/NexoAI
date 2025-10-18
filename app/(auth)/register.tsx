// app/(auth)/login.tsx
import { DividerWithText } from '@/components/DividerWithText';
import { GradientCircleIcon } from '@/components/GradientCircleIcon';
import { InputDisplay } from '@/components/InputDisplay';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ComponentColors } from '@/constants/Colors';
import { useSafeArea } from '@/hooks/useSafeArea';
import { Checkbox } from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function RegisterScreen() {

  const containerPadding = useSafeArea({
    type: 'topBottom',
    extraTop: 20,
    extraBottom: 20
  });


  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleLogin = () => {

  }

  return (
    <Animated.ScrollView style={styles.container}>
      <View style={[styles.content, containerPadding]}>
        <View style={styles.header}>
          <GradientCircleIcon iconName="storefront-outline" iconSize={40} iconColor={"#ffffff"} />
          <ThemedText type='title' style={{ color: Colors.primary }}>Business POS</ThemedText>
          <ThemedText type='default' style={{ color: Colors.secondary, fontSize: 18 }}>Crea tu cuenta de negocio</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>

          <InputDisplay value={name} onChangeText={setName} placeholder='Name' label='Name' icon={"person-outline"} />

          <InputDisplay value={business} onChangeText={setBusiness} placeholder='Business' label='Business' icon={"business-outline"} />

          <InputDisplay value={email} onChangeText={setEmail} placeholder='Email' label='Email' icon={"mail-outline"} />

          <InputDisplay value={password} onChangeText={setPassword} placeholder='Password' label='Password' icon={"lock-closed-outline"} showToggle={false} />

          <InputDisplay value={confirm_password} onChangeText={setConfirmPassword} placeholder='Password' label='Confirm Password' icon={"lock-closed-outline"} showToggle={false} />




          <View style={{ alignItems: 'center', marginVertical: 8, flex: 1, maxWidth: '100%' }}>
            <View style={styles.checkboxContainer}>
              <Checkbox value={isChecked} onValueChange={setChecked} style={styles.checkbox} color={Colors.primary} />
              <ThemedText style={styles.text}>Acepto los Términos de Servicio y la Política de Privacidad</ThemedText>
            </View>
          </View>

          <ThemedButton title='Crear cuenta' onPress={handleLogin} type='gradient' />

          <DividerWithText text="¿Ya tienes cuenta?" />

          <ThemedButton title='Iniciar Sesion' type='outline' onPress={() => router.push('/login')} />

        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ThemedText type='default' style={{ color: Colors.secondary, fontSize: 16, textAlign: 'center' }}>Protegemos tu información con encriptación de nivel empresarial</ThemedText>
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_primary,
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    width: '100%',
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 12,
  },

  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    gap: 10,
  },
  title: {
    color: "#fffffff",
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  text: {
    color: ComponentColors.input.text,
    flexShrink: 1,
  },
  checkbox: {
    marginLeft: 4,
  },
  signinButton: {
    marginTop: 10,
  },
});