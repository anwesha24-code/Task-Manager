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


![Signup Page](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/SignupPage.png)


### 🔐 **Login Page**
- Logs in with Firebase credentials
- Handles Firebase errors (wrong password, unregistered user)
- Navigates to dashboard on success
- Redirects to Signup if user not found


![Login Page](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/LoginPage.png)

### 📊 **Dashboard**
- Fetches task stats (from AsyncStorage)
- Uses `react-native-chart-kit` to render:
  - 📘 Pie chart (completed vs incomplete)
  - 📙 Bar chart (Work, Personal, Urgent)
- Fetches user info from Firestore

![Dashboard](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/Dashboard.png)

![Drawer](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/SideNavBar.png)

### 🧩 **ManageTask**
- Add/edit/delete tasks
- Categorize tasks (Work, Personal, Urgent)
- Toggle completion
- Filter by category or status
- Saves and syncs task stats using React Context


- Empty Task List
![Empty Task List](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/InitialManageTaskPage.png)

- Task List
![Task List](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/ManageTaskPage.png)

### **Filter**
- Urgent Incomplete Tasks
![Urgent Incomplete Tasks](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/Filter1.png)

- All Completed Tasks
![All Completed Tasks](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/Filter2.png)

### 👤 **Profile**
- Fetches user details from Firestore
- Displays first name, last name, and email
- Includes logout functionality

![Profile](https://github.com/anwesha24-code/Task-Manager/blob/017168598406c4710caa99d6d7136c5f69805c23/Screenshots/Profile.png)

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
├── (drawer)/
│   ├── layout.tsx
│   ├── dashboard.js
│   ├── profile.js
│   └── managetask.jsx
├── signup.jsx
├── index.js
├── firebase.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/anwesha24-code/Task-Manager.git
cd Task-Manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

Create `firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //register user
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTTX1XPEFb9sM4Bpz0fsa1pBisPk9C99Y",
  authDomain: "rntaskmanager-4e83e.firebaseapp.com",
  projectId: "rntaskmanager-4e83e",
  storageBucket: "rntaskmanager-4e83e.firebasestorage.app",
  messagingSenderId: "265997008127",
  appId: "1:265997008127:web:c5bf04427b064c525020ca",
  measurementId: "G-JCXQGHB6EZ"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);

export default app;
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
