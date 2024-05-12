import { Header } from '@task-master/client/component/core';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LogoIcon from './assets/logo.svg';
import { useMemo } from 'react';
import { useAuth } from '@task-master/client/context';
import {
  ProtectedRoute,
  PublicRoute,
} from '@task-master/client/component/app-specific';
import { Login, SignUp } from '@task-master/client/page';
import { Container } from '@task-master/client/component/layout';

export const Navigation = () => {
  const { user, isAuthenticated, isAppReady, onLogout } = useAuth();

  const router = useMemo(
    () =>
      createBrowserRouter(
        createRoutesFromElements(
          <Route
            path="/"
            element={
              <Container>
                <Header onLogout={onLogout} logo={LogoIcon} user={user} />
                <Outlet />
              </Container>
            }
            errorElement={
              <Container>
                <Header onLogout={onLogout} logo={LogoIcon} user={user} />
                <div>Not Found</div>
              </Container>
            }
          >
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route index element={<div>Contact</div>} />
            </Route>

            <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
              <Route index path="login" element={<Login />} />
              <Route path="register" element={<SignUp />} />
            </Route>
          </Route>
        )
      ),
    [isAuthenticated, onLogout, user]
  );

  if (!isAppReady) {
    return (
      <Container className="justify-center items-center space-y-2 flex-col flex">
        <span role="img" aria-label="Rocket" className="text-4xl animate-pulse">
          🚀
        </span>
        <p>Initializing productivity blast-off sequence...</p>
      </Container>
    );
  }

  return <RouterProvider router={router} />;
};
