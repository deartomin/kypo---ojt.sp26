const sidebars = {
  tutorialSidebar: [
    "overview/overview",
    "architecture/architecture",
    "deployment/deployment",

    {
      type: "category",
      label: "User Guide",

      // 🔥 FIX QUAN TRỌNG
      link: {
        type: "doc",
        id: "user-guide/overview",
      },

      items: [
        "user-guide/overview",
        "user-guide/login-logout",
        "user-guide/sandbox-agenda",
        "user-guide/training-agenda",
        "user-guide/administration-agenda",
      ],
    },

    "developer-guide/dev-guide",
    "demo/demo",
    "api/api-docs",
    "api/training-api-test-guide",
    "faq/faq",
    "references-contact/reference-contact",
  ],
};

export default sidebars;
