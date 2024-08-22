import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { FeedPage, ForgotPasswordPage, IngredientPage, LoginPage, MainPage, NotFound404, OrderPage, OrdersPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { checkUserAuth } from '../../services/slices/user-slice';
import { useEffect } from 'react';
import { RouteOnlyAuth, RouteOnlyUnAuth } from '../protected-route-element/protected-route-element';
import OrderInfo from '../order-info';
import { useDispatch } from '../../services/hooks';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<RouteOnlyUnAuth component={<LoginPage />} />} />
        <Route path='/register' element={<RouteOnlyUnAuth component={<RegisterPage />} />} />
        <Route path='/forgot-password' element={<RouteOnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<RouteOnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='/profile' element={<RouteOnlyAuth component={<ProfilePage />} />}>
          <Route path='orders' element={<RouteOnlyAuth component={<OrdersPage />} />} />
        </Route>
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/feed/:number' element={<OrderPage />} />
        <Route path='/profile/orders/:number' element={<RouteOnlyAuth component={<OrderPage />} />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={() => navigate('/', { replace: true })}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/'
            element={
              <Modal onClose={() => navigate('/', { replace: true })}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
