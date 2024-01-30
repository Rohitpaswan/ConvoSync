# ConvoSync Chatting App

Welcome to ConvoSync, a real-time chatting application built with React and Firebase Firestore! This application allows users to engage in seamless conversations with real-time message synchronization.

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Demo](#demo)
- [Installation](#Installation)
- [Contributing](#contributing)
- [License](#license)

## Screenshots

![Authentication](/public/readmeImg/login.png)
_User Authentication: Sign up securely and log in to access chat features._

![Chatting-Desktop](/public/readmeImg/chatting.png)
_Real-time Chat: Engage in real-time conversations with instant message synchronization._

## Features

- **User Authentication** : Sign up securely and log in to access chat features.
- **Real-time Chat**: Engage in real-time conversations with instant message synchronization.
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices.
- **Secure Message Storage**: Message data is securely stored in Firebase Firestore, providing reliable and persistent storage for all chat data, ensuring data integrity and availability.

## Demo

Experience ConvoSync firsthand by accessing our app!

#### Demo URL https://convo-sync.vercel.app/login

#### Instructions:

    1. Navigate to the provided ConvoSync Demo URL
    2. You'll be directed to the login page.
    3. If you don't have an account yet, feel free to sign up  to explore the app.
    4. Alternatively, use the following demo credentials:

    - Username1: user123@gmail.com
    - Password: user123

    - Username2: user2123@gmail.com
    - Password: user123

## Technologies Used

- **React:** Frontend user interface and interaction
- **Firebase Authentication:** Secure user authentication and management
- **Firebase Firestore:** Real-time database for storing chat messages and user data.
- **HTML & CSS:** : Structure and styling of the application.

## Installation

### Follow these steps to get started with ConvoSync:

**Clone the project**

```bash
  git clone https://github.com/Rohitpaswan/EasyBuys.git
```

**Install Dependencies**

```bash
  cd convosync
```

```base
  npm install
```

```base
  npm i react-router-dom
```

```base
  npm i react-icons
```

```base
  npm i emoji-picker-react
```

**Set up Firebase Project**

```bash
  - Create a Firebase project in the Firebase console
    (https://console.firebase.google.com/).

  - Enable Firestore database.

  - Set up Firebase Authentication (enable email/password sign-in method).

  - Copy Firebase configuration settings.
```

**Configure Firebase**

```bash
  Create a file named .env in the root directory.

  Add Firebase configuration settings to .env

  VITE_FIREBASE_API_KEY= your-api-key
  VITE_FIREBASE_PROJECT_ID= your-project-id
  VITE_FIREBASE_AUTH_DOMAIN= your-auth-domain
  VITE_FIREBASE_STORAGE_BUCKET= your-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDING_ID= your-messaging-sender-id
  VITE_FIREBASE_APP_ID= your-app-id
```

**Start Development Server**

```bash
  npm run dev
```

## Contributing

Contributions are welcome!

If you'd like to contribute to ConvoSync, please fork the repository and create a pull request. Feel free to open an issue if you encounter any bugs or have suggestions for improvements.

## License

[MIT](https://choosealicense.com/licenses/mit/)
