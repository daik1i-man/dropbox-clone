import React, { lazy, Suspense, useContext } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register/RegisterPage';
import { UserAuthContext } from './Provider/Provider';
import LoaderComponent from './LoaderComponent/LoaderComponent';

function App() {
  const { isUser, loading } = useContext(UserAuthContext);

  const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
  const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
  const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
  const FolderPage = lazy(() => import("./pages/FolderPage/FolderPage"));

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <Router>
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route path='/' element={isUser ? (<MainPage />) : (<LoginPage />)} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/:id' element={<FolderPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App