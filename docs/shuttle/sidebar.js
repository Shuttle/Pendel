const home = {
  text: "",
  items: [
    {
      text: "Shuttle",
      link: "/shuttle/home",
    },
  ],
};

const sidebar = {
  "/shuttle/": [
    home,
    {
      items: [
        {
          text: "Cli",
          link: "/shuttle/shuttle-cli",
        },
        {
          text: "Contract",
          link: "/shuttle/shuttle-contract",
        },
        {
          text: "Cron",
          link: "/shuttle/shuttle-cron",
        },
        {
          text: "Mediator",
          link: "/shuttle/shuttle-mediator",
        },
        {
          text: "Pipelines",
          link: "/shuttle/shuttle-pipelines",
        },
        {
          text: "Platform",
          link: "/shuttle/shuttle-platform",
        },
        {
          text: "Reflection",
          link: "/shuttle/shuttle-reflection",
        },
        {
          text: "Serialization",
          link: "/shuttle/shuttle-serialization",
        },
        {
          text: "Specification",
          link: "/shuttle/shuttle-specification",
        },
        {
          text: "Streams",
          link: "/shuttle/shuttle-streams",
        },
        {
          text: "Threading",
          link: "/shuttle/shuttle-threading",
        },
      ],
    },
  ],
};

export default sidebar;
