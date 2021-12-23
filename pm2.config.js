module.exports = {
    apps : [
        {
          name: "myapp",
          script: "src/server.ts",
          interpreter: './node_modules/.bin/ts-node',
          watch: true,
          env: {
              "NODE_ENV": "development"
          },
          env_production: {
              "NODE_ENV": "production",
          }
        }
    ]
  }
  