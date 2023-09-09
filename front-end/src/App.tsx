import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './common/Loader';
import routes from './routes';
import ContactsPage from './pages/ContactsPage';
import { ToastContainer } from 'react-toastify';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto' />

      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<ContactsPage />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
