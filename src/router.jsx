import { createBrowserRouter } from 'react-router-dom';

import Home from '../src/Views/Home';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
import Create from '../src/components/Create';
import Edit from '../src/components/Edit';

const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/register',
        element: <Register />
    },

    {
        path: '/create',
        element: <Create />
    },

    {
        path: '/edit/:id',
        element: <Edit />
    }

  





]);
export default router;