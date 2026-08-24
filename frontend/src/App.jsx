import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse";
import Home from "./components/Home";
import JobDescription from "./components/JobDescription";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import AdminJobs from "./components/admin/AdminJobs";
import Applicants from "./components/admin/Applicants";
import PostJob from "./components/admin/PostJob";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import VerifyEmail from "./components/auth/VerifyEmail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail/>,
  },
  {
    path: "/jobs",
    element: <Jobs/>,
  },
  {
    path: "/description/:id",
    element: <JobDescription/>,
  },
  {
    path: "/browse",
    element: <Browse/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  //for admin
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>,
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },

  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  }
  ,
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }


]);

function App() {
  return (
    <>
    <div>
    <RouterProvider router={appRouter} />
    </div>

    </>
  );
}

export default App;
