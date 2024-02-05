import { createBrowserRouter } from "react-router-dom";
import { Home } from "../business-components/home";
import { APP_ROUTE } from "../enumerations";
import { ErrorFallback } from "../shared-components/fundamental/error-fall-back";

const routes = [
  {
    path: APP_ROUTE.HOME,
    element: <Home />,
    errorElement: <ErrorFallback />,
  },
];

export const ROUTER_REF = createBrowserRouter(routes);
