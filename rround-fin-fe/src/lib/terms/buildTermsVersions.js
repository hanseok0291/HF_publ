/** @typedef {{ id: string; label: string; html: string }} TermsVersion */

/**
 * 퍼블·개발 연동용 약관 버전 목록 생성
 * @param {string} html 기본(최신) 약관 HTML
 * @param {Array<{ id: string; label: string; html?: string }>} [entries]
 * @returns {TermsVersion[]}
 */
export function buildTermsVersions(html, entries) {
  const defaults = [
    { id: '2024-04-03', label: '2024. 04. 03' },
    { id: '2023-12-01', label: '2023. 12. 01' },
  ];

  const list = entries?.length ? entries : defaults;

  return list.map((entry) => ({
    id: entry.id,
    label: entry.label,
    html: entry.html ?? html,
  }));
}
