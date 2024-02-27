import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Hook from "./views/hook";
import Params from "./views/params";
import Props from "./views/props";
import NoFound from "./views/404";
import Home from "./views/home";
import RouteDom1 from "./views/routerDom/routerDom1";
import RouteDom2 from "./views/routerDom/routerDom2";
import RouteDom3 from "./views/routerDom/routerDom3";
import RouteDom4 from "./views/routerDom/routerDom4";
import RouteDom5 from "./views/routerDom/routerDom5";
import RouteDom6 from "./views/routerDom/routerDom6";
import RouteDom7 from "./views/routerDom/routerDom7";
import RouteDom8 from "./views/routerDom/routerDom8";
import RouteDom9 from "./views/routerDom/routerDom9";
import RouteHome from "./views/routerDom/routeHome";
import Test from "./views/test"
import ReduxClass from "./views/redux/reduxClass"
import ReduxToolkit from "./views/redux/reduxToolkit"

import { createBrowserHistory } from "history";
import KeepAlive, { AliveScope } from 'react-activation';
import HomeToolkit from "./views/homeToolkit";
let history = createBrowserHistory();
const router = createBrowserRouter([
  {
    path: "/route1",
    element: <RouteDom1 />,

  },
  {
    path: "/route2",
    element: <RouteDom2 />,
  },
  {
    path: "/route2",
    element: <RouteDom4 />,
  },
  {
    path: "/route3/:id",
    element: <RouteDom3 />,
    meta: { a: 1 }
  },
  {
    path: "/hook",
    element: <Hook />,
  },
  {
    path: "/routehome",
    element: <RouteHome />,
    children: [
      {
        path: "route7",
        element: <KeepAlive id="x"><RouteDom7 /></KeepAlive>,

      },
      {
        path: "route8",
        element: <KeepAlive id="xx"><RouteDom8 /></KeepAlive>,

      },
      {
        path: "route9",
        element: <KeepAlive id="xdw"><RouteDom9 /></KeepAlive>,

      },
    ]
  },
  {
    path: "/404",
    element: <NoFound />,
  },
  {
    path: "/",
    element: <Navigate to="route2" />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
  return (
    <div>
      <BrowserRouter>
        <AliveScope>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="hook" element={<Hook />} />
            <Route
              path="/params"
              render={(params) => {
                return <Params {...params} />;
              }}
            />
            <Route path="props" element={<Props />} />
            <Route path="404" element={<NoFound />} />
            <Route path="/" replace element={<Navigate to="home" />} />

            <Route path="route1" element={<RouteDom1 history={history} />}>
              <Route path="route2" element={<RouteDom2 />} />
              <Route path=":id" element={<RouteDom4 />} />
            </Route>
            <Route path="routehome" element={<RouteHome />}>
              <Route path="route7" element={<RouteDom7 />} />
              <Route path="route8" element={<RouteDom8 />} />
              <Route path="route9" element={<RouteDom9 />} />

            </Route>
            <Route path="route3/:id" element={<RouteDom3 />} loader={async (data) => {
              console.log(data)
              return new Promise()
            }} />
            <Route path="test" element={<Test />} />
            <Route path="reclass" element={<ReduxClass />} />
            <Route path="toolkit" element={<ReduxToolkit />} />

            <Route path="*" element={<Navigate to="404" />} />
          </Routes>
        </AliveScope>
      </BrowserRouter>
    </div>
  );
}
export default App;
