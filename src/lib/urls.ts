import { site } from '../config/site';

/** Use for site-relative routes and public assets; src/assets uses Astro's pipeline. */
export function withBase(path: string = '/'): string {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error(`사이트 내부 경로는 /로 시작해야 합니다: ${path}`);
  }

  const base = `/${site.base.split('/').filter(Boolean).join('/')}`;
  return `${base === '/' ? '' : base}${path}`;
}

export function absoluteUrl(path: string = '/'): string {
  return new URL(withBase(path), site.url).href;
}
