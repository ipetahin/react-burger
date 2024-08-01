import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { UserStore } from '../../types';

interface ProtectedRouteElementProps {
  component: ReactElement;
  onlyAuth: boolean;
}

interface Component {
  component: ReactElement;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ component, onlyAuth }) => {
  const { user, isAuthChecked }: UserStore = useSelector((store: any) => store.user);
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
};

export const RouteOnlyAuth = ({ component }: Component) => <ProtectedRouteElement component={component} onlyAuth={true} />;
export const RouteOnlyUnAuth = ({ component }: Component) => <ProtectedRouteElement component={component} onlyAuth={false} />;
