// app/(auth)/login.tsx
import { DividerWithText } from '@/components/DividerWithText';
import { GradientCircleIcon } from '@/components/GradientCircleIcon';
import { InputDisplay } from '@/components/InputDisplay';
import { SafeScreen } from '@/components/SafeScreen';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors, ComponentColors } from '@/constants/Colors';
import { Checkbox } from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function LoginScreen() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']} backgroundColor={Colors.light_primary}>
        <View style={styles.content}>
          <View style={styles.header}>
            <GradientCircleIcon iconName="storefront-outline" iconSize={40} iconColor={"#ffffff"} />
            <ThemedText type='title' style={{ color: Colors.primary }}>Business POS</ThemedText>
            <ThemedText type='subtitle' style={{ color: Colors.secondary }}>Inicia sesión en tu cuenta</ThemedText>
          </View>

          {/* Form */}
          <View style={styles.form}>

            <InputDisplay value={email} onChangeText={setEmail} placeholder='Email' label='Email' icon={"mail-outline"} />

            <InputDisplay value={password} onChangeText={setPassword} placeholder='Contraseña' label='Contraseña' icon={"lock-closed-outline"} showToggle={false} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
              <View style={styles.checkboxContainer}>
                <Checkbox value={isChecked} onValueChange={setChecked} style={styles.checkbox} color={Colors.primary} />
                <ThemedText style={styles.text}>Recordarme</ThemedText>
              </View>
              <ThemedText type='link'  >Olvidaste tu contraseña?</ThemedText>
            </View>

            <ThemedButton title='Iniciar Sesion' onPress={() => router.push('/(tabs)')} type='gradient'  disabled={false}/>

            <DividerWithText text="¿No tienes cuenta?" />

            <ThemedButton title='Crear Cuenta' type='outline' onPress={() => router.push('/register')} />
          </View>
        </View>

                <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ThemedText type='default' style={{ color: Colors.secondary, fontSize: 16, textAlign: 'center' }}>Al continuar, aceptas nuestros Términos de Servicio</ThemedText>
        </View>
</SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_primary,
    paddingHorizontal: 20,
  },
  content: {
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
  },
  text: {
    color: ComponentColors.input.text,
  },
  checkbox: {
    marginLeft: 4,
  },
  signinButton: {
    marginTop: 10,
  },
});