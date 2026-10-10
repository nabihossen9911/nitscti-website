import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type Locale = 'bn' | 'en';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  interests: string[];
  toggleInterest: (id: string) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>('bn');
  const [interests, setInterests] = useState<string[]>([]);
  const value = useMemo(() => ({
    locale,
    setLocale,
    interests,
    toggleInterest: (id: string) => setInterests((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
  }), [locale, interests]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useStudentApp() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useStudentApp must be used inside LocaleProvider');
  return context;
}
