export type Locale = 'bn' | 'en';

export type PublishedCourse = {
  id: string;
  title: string;
  category: string;
  summary: Record<Locale, string>;
  image: string;
  detailPath: string | null;
  fee: number | null;
  duration: string | null;
};

export type AdmissionStatus = 'submitted' | 'under_review' | 'approved' | 'rejected';
export type PaymentStatus = 'unverified' | 'pending' | 'verified' | 'failed' | 'refunded';

export type StudentApplication = {
  id: string;
  course_id: string;
  state: AdmissionStatus;
  payment_state: PaymentStatus;
  submitted_at: string;
};
