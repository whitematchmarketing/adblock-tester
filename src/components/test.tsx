export const Test = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>console.log(1)</script>
`,
      }}
    />
  );
};
