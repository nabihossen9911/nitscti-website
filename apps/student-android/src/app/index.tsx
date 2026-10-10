import { Link } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useStudentApp } from '@/lib/locale';
import { palette, spacing } from '@/lib/theme';

export default function HomeScreen() {
  const { locale, interests } = useStudentApp();
  const bn = locale === 'bn';
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><View><ThemedText style={styles.brand}>NITSCTI</ThemedText><ThemedText style={styles.caption}>{bn ? 'শিক্ষার্থী অ্যাপ' : 'STUDENT APP'}</ThemedText></View><View style={styles.demo}><ThemedText style={styles.demoText}>{bn ? 'ডেমো মোড' : 'DEMO MODE'}</ThemedText></View></View>
        <View style={styles.hero}><ThemedText style={styles.kicker}>NITS COMPUTER TRAINING INSTITUTE</ThemedText><ThemedText style={styles.title}>{bn ? 'দক্ষতা শিখুন, আত্মবিশ্বাসে এগিয়ে যান' : 'Build practical skills with confidence'}</ThemedText><ThemedText style={styles.paragraph}>{bn ? 'NITSCTI-এর প্রকাশিত কোর্সগুলো দেখুন এবং বর্তমান ব্যাচের তথ্য সরাসরি জেনে নিন।' : 'Explore NITSCTI’s published courses and contact the institute for current batch information.'}</ThemedText><Link href="/explore" asChild><ThemedText style={styles.primaryButton}>{bn ? 'কোর্স দেখুন  →' : 'Explore courses  →'}</ThemedText></Link></View>
        <View style={styles.sectionHeader}><ThemedText style={styles.sectionTitle}>{bn ? 'আপনার শেখার স্থান' : 'Your learning space'}</ThemedText><ThemedText style={styles.sectionNote}>{bn ? 'নিরাপদ অ্যাকাউন্ট সেবা যুক্ত হলে ভর্তি কোর্স এখানে দেখাবে।' : 'Enrolled courses will appear here after secure account services are configured.'}</ThemedText></View>
        <View style={styles.empty}><ThemedText style={styles.emptyIcon}>◷</ThemedText><ThemedText style={styles.cardTitle}>{bn ? 'এখনো কোনো কোর্স যুক্ত নেই' : 'No enrolled courses yet'}</ThemedText><ThemedText style={styles.paragraph}>{bn ? 'এই বিল্ডে login, admission approval ও learning content সংযুক্ত নয়।' : 'Login, admission approval and learning content are not connected in this build.'}</ThemedText></View>
        <View style={styles.statRow}><View style={styles.statCard}><ThemedText style={styles.statNumber}>{interests.length}</ThemedText><ThemedText style={styles.statLabel}>{bn ? 'এই সেশনে আগ্রহ' : 'Interests this session'}</ThemedText></View><View style={styles.statCard}><ThemedText style={styles.statNumber}>06</ThemedText><ThemedText style={styles.statLabel}>{bn ? 'প্রকাশিত কোর্স' : 'Published courses'}</ThemedText></View></View>
        <ThemedText style={styles.footnote}>{bn ? 'কোর্স ফি, সময়কাল ও availability সরাসরি NITSCTI-তে নিশ্চিত করুন।' : 'Confirm course fees, duration and availability directly with NITSCTI.'}</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: palette.canvas }, content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: spacing.page, gap: 22, paddingBottom: 42 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, brand: { color: palette.ink, fontSize: 18, fontWeight: '800', letterSpacing: 1 }, caption: { color: palette.muted, fontSize: 10, marginTop: 2 }, demo: { backgroundColor: '#fff2d5', borderRadius: 99, paddingHorizontal: 12, paddingVertical: 7 }, demoText: { color: '#765600', fontSize: 10, fontWeight: '700' }, hero: { backgroundColor: '#eaf5fa', borderColor: '#d4e7ef', borderWidth: 1, borderRadius: 24, padding: 23, gap: 12 }, kicker: { color: palette.brandDark, fontSize: 9, fontWeight: '700', letterSpacing: 1 }, title: { color: palette.ink, fontSize: 29, lineHeight: 38, fontWeight: '700' }, paragraph: { color: palette.muted, fontSize: 13, lineHeight: 21 }, primaryButton: { alignSelf: 'flex-start', overflow: 'hidden', backgroundColor: palette.brandDark, color: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, fontWeight: '700', fontSize: 13 }, sectionHeader: { gap: 7 }, sectionTitle: { color: palette.ink, fontSize: 20, fontWeight: '700' }, sectionNote: { color: palette.muted, fontSize: 12, lineHeight: 19 }, empty: { alignItems: 'center', gap: 8, padding: 24, borderWidth: 1, borderStyle: 'dashed', borderColor: '#cbd8df', borderRadius: 16, backgroundColor: '#fff' }, emptyIcon: { color: palette.brand, fontSize: 29 }, cardTitle: { color: palette.ink, fontSize: 16, fontWeight: '700' }, statRow: { flexDirection: 'row', gap: 12 }, statCard: { flex: 1, padding: 17, borderRadius: 15, borderColor: palette.line, borderWidth: 1, backgroundColor: '#fff' }, statNumber: { color: palette.brandDark, fontSize: 23, fontWeight: '800' }, statLabel: { color: palette.muted, fontSize: 11, marginTop: 4 }, footnote: { color: palette.muted, fontSize: 11, lineHeight: 18 } });
