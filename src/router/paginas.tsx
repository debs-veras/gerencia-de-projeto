
import Loading from "../components/Loading";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Inicio from "../pages/Inicio";
import NotFound from "../pages/NotFound";
import UsuarioListagem from "../pages/Usuario/listagem";

const routesPaginas = {
    path: "/",
    element: <LayoutDashboard />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <Inicio />,
            errorElement: <Loading />
        },
        {
            path: "usuarios",
            element: <UsuarioListagem />,
            errorElement: <Loading />
        },
    ],
}

export default routesPaginas;