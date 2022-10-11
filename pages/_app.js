import '../styles/globals.css'
import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { NotificationProvider } from '../contexts/notificationContext'

function MyApp({ Component, pageProps }) {
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
