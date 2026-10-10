import { useMemo, useState } from 'react'
import catalog from '../../../packages/shared/course-catalog.json'
import './App.css'

type Locale = 'bn' | 'en'
type Page = 'home' | 'courses' | 'learning' | 'profile'
type Course = (typeof catalog)[number]

const courseCovers: Record<string, string> = {
  'office-applications': new URL('../../../assets/images/courses/microsoft-office-course-nits-computer-training-institute.webp', import.meta.url).href,
  'graphic-design': new URL('../../../assets/images/courses/graphic-design-course-nits-computer-training-institute.webp', import.meta.url).href,
  'digital-marketing': new URL('../../../assets/images/courses/digital-marketing-course-nits-computer-training-institute.webp', import.meta.url).href,
  'video-editing': new URL('../../../assets/images/courses/video-editing-course-nits-computer-training-institute.webp', import.meta.url).href,
  'web-development': new URL('../../../assets/images/courses/web-development-course-nits-computer-training-institute.webp', import.meta.url).href,
  'motion-graphics': new URL('../../../assets/images/courses/motion-graphics-design-course-nits-computer-training-institute.webp', import.meta.url).href,
}
const brandLogo = new URL('../../../assets/images/logo/web/nitscti-logo.svg', import.meta.url).href
const currentYear = new Date().getFullYear()

const copy = {
  en: {
    brand: 'NITSCTI', institute: 'Computer Training Institute', demo: 'DEMO MODE',
    home: 'Home', courses: 'Courses', learning: 'My learning', profile: 'Profile',
    greeting: 'Learn practical digital skills', intro: 'Explore the courses publicly listed by NITSCTI. Contact the institute to confirm fees, schedule and current availability.',
    explore: 'Explore courses', contact: 'Talk to an adviser', catalogTitle: 'Course catalogue', search: 'Search courses',
    allCourses: 'Publicly listed courses', noFees: 'Fees and batch schedules are not published here. Please confirm with NITSCTI.',
    ask: 'Ask about course', details: 'Course information', homeCourses: 'Find your next course',
    learningTitle: 'Your learning space', noLearning: 'Sign-in and course access are not connected yet. Once NITSCTI configures a secure student service, your enrolled courses and progress will appear here.',
    profileTitle: 'Student account', noAccount: 'Secure registration and sign-in are not configured in this local build. No password or personal data is collected.',
    localDemo: 'Local interest demo', saveInterest: 'Save a course interest on this device', saved: 'Demo interest saved in this browser only. It has not been sent to NITSCTI.',
    chooseCourse: 'Choose a course', empty: 'No courses match your search.', footer: 'Course details, fees and availability should be confirmed directly with NITSCTI.',
  },
  bn: {
    brand: 'NITSCTI', institute: 'কম্পিউটার ট্রেনিং ইনস্টিটিউট', demo: 'ডেমো মোড',
    home: 'হোম', courses: 'কোর্সসমূহ', learning: 'আমার শেখা', profile: 'প্রোফাইল',
    greeting: 'কাজের ডিজিটাল দক্ষতা শিখুন', intro: 'NITSCTI-এর প্রকাশিত কোর্সগুলো দেখুন। ফি, সময়সূচি ও বর্তমান ব্যাচের তথ্য সরাসরি প্রতিষ্ঠানে নিশ্চিত করুন।',
    explore: 'কোর্স দেখুন', contact: 'পরামর্শ নিন', catalogTitle: 'কোর্স তালিকা', search: 'কোর্স খুঁজুন',
    allCourses: 'প্রকাশিত কোর্সসমূহ', noFees: 'এখানে ফি বা ব্যাচের সময়সূচি প্রকাশিত নেই। NITSCTI-তে যোগাযোগ করে নিশ্চিত করুন।',
    ask: 'কোর্স সম্পর্কে জানুন', details: 'কোর্সের তথ্য', homeCourses: 'আপনার পরবর্তী কোর্স বেছে নিন',
    learningTitle: 'আপনার শেখার জায়গা', noLearning: 'এখনো নিরাপদ sign-in ও course access সংযুক্ত হয়নি। NITSCTI-এর secure student service চালু হলে ভর্তি কোর্স ও অগ্রগতি এখানে দেখা যাবে।',
    profileTitle: 'শিক্ষার্থী অ্যাকাউন্ট', noAccount: 'এই local build-এ নিরাপদ registration ও sign-in সেটআপ করা নেই। কোনো password বা ব্যক্তিগত তথ্য নেওয়া হচ্ছে না।',
    localDemo: 'স্থানীয় আগ্রহের ডেমো', saveInterest: 'এই ডিভাইসে কোর্সের আগ্রহ সংরক্ষণ করুন', saved: 'ডেমো আগ্রহ শুধু এই browser-এ সংরক্ষিত হয়েছে; NITSCTI-তে পাঠানো হয়নি।',
    chooseCourse: 'কোর্স নির্বাচন করুন', empty: 'এই অনুসন্ধানে কোনো কোর্স মেলেনি.', footer: 'কোর্সের বিস্তারিত, ফি ও প্রাপ্যতা সরাসরি NITSCTI-তে নিশ্চিত করুন।',
  },
} as const

