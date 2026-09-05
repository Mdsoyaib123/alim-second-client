import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/Services";
import Index from "@/pages/Index";
import Task from "@/pages/Task";
import BindAccount from "@/pages/BindAccount";
import OrderRecord from "@/pages/OrderRecord";
import Product from "@/pages/Product";
import CheckIn from "@/pages/CheckIn";
import ChangePassword from "@/pages/ChangePassword";
import CashOut from "@/pages/CashOut";
import History from "@/pages/History";
import Help from "@/pages/Help";
import Score from "@/pages/Score";
import WithdrawPassword from "@/pages/WithdrawPassword";
import Event from "@/pages/Event";
import Account from "@/pages/Account";
import ProtectedRoute from "@/components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/account",
        element: <ProtectedRoute><Account /></ProtectedRoute>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/event",
        element: <Event />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/score",
        element: <Score />,
      },
      {
        path: "/check-in",
        element: <ProtectedRoute><CheckIn /></ProtectedRoute>,
      },
      {
        path: "/services",
        element: <ProtectedRoute><Services /></ProtectedRoute>,
      },
      {
        path: "/history",
        element: <ProtectedRoute><History /></ProtectedRoute>,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ChangePassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/index",
        element: <Index />,
      },
      {
        path: "/reservation",
        element: <ProtectedRoute><Task /></ProtectedRoute>,
      },
      {
        path: "/bind-account",
        element: <ProtectedRoute><BindAccount /></ProtectedRoute>,
      },
      {
        path: "/booking-history",
        element: <ProtectedRoute><OrderRecord /></ProtectedRoute>,
      },
      {
        path: "/product",
        element: <ProtectedRoute><Product /></ProtectedRoute>,
      },
      {
        path: "/cash-out",
        element: <ProtectedRoute><CashOut /></ProtectedRoute>,
      },
      {
        path: "/withdraw-password",
        element: <ProtectedRoute><WithdrawPassword /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;