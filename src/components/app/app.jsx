import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, LoginPage, MainPage, RegisterPage } from '../../pages';

function App() {
  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
