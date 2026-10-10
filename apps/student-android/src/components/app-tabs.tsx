import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Colors } from '@/constants/theme';
import { useStudentApp } from '@/lib/locale';

export default function AppTabs() {
  const { locale } = useStudentApp();
  const colors = Colors.light;
  return (
    <NativeTabs backgroundColor={colors.background} indicatorColor={colors.backgroundElement} labelStyle={{ selected: { color: '#0b648f' } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{locale === 'bn' ? 'হোম' : 'Home'}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>{locale === 'bn' ? 'কোর্স' : 'Courses'}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>{locale === 'bn' ? 'প্রোফাইল' : 'Profile'}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} renderingMode="template" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
