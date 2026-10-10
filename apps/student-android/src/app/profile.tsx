import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useStudentApp } from '@/lib/locale';
import { palette, spacing } from '@/lib/theme';

export default function ProfileScreen() {
  const { locale, setLocale } = useStudentApp();
  const bn = locale === 'bn';
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.kicker}>NITSCTI · {bn ? 'ডেমো মোড' : 'DEMO MODE'}</ThemedText>
        <ThemedText style={styles.title}>{bn ? 'শিক্ষার্থী প্রোফাইল' : 'Student profile'}</ThemedText>
        <View style={styles.card}><View style={styles.avatar}><ThemedText style={styles.avatarText}>N</ThemedText></View><ThemedText style={styles.cardTitle}>{bn ? 'অ্যাকাউন্ট সেবা সেটআপ হয়নি' : 'Account services are not configured'}</ThemedText><ThemedText style={styles.copy}>{bn ? 'এই build-এ নিরাপদ registration, sign-in বা recovery চালু নেই। আপনার কোনো password বা ব্যক্তিগত তথ্য চাওয়া বা সংরক্ষণ করা হচ্ছে না।' : 'Secure registration, sign-in and recovery are not enabled in this build. No password or personal information is requested or stored.'}</ThemedText><View style={styles.status}><ThemedText style={styles.statusText}>{bn ? 'সেটআপ প্রয়োজন' : 'Setup required'}</ThemedText></View></View>
        <ThemedText style={styles.section}>{bn ? 'পছন্দ' : 'Preferences'}</ThemedText>
        <View style={styles.preference}><View style={{ flex: 1 }}><ThemedText style={styles.cardTitle}>{bn ? 'অ্যাপের ভাষা' : 'App language'}</ThemedText><ThemedText style={styles.copy}>{bn ? 'বাংলা ও English' : 'Bangla and English'}</ThemedText></View><Pressable onPress={() => setLocale(bn ? 'en' : 'bn')} accessibilityRole="button" style={styles.language}><ThemedText style={styles.languageText}>{bn ? 'English' : 'বাংলা'}</ThemedText></Pressable></View>
        <ThemedText style={styles.section}>{bn ? 'সহায়তা' : 'Support'}</ThemedText>
        <Pressable onPress={() => Linking.openURL('tel:+8801567818036')} accessibilityRole="link" style={styles.contact}><ThemedText style={styles.contactText}>{bn ? 'NITSCTI-তে কল করুন  +880 1567-818036' : 'Call NITSCTI  +880 1567-818036'}</ThemedText><ThemedText style={styles.arrow}>→</ThemedText></Pressable>
        <ThemedText style={styles.privacy}>{bn ? 'এই local demo কোনো analytics, account, payment বা student data service-এ যুক্ত নয়।' : 'This local demo is not connected to analytics, account, payment or student data services.'}</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: palette.canvas }, content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: spacing.page, paddingBottom: 42, gap: 14 }, kicker: { color: palette.brandDark, fontSize: 10, fontWeight: '700', letterSpacing: 1 }, title: { color: palette.ink, fontSize: 29, lineHeight: 37, fontWeight: '700', marginBottom: 7 }, card: { alignItems: 'center', padding: 23, gap: 11, borderRadius: 18, borderWidth: 1, borderColor: palette.line, backgroundColor: '#fff' }, avatar: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 29, backgroundColor: '#eaf5fa' }, avatarText: { color: palette.brandDark, fontSize: 28, fontWeight: '800' }, cardTitle: { color: palette.ink, fontSize: 14, fontWeight: '700' }, copy: { color: palette.muted, fontSize: 11, lineHeight: 18, textAlign: 'center' }, status: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: '#fff2d5' }, statusText: { color: '#765600', fontSize: 10, fontWeight: '700' }, section: { color: palette.ink, fontSize: 16, fontWeight: '700', marginTop: 13 }, preference: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: palette.line, backgroundColor: '#fff' }, language: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 9, backgroundColor: '#eaf5fa' }, languageText: { color: palette.brandDark, fontWeight: '700', fontSize: 12 }, contact: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 17, borderRadius: 14, borderWidth: 1, borderColor: palette.line, backgroundColor: '#fff' }, contactText: { color: palette.brandDark, fontSize: 12, fontWeight: '700' }, arrow: { color: palette.brandDark, fontSize: 17 }, privacy: { marginTop: 10, color: palette.muted, fontSize: 10, lineHeight: 17 } });
