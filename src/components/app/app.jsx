import { Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NotFound404, OrdersPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

function App() {
  const location = useLocation();

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<ProtectedRouteElement component={<LoginPage />} onlyAuth={false} />} />
        <Route path='/register' element={<ProtectedRouteElement component={<RegisterPage />} onlyAuth={false} />} />
        <Route path='/forgot-password' element={<ProtectedRouteElement component={<ForgotPasswordPage />} onlyAuth={false} />} />
        <Route path='/reset-password' element={<ProtectedRouteElement component={<ResetPasswordPage />} onlyAuth={false} />} />
        <Route path='/profile' element={<ProtectedRouteElement component={<ProfilePage />} />}>
          <Route path='orders' element={<ProtectedRouteElement component={<OrdersPage />} />} />
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
