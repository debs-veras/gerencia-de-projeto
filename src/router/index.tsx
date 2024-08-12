import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesPaginas from "./paginas";

const Login: React.LazyExoticComponent<any> = lazy(() => import("../pages/Login"));
const NotFound: React.LazyExoticComponent<any> = lazy(() => import("../pages/NotFound"));

function Router(): JSX.Element {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
            errorElement: <NotFound />,
        },
        routesPaginas,
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;
