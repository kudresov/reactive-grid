# Introduction
If you are developing something which is slightly more complicated than ‘hello world’ you should have multiple environments like: develop, staging, production. Depending on the environment you would use different resources (database, api, etc). These resources would be then injected via environmental variables. It’s a fairly common approach on most of today's cloud platforms. It’s also fairly easy to grab env variables on a server side, but how do you get them in you clientside JS?

## Sub section
I will assume that you know why it’s a good idea store your configuration in env variables. If you don’t I recommend to read 12 factor app manifesto hopefully it has enough infomration to convince you.
So the solution we will be striving to is to have all configuration for both server and client in environmental variables.

## Sub section two
Some info here
```js
console.log('hi');
```
