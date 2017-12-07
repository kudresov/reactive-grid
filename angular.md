
# A better way to inject environmental variables in Angular

Problem

If you are developing something which is slightly more complicated than ‘hello world’ you should have multiple environments like: **develop**, **staging**, **production**. Depending on the environment you would use different resources (database, api, etc). These resources would be then injected via environmental variables. It’s a fairly common approach on most of today's cloud platforms. It’s also fairly easy to grab env variables on a server side, but how do you get them in you clientside JS?

Those env variables are so close and so far at the same time..

![](https://cdn-images-1.medium.com/max/2000/1*8lYq6crpl26UkaePeUtpyQ.gif)

## Background

I will assume that you know why it’s a good idea store your configuration in env variables. If you don’t I recommend to read 12 factor app manifesto [http://12factor.net/config](http://12factor.net/config) hopefully it has enough infomration to convince you.

So the solution we will be striving to is to have all configuration for both server and client in environmental variables.

## Possible Solutions

I have seen people achieving it in different ways, I will go first through all these solution and will explain what is the problem with each of them.

### Option 1: Embedding config in you client

This is a simplest solution. You just hardcode your api endpoints and other information into your angular app. To get some separation of concerns you could even create a constant service, like below:

<iframe src="https://medium.com/media/38584663fdf9b3314a7073a4955510f3" frameborder=0></iframe>

**Advantages**

* Simple

**Disadvantages**

* You have leaked potentially sensitive info into your repo

* When testing other environments you have to manually comment out current value and replace them with test ones.

* You can’t support multiple environments with this setup

**Summary**

Not a scalable solution, only use for ‘toy code’, never use it for production systems. Unless you want to be that guy who screws up production!

![](https://cdn-images-1.medium.com/max/2000/1*PQVT5IB3k0Xsh8qZTi445A.gif)

### Option 2: Get configuration values from the server via REST call

You create and endpoint on your server for example: *https://www.mywebsite.com/config *which returns you a configuration for your site and when your app loads, first thing you do is make a GET reequest to */config*

This could work because your server has access to env variables and could return you different config set based on your env.

You server would probably have something like this:

<iframe src="https://medium.com/media/6a15b3372c0fab8ea5158d43d10df92d" frameborder=0></iframe>

On your client side you would request it as soon as your app start. So your angular code would be something like:

<iframe src="https://medium.com/media/38d148e2aa5b110ffa99fca42e9d479c" frameborder=0></iframe>

**Advantages**

* You can truly access server env variables

* It’s fairly simple

**Disadvantages**

* Your app is delayed by at least as much the api call to get the configuration value.

* Another issue I have tried to highlight here is hardcoding number of environments. This will limit you to only 3 envs and you will need to do a code change when you need a new one, not good!

**Summary**

Main disadvantage is that your app is delayed and these days users are very fussy about their load time, so let’s check some solutions which avoid that.

### Option 3: Let your CI/CD inject correct configuration settings

Using this approach CI before doing a deployment will generate a configuration dynamically based on where you about to deploy to.

You could you use a gulp task for that, which would look something like this:

<iframe src="https://medium.com/media/acf6a2c165cf6c734b99881649b510b8" frameborder=0></iframe>

Now the question is where does CI gets those config values which it injects into angular config. There are 2 main options:

1. Have a set of configuration files which are checked in into your repo and can be accessed by CI during deployment. This brings the same problems as solutions 1.

1. Inject those values into environmental variables of your CI, which is arguably a better solution. The new problem you have is managing env variables both on your server and CI.

**Advantage**

* There is no need to wait for your config to be loaded.

* You don’t have to have your env vars in your repo.

**Disadvantage**

* You now have your env variables in 2 places CI and your deployment server. Also it limits you in a way that now you always have to go via CI to do a deployment.

**Summary**

This approach only partially solves the problem and pushes some of it to CI.

### Option 4: Generate your angular configuration on the server dynamically

You have probably heard of server side template rendering, it is a way of dynamically injecting data into your html markup, pretty old school stuff. So how about if we take similar approach and apply it for our Angular configuration service (which is just js file). So as *templating engine *I am going to use [*gulp-ng-config](https://github.com/ajwhite/gulp-ng-config)* which does pretty much what we want - it generates key value angular constant service from a JSON file, you can also override values from JSON file with env variables.

So here is how the process would work when you deploy your code to a server:

1. Server will generate angular const service with key values based on your env variables.

1. It will kick of node server

1. Your index.html will load constant service and use those variables whenever you load your page for the first time

I have created a sample angular/node project to illustrate how all bits fit together, you can check it on my [GitHub](https://github.com/kudresov/angular-config-vars).

**Advantage**

* No sensitive info has leaked into your repo and you can open source it any day

* All sensitive information is injected into the servers and you don’t need to worry about managing it in multiple places

* It’s a fairly simple solution

**Disadvantages**

* You have to include *gulp* and *gulp-ng-config *in dependencies rather than devDependencies (which I don’t personally think is a problem).

**Summary**

It seems to be the cleanest approach at the moment.

Also when you move all you client and server configurations to env variables you get access to this benefits:

1. If a developer wants a separate environment to test his code, it should be as easy as cloning existing one and changing endpoints to other servers (if required)

1. You can fairly easily migrate between hosting platforms as you don’t rely on a complex setup and just need a bunch of environmental variables to be injected into your servers.

1. You can have fine grained control of who sees production configuration.

1. You can change your endpoints on your servers without any code change

## Summary

I hope this article will help to avoid a lot of pain in the deployment process and maybe even give you some dev superpowers!

![](https://cdn-images-1.medium.com/max/2000/1*SnsghO5h6Jqs0r96qewxBQ.gif)
