import * as marked from 'marked';
const renderer = new marked.Renderer();

renderer.heading = (text, level) =>
  `<h1 className={styles.h${level}}>${text}</h1>`;

renderer.paragraph = text => `<p className={styles.p}>${text}</p>`;
renderer.code = (code, lang) =>
  `<SyntaxHighlighter language='${
    lang
  }' style={codeTheme} className={styles.code}>{${JSON.stringify(
    code
  )}}</SyntaxHighlighter>`;

renderer.image = (href: string) =>
  `<img className={styles.img} src="${href}"/>`;

renderer.link = (href: string, title: string, text: string) =>
  `<a className={styles.a} href="${href}">${text}</a>`;

renderer.listitem = (text: string) => `<li className={styles.li}>${text}</li>`;

renderer.strong = text => `<b className={styles.b}>${text}</b>`;

export const toMarkdown = (text: string) => marked(text, { renderer });
