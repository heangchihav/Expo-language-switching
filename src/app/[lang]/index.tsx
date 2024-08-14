import { View, Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';

export default function HomePage() {
  const { language } = useLanguage();

  const content = {
    en: 'Welcome to the Home Page',
    fr: 'Bienvenue sur la page d\'accueil',
  };

  return (
    <View>
      <LanguageSwitcher/>
      <Text>{content[language]}</Text>
    </View>
  );
}
