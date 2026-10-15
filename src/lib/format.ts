export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).format(date);
}

export function readingMinutes(body: string = ''): number {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').replace(/\[[^\]]*\]\([^)]*\)/g, '');
  const korean = (text.match(/[가-힣]/g) ?? []).length;
  const words = (text.replace(/[가-힣]/g, ' ').match(/[\p{L}\p{N}]+/gu) ?? []).length;
  return Math.max(1, Math.ceil(korean / 500 + words / 200));
}
