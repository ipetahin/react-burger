import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

export default function ProtectedRouteElement({ component, onlyAuth = true }) {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <GridLoader color='#fff' loading={true} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />;
  }

  if (!onlyAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
}
