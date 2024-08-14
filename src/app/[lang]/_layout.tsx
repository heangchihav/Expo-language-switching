import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Language, LanguageProvider, useLanguage } from '../../contexts/LanguageContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const pathname = usePathname();
  const language = pathname.split('/')[1] as Language; // Extract language from pathname

  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    setLanguage(language); // Set language based on pathname
  }, [loaded, language]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen name="index" options={{ headerShown: true }} />
        <Drawer.Screen name="about" />
        <Drawer.Screen name="contact" />
      </Drawer>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  );
}
