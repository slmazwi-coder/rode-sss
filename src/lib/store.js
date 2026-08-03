// ── Storage helpers ────────────────────────────────────────────────────────
const get = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`rode_${key}`)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

const set = (key, value) => {
  try { localStorage.setItem(`rode_${key}`, JSON.stringify(value)) } catch {}
}

// ── School constants ────────────────────────────────────────────────────────
export const SCHOOL = {
  name:       'Rode Senior Secondary School',
  short:      'Rode SSS',
  motto:      'Rise and Shine',
  emis:       '',
  address:    'Rode, Eastern Cape, South Africa',
  postal:     '',
  phone:      '078 640 3623',
  cell:       '083 964 1455',
  email:      'coming soon',
  province:   'Eastern Cape',
  district:   '',
  circuit:    '',
  sector:     'Public',
  grades:     'Grade 8 – Grade 12',
  hoursWeek:  '07:30 – 15:30',
  hoursFri:   '07:30 – 13:30',
  coords:     { lat: -30.8, lng: 28.9 },
  facebook:   '#',
  tiktok:     '#',
}

// ── Default data ─────────────────────────────────────────────────────────
const DEFAULT_NEWS = [
  {
    id: '1',
    title: '2027 Admissions Now Open',
    date: '2026-08-01',
    excerpt: 'Applications for Grade 8–11 admission for the 2027 academic year are now open. Applications are hand-delivered at Rode SS.',
    body: 'Rode Senior Secondary School is accepting applications for the 2027 academic year. Grades available: Grade 8 (14 years & below), Grade 9 (15 years & below), Grade 10 (16 years & below), and Grade 11 (17 years & below). Requirements: learner’s Term 1 report, learner’s ID or birth certificate, parent ID (all copies), and the child’s medical record if any. Hostel accommodation is available for girls only. Applications must be hand-delivered at Rode SS. For more information contact 078 640 3623 or 083 964 1455.',
    image: '/assets/campus.jpg',
    category: 'Admissions',
  },
  {
    id: '2',
    title: 'Career Day & Talent Show',
    date: '2026-05-29',
    excerpt: 'Discover your path, show your talent, and shape your future at our Career Day & Talent Show on Friday 29 May 2026.',
    body: 'Rode High School invites learners to the Career Day & Talent Show on Friday 29 May 2026. Admission is R2 when wearing your dream profession and R5 when not. Explore careers, showcase your talents through singing, dancing, performing or presenting, and build connections with professionals. Theme: Dream It. Prepare It. Achieve It.',
    image: '/assets/matric-class.jpg',
    category: 'Events',
  },
  {
    id: '3',
    title: 'Parents Meeting – Grade 12',
    date: '2025-08-05',
    excerpt: 'A parents meeting for Grade 12 will be held at Rode SSS on 05 August 2025 at 10:00 am.',
    body: 'Parents and guardians of Grade 12 learners are invited to Rode SSS on 05 August 2025 at 10:00 am. Agenda: Grade 12 June 2025 Examination Analysis, Discipline for Grade 12, Grade 12 Camp details, and the Grade 12 Policy review with a Q&A session. Message from the Principal, Mr Nciweni Z.',
    image: '/assets/ceremony.jpg',
    category: 'Notices',
  },
]

const DEFAULT_ABOUT = {
  history: [
    'Rode Senior Secondary School is a public secondary school serving learners from Grade 8 to Grade 12 in the Eastern Cape, South Africa.',
    'The school offers three academic streams — General, Science, and Commerce — preparing learners for the National Senior Certificate (NSC) examinations and further education opportunities.',
    'With our motto "Rise and Shine", Rode SSS is committed to academic excellence, community values, and the holistic development of every learner who walks through our doors.',
    'Parents and guardians are encouraged to engage actively with the school through meetings, events, and ongoing learner support. Together we build a culture of achievement and pride.',
  ],
  principal: {
    name: 'Mr Nciweni Z',
    title: 'Principal',
    message: [
      'Welcome to Rode Senior Secondary School. We believe every learner carries within them the capacity for greatness. Our role is to unlock it — through discipline, love, and unwavering belief in their potential.',
      'At Rode SSS, we value respect, responsibility, and pride in our school community. Our motto — Rise and Shine — inspires us to rise up each day and pursue progress in everything we do.',
    ],
  },
}

