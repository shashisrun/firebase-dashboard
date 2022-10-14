import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const app = initializeApp({
    apiKey: "AIzaSyDfTxQBP0IKBil0wJJM02XKy7BzNAR6IFg",
    authDomain: "gobistro-41952.firebaseapp.com",
    projectId: "gobistro-41952",
    storageBucket: "gobistro-41952.appspot.com",
    messagingSenderId: "13703395620",
    appId: "1:13703395620:web:6f09eb29531e4f8392dbb1",
    measurementId: "G-PVQ0RWK6XG"
});

const messaging = getMessaging(app);

// // Both of them ain't working

// //background notifications will be received here
// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload)
//     // Customize notification here
//     const notificationTitle = 'Background Message Title'
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     }

//     return self.registration.showNotification(notificationTitle, notificationOptions)
// })

// messaging.onBackgroundMessage(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload)
//     const notificationTitle = 'Background Message Title'
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     }

//     return self.registration.showNotification(notificationTitle, notificationOptions)
// })