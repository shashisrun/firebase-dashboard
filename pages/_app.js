import React from 'react';
import '../styles/globals.css'
import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { NotificationProvider } from '../contexts/notificationContext'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
          function (registration) {
            alert("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            alert("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return (
    <NotificationProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default MyApp
