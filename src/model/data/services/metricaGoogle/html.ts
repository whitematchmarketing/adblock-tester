export const getHtml = (id: string) => `
<script>
  (function(i, s, o, g, r) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  ga("create", "${id}", "auto");
  ga("send", "pageview");
</script>
`;
