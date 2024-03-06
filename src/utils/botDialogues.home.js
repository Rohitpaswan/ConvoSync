const botDialogues = [
  {
    id: "1",
    message: "Hi Lvy is there!",
    trigger: "2",
  },

  {
    id: "2",
    options: [{ value: 1, label: "Let's begin", trigger: "3" }],
  },

  { id: "3", message: "Two users are available right now.", trigger: "4" },
  {
    id: "4",
    message: "Mickey & Elon",
    trigger: "5",
  },

  {
    id: "5",
    message: "Thank you",
    end: true,
  },
];

export default botDialogues;
