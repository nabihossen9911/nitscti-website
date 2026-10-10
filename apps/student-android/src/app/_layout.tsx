import { DefaultTheme, ThemeProvider } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTabs from '@/components/app-tabs';
import { LocaleProvider } from '@/lib/locale';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <ThemeProvider value={DefaultTheme}>
          <AppTabs />
        </ThemeProvider>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
