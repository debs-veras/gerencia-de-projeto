
import Inicio from "../pages/Inicio";
import NotFound from "../pages/NotFound";

const routesPaginas = {
    path: "/",
    element: <Inicio />,
    errorElement: <NotFound />,
}

export default routesPaginas;