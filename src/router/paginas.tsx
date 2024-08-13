
import Loading from "../components/Loading";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Inicio from "../pages/Inicio";
import NotFound from "../pages/NotFound";

const routesPaginas = {
    path: "/",
    element: <LayoutDashboard />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <Inicio />,
            errorElement: <Loading />
        }
    ],
}

export default routesPaginas;