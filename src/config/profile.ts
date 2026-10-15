import type { ImageMetadata } from 'astro';

interface ProfileEntry {
  title: string;
  organization?: string;
  period?: string;
  description?: string;
}

interface SkillEntry extends ProfileEntry {
  category: string;
}

interface ProfileConfig {
  photo?: { src: ImageMetadata; alt: string };
  birthDate?: string;
  email?: string;
  background: ReadonlyArray<string>;
  education: ReadonlyArray<ProfileEntry>;
  certifications: ReadonlyArray<ProfileEntry>;
  training: ReadonlyArray<ProfileEntry>;
  military: ReadonlyArray<ProfileEntry>;
  skills: ReadonlyArray<SkillEntry>;
  activities: ReadonlyArray<ProfileEntry>;
}

/** 확인된 본인 정보만 입력합니다. 빈 항목은 Home에 '입력 예정'으로 표시합니다. */
export const profile: ProfileConfig = {
  photo: undefined,
  birthDate: '1994.09.30',
  email: 'osh4589@naver.com',
  background: [
    '소통을 중요하게 생각하며, 항상 배우려는 자세로 임합니다.',
    '작은 기능도 어떻게 동작하는지 이해하려고 노력합니다.',
    '코드로 문제를 해결하고, 의미 있는 기능을 구현하는 데 보람을 느낍니다.',
  ],
  education: [
    {
      title: '생명과학부 생명공학전공',
      organization: '경북대학교',
      period: '2013.03 – 2019.02',
    },
  ],
  certifications: [
    {
      title: '정보처리기사',
      organization: '한국산업인력공단',
      period: '2020.08',
    },
    {
      title: '초경량비행장치 조종자 증명 (무인멀티콥터 1종)',
      organization: '한국교통안전공단',
      period: '2026.04',
    },
    {
      title: '1종보통운전면허',
      organization: '경찰청(운전면허시험관리단)',
      period: '2013.02',
    },
  ],
  training: [
    {
      title: '로보테크 AI 자율주행 로봇 개발자 과정',
      organization: '미래융합교육원',
      period: '2026.07 – 2027.01',
    },
  ],
  military: [
    { title: '육군 병장 만기전역', period: '2014.07 – 2016.04' },
  ],
  // Skills의 description에는 직접 사용·구현·테스트한 경험을 적습니다.
  // 공부 중인 주제는 site.ts의 learning에서 별도로 관리합니다.
  skills: [
    { title: 'ROS2', category: '임베디드·로보틱스' },
    {
      title: 'Arduino',
      category: '임베디드·로보틱스',
      description: 'Smart Parking에서 입차·주차·출차 흐름을 설계하고, 보드별 장치 식별자(DEVICE_ID) 설정과 펌웨어 업로드로 Arduino 5대를 단일 서버에 연결하는 통합 작업에 참여했습니다. 서보모터 제어 신호 안정화 방법도 검토했습니다.',
    },
    { title: 'Python', category: '프로그래밍 언어' },
    { title: 'Java', category: '프로그래밍 언어' },
    { title: 'JavaScript', category: '프로그래밍 언어' },
    { title: 'PyQt', category: '라이브러리·실행환경' },
    { title: 'ReactJS', category: '라이브러리·실행환경' },
    { title: 'Node.js', category: '라이브러리·실행환경' },
    { title: 'MySQL', category: '데이터베이스·캐시' },
    { title: 'MariaDB', category: '데이터베이스·캐시' },
    { title: 'PostgreSQL', category: '데이터베이스·캐시' },
    { title: 'Redis', category: '데이터베이스·캐시' },
    { title: 'Ubuntu', category: '개발환경·도구' },
    { title: 'Git', category: '개발환경·도구' },
    { title: '풀스택', category: '개발 영역·개념' },
    { title: 'API', category: '개발 영역·개념' },
  ],
  activities: [],
};
