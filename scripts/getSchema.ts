const fetch2 = require('node-fetch'); // TODO need to figure out why it is already declared
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema
} = require('graphql/utilities');

const token = process.env.GITHUB_API_TOKEN;

if (!token) {
  console.error('GITHUB_API_TOKEN not defined');
  process.exit(1);
}

fetch2('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  },
  body: JSON.stringify({ query: introspectionQuery })
})
  .then(res => res.json())
  .then(res => {
    const schemaString = printSchema(buildClientSchema(res.data));
    fs.writeFileSync('schema.graphql', schemaString);
  });
