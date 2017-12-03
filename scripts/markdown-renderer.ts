import * as marked from 'marked';
const renderer = new marked.Renderer();

renderer.heading = (text, level) =>
  `<h1 className={styles.h${level}}>${text}</h1>`;

renderer.paragraph = text => `<p className={styles.p}>${text}</p>`;
renderer.code = (code, lang) =>
  `<SyntaxHighlighter language='${
    lang
  }' style={tomorrowNight}>{${JSON.stringify(code)}}</SyntaxHighlighter>`;

renderer.image = (href: string) => `<img src="${href}"/>`;

export const toMarkdown = (text: string) => marked(text, { renderer });
