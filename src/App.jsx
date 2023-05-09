import './App.scss'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import SellerGigs from './pages/sellerGigs/SellerGigs';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/addGig/Add';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider} from "@tanstack/react-query";

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Success from './pages/success/Success';
import Pay from './pages/pay/Pay';



function App() {

  const queryClient = new QueryClient();

  const Layout = () =>{
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
          exact: true
        },
        {
          path: "/gigs",
          element: <Gigs/>
        },
        {
          path: "/gig/:id",
          element: <Gig/>
        },
        {
          path: "/orders",
          element: <Orders/>
        },
        {
          path: "/sellergigs",
          element: <SellerGigs/>
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages/>
        },
        {
          path: "/message/:id",
          element: <Message/>
        },
       {
          path: "/login",
          element: <Login/>
        },
       {
          path: "/register",
          element: <Register/>
        },
       {
          path: "/pay/:id",
          element: <Pay/>
        },
       {
          path: "/success",
          element: <Success/>
        },
      ]
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
