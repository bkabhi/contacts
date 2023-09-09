import { lazy } from 'react';
import { rootService } from './RootService';

const ChartsAndMaps = lazy(() => import('../pages/ChartsAndMapsPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

const coreRoutes = [
  {
    path: rootService.Contacts,
    title: 'Contacts',
    component: ContactsPage,
  },
  {
    path: rootService.ChartsAndMaps,
    title: 'ChartsAndMaps',
    component: ChartsAndMaps,
  }
];

const routes = [...coreRoutes];
export default routes;
