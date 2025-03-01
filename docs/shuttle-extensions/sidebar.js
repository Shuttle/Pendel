const home = {
  text: "",
  items: [
    {
      text: "Shuttle.Extensions",
      link: "/shuttle-extensions/home",
    },
  ],
};

const extensions = [
  home,
  {
    text: "Extensions",
    items: [
      {
        text: "EF Core",
        link: "/shuttle-extensions/shuttle-extensions-efcore",
      },
    ],
  },
];

const sidebar = {
  "/shuttle-extensions": extensions,
};

export default sidebar;
