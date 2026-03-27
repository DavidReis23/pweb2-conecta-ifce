import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from '@/pages/LoginPage.tsx'
import HomePage from '@/pages/homepage/HomePage.tsx'
import RegisterPage from '@/pages/RegisterPage.tsx'
import { Router } from 'lucide-react'
import { AuthProvider } from './features/auth/context/AuthContext.tsx'
import FeedPage from './pages/FeedPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
      {
        path: 'feed',
        Component: FeedPage,
      },
    ],
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
