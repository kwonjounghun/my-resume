/**
 * Date 객체를 YYYY. MM. DD 형식의 문자열로 변환합니다.
 * @param date - 변환할 Date 객체 또는 ISO 문자열
 * @returns YYYY. MM. DD 형식의 문자열
 */
export function formatDateToKorean(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}

/**
 * YYYY. MM. DD 형식의 문자열을 Date 객체로 변환합니다.
 * @param dateString - YYYY. MM. DD 형식의 문자열
 * @returns Date 객체
 */
export function parseKoreanDate(dateString: string): Date {
  const [year, month, day] = dateString.split('.').map(s => s.trim()).map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 * @param date - 변환할 Date 객체 또는 ISO 문자열
 * @returns YYYY-MM-DD 형식의 문자열
 */
export function formatDateToInput(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
} 