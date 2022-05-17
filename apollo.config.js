module.exports = {
  client: {
    includes: ["./**/*.tsx"],
    tagName: "gql",
    service: {
      name: "vestiyer-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
