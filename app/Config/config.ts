export const config = {
  auth: {
    default: "passport",
    strategies: {
      local: {
        fields: {
          usernameField: "phone",
          passwordField: "password",
        },
      },
    },

    providers: {
      users: {
        driver: "jcc-eloquent",
        model: "User",
      },
    },
  },
};