function App() {
  const [locale, setLocale] = useState<Locale>(() => localStorage.getItem('nitscti-locale') === 'en' ? 'en' : 'bn')
  const [page, setPage] = useState<Page>('home')
  const [query, setQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(catalog[0]?.id ?? '')
  const [detailCourse, setDetailCourse] = useState<Course | null>(null)
  const [saved, setSaved] = useState(false)
  const t = copy[locale]
  const filteredCourses = useMemo(() => catalog.filter((course) => {
    const text = `${course.title} ${course.category} ${course.summary.en} ${course.summary.bn}`.toLocaleLowerCase()
    return text.includes(query.toLocaleLowerCase().trim())
  }), [query])

  function changeLocale(next: Locale) {
    setLocale(next)
    localStorage.setItem('nitscti-locale', next)
  }

  function saveDemoInterest() {
    localStorage.setItem('nitscti-demo-interest', selectedCourse)
    setSaved(true)
  }

  return (
    <div className="app-shell" lang={locale}>
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={() => setPage('home')} aria-label="NITSCTI home">
          <img src={brandLogo} alt={t.brand} />
        </a>
        <nav className="desktop-nav" aria-label={locale === 'bn' ? 'প্রধান নেভিগেশন' : 'Main navigation'}>
          {(['home', 'courses', 'learning', 'profile'] as Page[]).map((item) => <button key={item} className={page === item ? 'nav-link active' : 'nav-link'} onClick={() => setPage(item)}>{t[item]}</button>)}
        </nav>
        <div className="top-actions"><span className="demo-pill">{t.demo}</span><button className="language-toggle" onClick={() => changeLocale(locale === 'bn' ? 'en' : 'bn')} aria-label="Change language">{locale === 'bn' ? 'EN' : 'বাংলা'}</button></div>
      </header>

      <main>
        {page === 'home' && <>
          <section className="hero-panel">
            <div className="hero-copy"><span className="eyebrow">NITS COMPUTER TRAINING INSTITUTE</span><h1>{t.greeting}</h1><p>{t.intro}</p><div className="hero-actions"><button className="button primary" onClick={() => setPage('courses')}>{t.explore}<span aria-hidden="true"> →</span></button><a className="button secondary" href="tel:+8801567818036">{t.contact}</a></div></div>
            <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-center"><span>N</span><small>LEARN · PRACTICE · GROW</small></div><div className="art-chip chip-one">01 / Skills</div><div className="art-chip chip-two">02 / Future</div></div>
          </section>
          <section className="section-block"><div className="section-heading"><div><span className="eyebrow">LEARN WITH NITSCTI</span><h2>{t.homeCourses}</h2></div><button className="text-button" onClick={() => setPage('courses')}>{t.allCourses} →</button></div><CourseGrid courses={catalog.slice(0, 3)} locale={locale} onSelect={(course) => { setSelectedCourse(course.id); setPage('courses') }}/></section>
          <section className="notice-strip"><span className="notice-icon">i</span><p>{t.noFees}</p><a href="tel:+8801567818036">+880 1567-818036</a></section>
        </>}

        {page === 'courses' && <section className="section-block catalog-page"><div className="section-heading"><div><span className="eyebrow">NITSCTI</span><h1>{t.catalogTitle}</h1><p>{t.intro}</p></div></div><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search}/></label><p className="section-note">{t.noFees}</p>{filteredCourses.length ? <CourseGrid courses={filteredCourses} locale={locale} onSelect={setDetailCourse}/> : <div className="empty-state">{t.empty}</div>}
          {detailCourse && <div className="course-detail-panel" role="region" aria-live="polite"><button className="close-button" onClick={() => setDetailCourse(null)} aria-label={locale === 'bn' ? 'বন্ধ করুন' : 'Close'}>×</button><span className="course-category">{detailCourse.category}</span><h2>{detailCourse.title}</h2><p>{detailCourse.summary[locale]}</p><p>{t.noFees}</p><a className="button secondary" href="tel:+8801567818036">{t.ask}</a></div>}
          <div className="demo-card"><div><span className="eyebrow">{t.demo}</span><h2>{t.localDemo}</h2><p>{t.saveInterest}</p></div><div className="demo-actions"><label className="sr-only" htmlFor="interest-course">{t.chooseCourse}</label><select id="interest-course" value={selectedCourse} onChange={(event) => {setSelectedCourse(event.target.value); setSaved(false)}}>{catalog.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select><button className="button primary" onClick={saveDemoInterest}>{t.saveInterest}</button>{saved && <p role="status" className="success-message">{t.saved}</p>}</div></div>
        </section>}

        {page === 'learning' && <section className="section-block narrow-page"><span className="eyebrow">STUDENT SPACE</span><h1>{t.learningTitle}</h1><div className="empty-state"><span className="empty-icon">◷</span><h2>{locale === 'bn' ? 'এখনো কোনো course যুক্ত নেই' : 'No courses yet'}</h2><p>{t.noLearning}</p><button className="button primary" onClick={() => setPage('courses')}>{t.explore}</button></div></section>}

        {page === 'profile' && <section className="section-block narrow-page"><span className="eyebrow">STUDENT ACCOUNT</span><h1>{t.profileTitle}</h1><div className="account-card"><div className="avatar-placeholder">N</div><div><h2>{locale === 'bn' ? 'অ্যাকাউন্ট সেবা প্রস্তুত নয়' : 'Account service unavailable'}</h2><p>{t.noAccount}</p></div><span className="status-label">{locale === 'bn' ? 'সেটআপ প্রয়োজন' : 'Setup required'}</span></div><div className="plain-card"><h2>{locale === 'bn' ? 'শিক্ষার্থী সহায়তা' : 'Student support'}</h2><p>{locale === 'bn' ? 'ভর্তি ও কোর্স সম্পর্কে নিশ্চিত তথ্যের জন্য সরাসরি যোগাযোগ করুন।' : 'Contact the institute for verified admission and course information.'}</p><a className="button secondary" href="tel:+8801567818036">+880 1567-818036</a></div></section>}
      </main>

      <footer className="app-footer"><span>© {currentYear} NITSCTI</span><span>{t.footer}</span><a href="mailto:info@nitscti.com">info@nitscti.com</a></footer>
      <nav className="mobile-nav" aria-label={locale === 'bn' ? 'মোবাইল নেভিগেশন' : 'Mobile navigation'}>{(['home', 'courses', 'learning', 'profile'] as Page[]).map((item, i) => <button key={item} className={page === item ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={() => setPage(item)}><span aria-hidden="true">{['⌂', '▤', '◷', '○'][i]}</span>{t[item]}</button>)}</nav>
    </div>
  )
}

function CourseGrid({ courses, locale, onSelect }: { courses: readonly Course[]; locale: Locale; onSelect: (course: Course) => void }) {
  return <div className="course-grid">{courses.map((course) => <article className="course-card" key={course.id}><img src={courseCovers[course.id]} alt="" loading="lazy"/><div className="course-card-body"><span className="course-category">{course.category}</span><h3>{course.title}</h3><p>{course.summary[locale]}</p><button className="text-button" onClick={() => onSelect(course)}>{copy[locale].details} <span aria-hidden="true">→</span></button></div></article>)}</div>
}

export default App