const DEFAULT_RESULTS = {
  '2025': { passRate: 0, bachelors: 0, bachelorRate: 0, distinctions: 0, wrote: 0, failed: 0, diplomas: 0, higher: 0, subjects: [] },
  '2024': { passRate: 0, bachelors: 0, bachelorRate: 0, distinctions: 0, wrote: 0, failed: 0, diplomas: 0, higher: 0, subjects: [] },
  '2023': { passRate: 0, bachelors: 0, bachelorRate: 0, distinctions: 0, wrote: 0, failed: 0, diplomas: 0, higher: 0, subjects: [] },
}

const DEFAULT_ACTIVITIES = [
  { id: '1', name: 'Soccer',    category: 'Sport',    description: 'Boys and girls teams competing at district and regional level.',      image: '' },
  { id: '2', name: 'Netball',   category: 'Sport',    description: 'Competitive teams across all age groups.',                           image: '' },
  { id: '3', name: 'Athletics', category: 'Sport',    description: 'Track and field development and inter-district competition.',         image: '' },
  { id: '4', name: 'Debating',  category: 'Academic', description: 'Building critical thinking and public speaking skills.',              image: '' },
  { id: '5', name: 'Spelling Bee', category: 'Academic', description: 'Language enrichment and vocabulary building.',                    image: '' },
  { id: '6', name: 'Choir',     category: 'Culture',  description: 'Celebrating our heritage through choral music.',                     image: '' },
  { id: '7', name: 'Drama',     category: 'Culture',  description: 'Performances celebrating culture, language, and community.',         image: '' },
]

const DEFAULT_HALL = [
  { id: '1', name: 'Top Achiever', title: 'Best Matric Learner', year: '2025', desc: '', image: '' },
  { id: '2', name: 'Top Achiever', title: '2nd Best Matric Learner', year: '2025', desc: '', image: '' },
  { id: '3', name: 'Top Achiever', title: '3rd Best Matric Learner', year: '2025', desc: '', image: '' },
]

const DEFAULT_CONTACT = {
  address: SCHOOL.address,
  postal:  SCHOOL.postal,
  phone:   SCHOOL.phone,
  cell:    SCHOOL.cell,
  email:   SCHOOL.email,
  monThu:  '07:30 – 15:30',
  friday:  '07:30 – 13:30',
  hoursWeek: SCHOOL.hoursWeek,
  hoursFri:  SCHOOL.hoursFri,
}

// ── Getters / Setters ───────────────────────────────────────────────────────
export const getNews       = ()      => get('news',       DEFAULT_NEWS)
export const setNews       = (v)     => set('news',       v)
export const getAbout      = ()      => get('about',      DEFAULT_ABOUT)
export const setAbout      = (v)     => set('about',      v)
export const getActivities = ()      => get('activities', DEFAULT_ACTIVITIES)
export const setActivities = (v)     => set('activities', v)
export const getHallOfFame = ()      => get('hall',       DEFAULT_HALL)
export const setHallOfFame = (v)     => set('hall',       v)
export const getContact    = ()      => get('contact',    DEFAULT_CONTACT)
export const setContact    = (v)     => set('contact',    v)
export const getDocuments  = ()      => get('documents',  [])
export const setDocuments  = (v)     => set('documents',  v)
export const getApplications = ()   => get('applications', [])
export const setApplications = (v)  => set('applications', v)
export const getResultsByYear = (y)  => get(`results_${y}`, DEFAULT_RESULTS[y] || null)
export const setResultsByYear = (y, v) => set(`results_${y}`, v)
export const getAchievers = (y)      => get(`achievers_${y}`, [])
export const setAchievers = (y, v)   => set(`achievers_${y}`, v)

// ── Auth ────────────────────────────────────────────────────────────
export const isAuthenticated = () => localStorage.getItem('rode_auth') === 'true'
export const login  = (pw) => { if (pw === 'admin2027') { localStorage.setItem('rode_auth', 'true'); return true } return false }
export const logout = ()   => localStorage.removeItem('rode_auth')

// ── IDs ────────────────────────────────────────────────────────────
export const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

export const generateStudentNumber = (year) => {
  const key = `rode_ctr_${year}`
  const n = Number(localStorage.getItem(key) || 0) + 1
  localStorage.setItem(key, String(n))
  return `${year}-${String(n).padStart(6, '0')}`
}

export const calcAvg = (marks = []) => {
  if (!marks.length) return 0
  return Math.round((marks.reduce((s, m) => s + (m.mark || 0), 0) / marks.length) * 10) / 10
}
