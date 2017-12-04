import * as React from "react";
const styles = require("../blog-item.css");
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import js from "react-syntax-highlighter/languages/hljs/javascript";
import tomorrowNight from "react-syntax-highlighter/styles/hljs/tomorrow-night";

registerLanguage("javascript", js);

const AngularEnvVar: React.SFC = () => (
  <div className={styles.container}>
    <div className={styles.blogContainer}>
      <h1 className={styles.h1}>
        A better way to inject environmental variables in Angular
      </h1>
      <h1 className={styles.h2}>Problem</h1>
      <p className={styles.p}>
        If you are developing something which is slightly more complicated than
        ‘hello world’ you should have multiple environments like:{" "}
        <b className={styles.b}>develop</b>, <b className={styles.b}>staging</b>,{" "}
        <b className={styles.b}>production</b>. Depending on the environment you
        would use different resources (database, api, etc). These resources
        would be then injected via environmental variables. It’s a fairly common
        approach on most of today&#39;s cloud platforms. It’s also fairly easy
        to grab env variables on a server side, but how do you get them in you
        clientside JS?
      </p>
      <p className={styles.p}>
        Those env variables are so close and so far at the same time..
      </p>
      <p className={styles.p}>
        <img
          className={styles.img}
          src="https://cdn-images-1.medium.com/max/2000/1*8lYq6crpl26UkaePeUtpyQ.gif"
        />
      </p>
      <h1 className={styles.h2}>Background</h1>
      <p className={styles.p}>
        I will assume that you know why it’s a good idea store your
        configuration in env variables. If you don’t I recommend to read{" "}
        <a className={styles.a} href="http://12factor.net/config">
          12 factor app manifesto
        </a>{" "}
        hopefully it has enough information to convince you.
      </p>
      <p className={styles.p}>
        So the solution we will be striving to is to have all configuration for
        both server and client in environmental variables.
      </p>
      <h1 className={styles.h2}>Possible Solutions</h1>
      <p className={styles.p}>
        I have seen people achieving it in different ways, I will go first
        through all these solution and will explain what is the problem with
        each of them.
      </p>
      <h1 className={styles.h3}>Option 1: Embedding config in you client</h1>
      <p className={styles.p}>
        This is a simplest solution. You just hardcode your api endpoints and
        other information into your angular app. To get some separation of
        concerns you could even create a constant service, like below:
      </p>
      <SyntaxHighlighter language="js" style={tomorrowNight}>
        {
          "angular\n  .module('yourApp')\n  .constant('apiEndpoint', 'https://api.test.com/messages')\n  .constant('apiEndpointKey', '123456789987654321');"
        }
      </SyntaxHighlighter>
      <p className={styles.p}>
        <b className={styles.b}>Advantages</b>
      </p>
      <ul>
        <li className={styles.li}>Simple</li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Disadvantages</b>
      </p>
      <ul>
        <li className={styles.li}>
          You have leaked potentially sensitive info into your repo
        </li>
        <li className={styles.li}>
          When testing other environments you have to manually comment out
          current value and replace them with test ones.
        </li>
        <li className={styles.li}>
          You can’t support multiple environments with this setup
        </li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Summary</b>
      </p>
      <p className={styles.p}>
        Not a scalable solution, only use for ‘toy code’, never use it for
        production systems. Unless you want to be that guy who screws up
        production!
      </p>
      <p className={styles.p}>
        <img
          className={styles.img}
          src="https://cdn-images-1.medium.com/max/2000/1*PQVT5IB3k0Xsh8qZTi445A.gif"
        />
      </p>
      <h1 className={styles.h3}>
        Option 2: Get configuration values from the server via REST call
      </h1>
      <p className={styles.p}>
        You create and endpoint on your server for example:
        <em>
          <a className={styles.a} href="https://www.mywebsite.com/config">
            https://www.mywebsite.com/config
          </a>{" "}
        </em>which returns you a configuration for your site and when your app
        loads, first thing you do is make a GET reequest to
        <em>/config</em>
      </p>
      <p className={styles.p}>
        This could work because your server has access to env variables and
        could return you different config set based on your env.
      </p>
      <p className={styles.p}>
        You server would probably have something like this:
      </p>
      <SyntaxHighlighter language="js" style={tomorrowNight}>
        {
          "var env = process.env.NODE_ENV || 'develop';\n\napp.get('/config', function(req, res) {\n  if (env === 'develop') {\n    res.send(developConfig);\n  } else if (env === 'staging') {\n    res.send(stagingConfig);\n  } else if (env === 'prod') {\n    res.send(prodConfig);\n  }\n});"
        }
      </SyntaxHighlighter>
      <p className={styles.p}>
        On your client side you would request it as soon as your app start. So
        your angular code would be something like:
      </p>
      <SyntaxHighlighter language="js" style={tomorrowNight}>
        {
          "(function() {\n  'use strict';\n\n  angular.module('myApp').controller('MainController', MainController);\n\n  function MainController($http) {\n    $http\n      .get('/config')\n      .then(saveConfig)\n      .catch(handleError);\n  }\n})();"
        }
      </SyntaxHighlighter>
      <p className={styles.p}>
        <b className={styles.b}>Advantages</b>
      </p>
      <ul>
        <li className={styles.li}>You can truly access server env variables</li>
        <li className={styles.li}>It’s fairly simple</li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Disadvantages</b>
      </p>
      <ul>
        <li className={styles.li}>
          Your app is delayed by at least as much the api call to get the
          configuration value.
        </li>
        <li className={styles.li}>
          Another issue I have tried to highlight here is hardcoding number of
          environments. This will limit you to only 3 envs and you will need to
          do a code change when you need a new one, not good!
        </li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Summary</b>
      </p>
      <p className={styles.p}>
        Main disadvantage is that your app is delayed and these days users are
        very fussy about their load time, so let’s check some solutions which
        avoid that.
      </p>
      <h1 className={styles.h3}>
        Option 3: Let your CI/CD inject correct configuration settings
      </h1>
      <p className={styles.p}>
        Using this approach CI before doing a deployment will generate a
        configuration dynamically based on where you about to deploy to.
      </p>
      <p className={styles.p}>
        You could you use a gulp task for that, which would look something like
        this:
      </p>
      <SyntaxHighlighter language="js" style={tomorrowNight}>
        {
          "var gulp = require('gulp');\nvar gulpNgConfig = require('gulp-ng-config');\n\ngulp.task('config', function() {\n  gulp\n    .src('config.json')\n    .pipe(gulpNgConfig('myApp'))\n    .pipe(gulp.dest('app/scripts'));\n});"
        }
      </SyntaxHighlighter>
      <p className={styles.p}>
        Now the question is where does CI gets those config values which it
        injects into angular config. There are 2 main options:
      </p>
      <ol>
        <li className={styles.li}>
          <p className={styles.p}>
            Have a set of configuration files which are checked in into your
            repo and can be accessed by CI during deployment. This brings the
            same problems as solutions 1.
          </p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>
            Inject those values into environmental variables of your CI, which
            is arguably a better solution. The new problem you have is managing
            env variables both on your server and CI.
          </p>
        </li>
      </ol>
      <p className={styles.p}>
        <b className={styles.b}>Advantage</b>
      </p>
      <ul>
        <li className={styles.li}>
          There is no need to wait for your config to be loaded.
        </li>
        <li className={styles.li}>
          You don’t have to have your env vars in your repo.
        </li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Disadvantage</b>
      </p>
      <ul>
        <li className={styles.li}>
          You now have your env variables in 2 places CI and your deployment
          server. Also it limits you in a way that now you always have to go via
          CI to do a deployment.
        </li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Summary</b>
      </p>
      <p className={styles.p}>
        This approach only partially solves the problem and pushes some of it to
        CI.
      </p>
      <h1 className={styles.h3}>
        Option 4: Generate your angular configuration on the server dynamically
      </h1>
      <p className={styles.p}>
        You have probably heard of server side template rendering, it is a way
        of dynamically injecting data into your html markup, pretty old school
        stuff. So how about if we take similar approach and apply it for our
        Angular configuration service (which is just js file). So as{" "}
        <em>templating engine </em>I am going to use{" "}
        <a
          className={styles.a}
          href="https://github.com/ajwhite/gulp-ng-config"
        >
          *gulp-ng-config
        </a>* which does pretty much what we want - it generates key value
        angular constant service from a JSON file, you can also override values
        from JSON file with env variables.
      </p>
      <p className={styles.p}>
        So here is how the process would work when you deploy your code to a
        server:
      </p>
      <ol>
        <li className={styles.li}>
          <p className={styles.p}>
            Server will generate angular const service with key values based on
            your env variables.
          </p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>It will kick of node server</p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>
            Your index.html will load constant service and use those variables
            whenever you load your page for the first time
          </p>
        </li>
      </ol>
      <p className={styles.p}>
        I have created a sample angular/node project to illustrate how all bits
        fit together, you can check it on my{" "}
        <a
          className={styles.a}
          href="https://github.com/kudresov/angular-config-vars"
        >
          GitHub
        </a>.
      </p>
      <p className={styles.p}>
        <b className={styles.b}>Advantage</b>
      </p>
      <ul>
        <li className={styles.li}>
          No sensitive info has leaked into your repo and you can open source it
          any day
        </li>
        <li className={styles.li}>
          All sensitive information is injected into the servers and you don’t
          need to worry about managing it in multiple places
        </li>
        <li className={styles.li}>It’s a fairly simple solution</li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Disadvantages</b>
      </p>
      <ul>
        <li className={styles.li}>
          You have to include <em>gulp</em> and <em>gulp-ng-config </em>in
          dependencies rather than devDependencies (which I don’t personally
          think is a problem).
        </li>
      </ul>
      <p className={styles.p}>
        <b className={styles.b}>Summary</b>
      </p>
      <p className={styles.p}>
        It seems to be the cleanest approach at the moment.
      </p>
      <p className={styles.p}>
        Also when you move all you client and server configurations to env
        variables you get access to this benefits:
      </p>
      <ol>
        <li className={styles.li}>
          <p className={styles.p}>
            If a developer wants a separate environment to test his code, it
            should be as easy as cloning existing one and changing endpoints to
            other servers (if required)
          </p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>
            You can fairly easily migrate between hosting platforms as you don’t
            rely on a complex setup and just need a bunch of environmental
            variables to be injected into your servers.
          </p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>
            You can have fine grained control of who sees production
            configuration.
          </p>
        </li>
        <li className={styles.li}>
          <p className={styles.p}>
            You can change your endpoints on your servers without any code
            change
          </p>
        </li>
      </ol>
      <h1 className={styles.h2}>Summary</h1>
      <p className={styles.p}>
        I hope this article will help to avoid a lot of pain in the deployment
        process and maybe even give you some dev superpowers!
        <img
          className={styles.img}
          src="https://cdn-images-1.medium.com/max/2000/1*SnsghO5h6Jqs0r96qewxBQ.gif"
        />
      </p>
    </div>
  </div>
);

export default AngularEnvVar;
