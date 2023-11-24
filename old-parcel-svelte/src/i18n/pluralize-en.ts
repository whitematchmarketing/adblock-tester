export function pluralizeEn(count: number, words: [string, string], withCount?: boolean) {
  const pluralizedText = count === 1 ? words[0] : words[1];
  return withCount ? `${count} ${pluralizedText}` : pluralizedText;
}
