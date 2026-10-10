import { Linking, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import catalog from '../../../../packages/shared/course-catalog.json';
import { ThemedText } from '@/components/themed-text';
import { useStudentApp } from '@/lib/locale';
import { palette, spacing } from '@/lib/theme';

export default function CoursesScreen() {
  const { locale, interests, toggleInterest } = useStudentApp();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const bn = locale === 'bn';
  const courses = useMemo(() => catalog.filter((course) => `${course.title} ${course.category} ${course.summary.en} ${course.summary.bn}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText style={styles.kicker}>NITSCTI · {bn ? 'ডেমো মোড' : 'DEMO MODE'}</ThemedText>
        <ThemedText style={styles.title}>{bn ? 'কোর্স খুঁজুন' : 'Explore courses'}</ThemedText>
        <ThemedText style={styles.note}>{bn ? 'প্রকাশিত কোর্সের নাম ও সংক্ষিপ্ত বিবরণ। ফি ও ব্যাচের তথ্য সরাসরি জেনে নিন।' : 'Published course names and summaries. Contact the institute to confirm fees and batches.'}</ThemedText>
        <TextInput value={query} onChangeText={setQuery} placeholder={bn ? 'নাম বা বিষয় দিয়ে খুঁজুন' : 'Search by name or topic'} placeholderTextColor={palette.muted} style={styles.search} accessibilityLabel={bn ? 'কোর্স খুঁজুন' : 'Search courses'} returnKeyType="search" />
        <View style={styles.interestCount}><ThemedText style={styles.countText}>{bn ? `এই সেশনে ${interests.length}টি আগ্রহ সংরক্ষিত` : `${interests.length} interests saved this session`}</ThemedText></View>
        {courses.map((course) => {
          const isOpen = expanded === course.id;
          const isSaved = interests.includes(course.id);
          return <View key={course.id} style={styles.card}>
            <View style={styles.cardTop}><View style={styles.courseMark}><ThemedText style={styles.courseMarkText}>{course.title.charAt(0)}</ThemedText></View><View style={styles.titleBlock}><ThemedText style={styles.category}>{course.category.toUpperCase()}</ThemedText><ThemedText style={styles.cardTitle}>{course.title}</ThemedText></View><Pressable onPress={() => toggleInterest(course.id)} accessibilityRole="button" accessibilityLabel={isSaved ? (bn ? 'আগ্রহ বাদ দিন' : 'Remove interest') : (bn ? 'আগ্রহ সংরক্ষণ করুন' : 'Save interest')} style={isSaved ? styles.savedButton : styles.saveButton}><ThemedText style={isSaved ? styles.savedText : styles.saveText}>{isSaved ? '✓' : '+'}</ThemedText></Pressable></View>
            <ThemedText style={styles.description}>{course.summary[locale]}</ThemedText>
            {isOpen && <View style={styles.detail}><ThemedText style={styles.detailText}>{bn ? 'কোর্স ফি, সময়কাল, curriculum ও বর্তমান ব্যাচের তথ্য প্রতিষ্ঠান থেকে নিশ্চিত করুন।' : 'Confirm fees, duration, curriculum and current batch details with the institute.'}</ThemedText><Pressable onPress={() => Linking.openURL('tel:+8801567818036')} accessibilityRole="link"><ThemedText style={styles.phone}>{bn ? 'কল করে জেনে নিন  +880 1567-818036' : 'Call to enquire  +880 1567-818036'}</ThemedText></Pressable></View>}
            <Pressable onPress={() => setExpanded(isOpen ? null : course.id)} accessibilityRole="button" accessibilityState={{ expanded: isOpen }} style={styles.detailsButton}><ThemedText style={styles.detailsText}>{isOpen ? (bn ? 'কম দেখুন' : 'Show less') : (bn ? 'কোর্সের তথ্য' : 'Course information')}  →</ThemedText></Pressable>
          </View>;
        })}
        {courses.length === 0 && <View style={styles.empty}><ThemedText style={styles.note}>{bn ? 'এই অনুসন্ধানে কোনো কোর্স মেলেনি।' : 'No courses match that search.'}</ThemedText></View>}
        <ThemedText style={styles.disclaimer}>{bn ? 'আগ্রহ সংরক্ষণ শুধু অ্যাপ খোলা থাকা পর্যন্ত থাকে; এটি ভর্তি আবেদন নয়, সার্ভারে পাঠানোও হয় না।' : 'Interest is held in memory only while this app session is open. It is not an application and is not sent to a server.'}</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: palette.canvas }, content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: spacing.page, paddingBottom: 42, gap: 14 }, kicker: { color: palette.brandDark, fontSize: 10, fontWeight: '700', letterSpacing: 1 }, title: { color: palette.ink, fontSize: 29, lineHeight: 37, fontWeight: '700' }, note: { color: palette.muted, fontSize: 12, lineHeight: 19 }, search: { minHeight: 48, marginTop: 7, paddingHorizontal: 15, borderRadius: 11, borderColor: palette.line, borderWidth: 1, backgroundColor: '#fff', color: palette.ink, fontSize: 13 }, interestCount: { paddingVertical: 8 }, countText: { color: palette.brandDark, fontSize: 11, fontWeight: '600' }, card: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: palette.line, backgroundColor: '#fff', gap: 12 }, cardTop: { flexDirection: 'row', alignItems: 'center', gap: 11 }, courseMark: { width: 43, height: 43, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: '#eaf5fa' }, courseMarkText: { color: palette.brandDark, fontSize: 20, fontWeight: '800' }, titleBlock: { flex: 1, gap: 3 }, category: { color: palette.brandDark, fontSize: 9, fontWeight: '700', letterSpacing: 1 }, cardTitle: { color: palette.ink, fontSize: 15, fontWeight: '700' }, saveButton: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 11, borderWidth: 1, borderColor: '#cfdee5' }, savedButton: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: palette.brandDark }, saveText: { color: palette.brandDark, fontSize: 22 }, savedText: { color: '#fff', fontSize: 17, fontWeight: '700' }, description: { color: palette.muted, fontSize: 12, lineHeight: 20 }, detail: { padding: 12, borderRadius: 11, backgroundColor: '#f1f8fb', gap: 8 }, detailText: { color: palette.muted, fontSize: 11, lineHeight: 18 }, phone: { color: palette.brandDark, fontSize: 12, fontWeight: '700' }, detailsButton: { alignSelf: 'flex-start', paddingTop: 2, paddingBottom: 4 }, detailsText: { color: palette.brandDark, fontWeight: '700', fontSize: 12 }, disclaimer: { marginTop: 8, color: palette.muted, fontSize: 10, lineHeight: 17 }, empty: { padding: 22, alignItems: 'center' } });
