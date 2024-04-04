import { createBrowserRouter } from 'react-router-dom';

import Home from '../src/Views/Home';
const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    }

]);
export default router;