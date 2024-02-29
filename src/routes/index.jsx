import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/home";
import Login from "../components/Login/login";
import Register from "../components/Register/register";
import { useAuth } from "../providers/authProvider";
import ProtectedRoute from "./protectedRoute";

const ContentRoutes = () => {
    const { token } = useAuth()

    const routesForPublic = [
        {
            path : '/',
            element : <Home />
        },
        {
            path : '/about',
            element : <div>About page</div>
        },
        {
            path : '/login',
            element : <Login />
        },
        {
            path : '/register',
            element : <Register />
        }
    ]

    const routesForAuthOnly = [
        {
            path : '/',
            element : <ProtectedRoute />,
            children : [
                {
                    path : '/home',
                    element : <div>User home page</div>
                },
                {
                    path : '/profile',
                    element : <div>Profile page</div>
                }
            ]
        }
    ]

    const routesForNotAuthOnly = [
    ]

    const contentRouter = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthOnly : []),
        ...routesForAuthOnly
    ])

    return ( 
        <RouterProvider router={contentRouter} />
     );
}

export default ContentRoutes;