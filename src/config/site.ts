// This module runs at build time; declare only the Node environment values it reads.
declare const process: { env: { SITE_URL?: string; SITE_BASE?: string } };

interface SiteConfig {
  title: string;
  displayName: string;
  description: string;
  author?: string;
  url: string;
  base: string;
  githubUrl?: string;
  language: string;
  hero: {
    heading: string;
    introduction: string;
  };
  navigation: ReadonlyArray<{ label: string; path: string }>;
  socialLinks: ReadonlyArray<{ label: string; url: string }>;
  learning: ReadonlyArray<{ name: string; focus: string }>;
  interests: ReadonlyArray<string>;
}

/** User Pages deployment defaults; environment variables can override the URL and base. */
export const site: SiteConfig = {
  title: '주니어 개발자 오신희 포트폴리오',
  displayName: '개발 기록',
  description: '임베디드와 로보틱스를 공부하며 프로젝트, 실험, 문제 해결 과정을 기록합니다.',
  author: '오신희',
  url: process.env.SITE_URL ?? 'https://chipmunk-git.github.io',
  base: process.env.SITE_BASE ?? '/',
  githubUrl: 'https://github.com/chipmunk-git',
  language: 'ko',
  hero: {
    heading: '주니어 개발자 오신희 포트폴리오',
    introduction: '안녕하세요. 개발자로서의 방향을 끊임없이 고민하고 있는 오신희입니다.',
  },
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects/' },
    { label: 'Blog', path: '/blog/' },
  ],
  socialLinks: [],
  learning: [
    { name: 'STM32', focus: 'GPIO · EXTI · Timer · PWM · ADC' },
    { name: 'Embedded C/C++', focus: '하드웨어와 연결되는 코드' },
    { name: 'ROS2', focus: '로봇의 통신과 제어' },
    { name: 'Computer Vision', focus: 'OpenCV · YOLO' },
  ],
  interests: ['Embedded Systems', 'Robotics', 'Computer Vision', 'Physical AI'],
};
