/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String} plural form for word
 */

export default function pluralize(
  count: number,
  words: [string, string, string],
  withCount?: boolean
) {
  var cases = [2, 0, 1, 1, 1, 2];
  const pluralizedText =
    "" +
    words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  return withCount ? `${count} ${pluralizedText}` : pluralizedText;
}
