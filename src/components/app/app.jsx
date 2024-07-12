import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, HistoryPage, LoginPage, MainPage, NotFound404, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/profile' element={<ProfilePage />}>
          <Route path='history' element={<HistoryPage />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
