import { Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, HistoryPage, IngredientPage, LoginPage, MainPage, NotFound404, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const location = useLocation();

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/profile' element={<ProfilePage />}>
          <Route path='history' element={<HistoryPage />} />
        </Route>
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/'
            element={
              <Modal>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
