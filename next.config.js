const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  swc: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
