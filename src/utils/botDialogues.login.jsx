
const ExampleComponent = () => (
  <button> This is an example component </button>
)
const botDialogues = [
  {
    id: "1",
    message: "Greetings! I'm Lily, Your Virtual Assistant",
    trigger: "2",
  },
  {
    id: "2",
    message: "Do you need some help",
    trigger: "3",
  },

  {
    id: "3",
    component: ExampleComponent,
 
    options: [{ value: 1, label: "Yes Please", trigger: "4" }],
  },
  {
    id: "4",
    message: "we've provided two demo accounts for you to explore",
    trigger: "5",
  },

  {
    id: "5",
    options: [{ value: 1, label: " Continue", trigger: "6" }],
  },

  {
    id: "6",
    message: "Which account would you like to log in as?",
    trigger: "7",
  },

  {
    id: "7",
    options: [
      { value: 1, label: "Account1", trigger: "8" },
      { value: 2, label: "Account2", trigger: "11" },
    ],
  },

  { id: "8", message: "UserId: user123@gmail.com", trigger: "9" }, //user 1

  {
    id: "9",
    options: [{ value: 1, label: " Password", trigger: "10" }],
  },

  {
    id: "10",
    message: "user123", //password user1
    trigger: "14",
  },
  {
    id: "11",
    message: "userId: user2123@gmail.com", //user2
    trigger: "12",
  },
  {
    id: "12",
    options: [{ value: 1, label: " Password", trigger: "13" }],
  },
  {
    id: "13",
    message: "user123", //password user2
    trigger: "14",
  },

  {
    id: "14",
    options: [
      { value: 1, label: " Start Again", trigger: "1" },

      { value: 2, label: "End", trigger: "15" },
    ],
  },
  {
    id: "15",
    message: "Thank you",
    end: true,
  },
];

export default botDialogues;
