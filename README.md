# 🧠 TaskMate - React Native Firebase Task Manager

**TaskMate** is a cross-platform productivity app built using **React Native + Expo**, designed to help users track, organize, and analyze tasks effectively. With **Firebase Authentication** and **Firestore**, it ensures secure user management and persistent data storage.

---

## 📲 Features

- 🔐 **Firebase Auth**: Signup & login with email/password
- 📝 **Task Management**: Add, edit, delete, filter & categorize tasks
- 📊 **Dashboard Analytics**: Visual summary via Pie & Bar charts
- 👤 **Profile Page**: View user details from Firestore
- 📦 **Persistent Stats**: Data synced via AsyncStorage + Context API
- ☁️ **Cloud Firestore Integration**
- 📱 **Beautiful UI** using React Native components

---

## 🧱 Pages & Components

### 🔐 **Signup Page**
- Validates email format and required fields
- Creates user via `createUserWithEmailAndPassword`
- Saves user data (first name, last name, email) to Firestore
- Redirects to Dashboard on successful signup

### 🔐 **Login Page**
- Logs in with Firebase credentials
- Handles Firebase errors (wrong password, unregistered user)
- Navigates to dashboard on success
- Redirects to Signup if user not found

### 📊 **Dashboard**
- Fetches task stats (from AsyncStorage)
- Uses `react-native-chart-kit` to render:
  - 📘 Pie chart (completed vs incomplete)
  - 📙 Bar chart (Work, Personal, Urgent)
- Fetches user info from Firestore

### 🧩 **ManageTask**
- Add/edit/delete tasks
- Categorize tasks (Work, Personal, Urgent)
- Toggle completion
- Filter by category or status
- Saves and syncs task stats using React Context

### 👤 **Profile**
- Fetches user details from Firestore
- Displays first name, last name, and email
- Includes logout functionality

---

## 🛠️ Tech Stack

| Technology       | Purpose                                  |
|------------------|-------------------------------------------|
| Expo + React Native | Cross-platform mobile development       |
| Firebase Auth     | User authentication                      |
| Firebase Firestore| Cloud-based user & task data storage     |
| React Context API | Global task statistics state             |
| AsyncStorage      | Local storage for task persistence       |
| React Native Chart Kit | Pie & bar charts for visual analytics |
| React Native Picker | Task category/filter dropdown UI        |
| React Native Vector Icons | Icons for actions                 |

---

## 📁 Folder Structure

```
├── components/
│   ├── MyButton.js
│   └── Fallback.js
├── contexts/
│   └── TaskContext.js
├── screens/
│   ├── login.js
│   ├── signup.js
│   ├── (drawer)/dashboard.js
│   ├── profile.js
│   └── managetask.js
├── firebase.js
├── App.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/taskmate-app.git
cd taskmate-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

Create `firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

✅ Enable:
- Authentication (Email/Password)
- Firestore Database in Firebase Console

---

## 🚀 Run the App

```bash
npx expo start
```

Scan the QR code with Expo Go on your device or use an emulator.

---

## 📦 Dependencies

```bash
npm install firebase
npm install @react-native-async-storage/async-storage
npm install @react-native-picker/picker
npm install react-native-vector-icons
npm install react-native-chart-kit react-native-svg
npm install expo-router
npm install react-hot-toast
```

> 🧪 Don’t forget to run `npx expo install` for native dependencies like `react-native-svg`.

---

## 🧠 Future Improvements

- Add due dates & reminders
- Profile picture upload (via Firebase Storage)
- Push notifications for urgent tasks
- Drag & drop task reordering
- Light/Dark mode toggle

---

## 👩‍💻 Author

Developed by [Anwesha Pal](https://github.com/anwesha24-code)

---
