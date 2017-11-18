import * as React from "react";
const styles = require("./blog-item.css");

export const SampleBlog: React.SFC = () => (
  <div className={styles.container}>
    <h1 className={styles.h1}>Introduction</h1>
    <p className={styles.p}>
      If you are developing something which is slightly more complicated than
      ‘hello world’ you should have multiple environments like: develop,
      staging, production. Depending on the environment you would use different
      resources (database, api, etc). These resources would be then injected via
      environmental variables. It’s a fairly common approach on most of
      today&#39;s cloud platforms. It’s also fairly easy to grab env variables
      on a server side, but how do you get them in you clientside JS?
    </p>
    <h1 className={styles.h2}>Sub section</h1>
    <p className={styles.p}>
      I will assume that you know why it’s a good idea store your configuration
      in env variables. If you don’t I recommend to read 12 factor app manifesto{" "}
      <a href="http://12factor.net/config">http://12factor.net/config</a>{" "}
      hopefully it has enough infomration to convince you. So the solution we
      will be striving to is to have all configuration for both server and
      client in environmental variables.
    </p>
    <h1 className={styles.h2}>Sub section two</h1>
  </div>
);
