importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: "13703395620"
});

const messaging = firebase.messaging();