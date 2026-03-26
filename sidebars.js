const sidebars = {
  tutorialSidebar: [
    "overview/overview",
    "architecture/architecture",
    "deployment/deployment",
    {
      type: "category",
      label: "User Guide",
      link: {
        type: "doc",
        id: "user-guide/overview",
      },
      collapsible: true,
      collapsed: false,
      items: [
        "user-guide/overview",
        "user-guide/login-logout",
        "user-guide/sandbox-agenda",
        {
          type: "category",
          label: "Training Agenda",
          link: {
            type: "doc",
            id: "user-guide/training-agenda/index",
          },
          collapsible: true,
          collapsed: false,
          items: [
            "user-guide/training-agenda/overview",
            "user-guide/training-agenda/training-definition",
            "user-guide/training-agenda/training-instance",
            "user-guide/training-agenda/training-run",
            "user-guide/training-agenda/visualization-tools",
          ],
        },
        "user-guide/administration-agenda",
      ],
    },
    {
      type: "category",
      label: "Developer Guide",
      link: {
        type: "doc",
        id: "developer-guide/overview",
      },
      collapsible: true,
      collapsed: false,
      items: [
        "developer-guide/overview",
        "developer-guide/dong-gop",
        "developer-guide/trace-code-kypo-sandbox-service",
        "developer-guide/trace-code-kypo-training-service",
        "developer-guide/mo-hinh-a&d",
      ],
    },
    "demo/demo",
    "api/api-docs",
    "api/training-api-test-guide",
    "faq/faq",
    "references-contact/reference-contact",
  ],
};

export default sidebars;
