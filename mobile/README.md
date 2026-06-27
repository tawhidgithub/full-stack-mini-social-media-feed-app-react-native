# Mini Social Feed - Mobile App

A React Native (Expo) application for the Mini Social Feed assignment.

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- Expo Notifications
- Firebase Cloud Messaging (FCM)

---

## Features

- User Authentication
- JWT Login
- Create Posts
- Feed
- Username Search
- Infinite Scroll Pagination
- Like / Unlike Posts
- Comments
- Pull To Refresh
- Push Notifications
- Responsive Layout (Mobile, Tablet & Web)

---

## Installation

Clone the repository

```bash
git clone <your-mobile-repository-url>
cd mobile
```

Install dependencies

```bash
npm install
```

Run Expo

```bash
npx expo start
```

Run Android

```bash
npx expo run:android
```

Run Web

```bash
npx expo start --web
```

---

## Backend Configuration

Update the backend API URL inside:

```
src/services/api.ts
```

Example

```ts
baseURL: "http://YOUR_LOCAL_IP:5000/api";
```

---

## Push Notifications

This project uses

- Expo Notifications
- Firebase Cloud Messaging (FCM V1)

A development build or APK is required for testing push notifications.

---

## APK

An installable APK is included with this submission.

---

## Project Structure

```
src
├── components
├── hooks
├── navigation
├── screens
├── services
├── utils
└── assets
```

---

## Demo

The project demonstration video (Loom) is included with the submission.

---

## Author

Tawhidul Islam
