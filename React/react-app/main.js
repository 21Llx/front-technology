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
    path: "*",
    element: <Navigate to="404" />,
  },
]);
function App() {
  return (
    <div>
      <BrowserRouter>
        
      </BrowserRouter>
    </div>
  );
}
export default App;
