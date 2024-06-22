// Router.jsx
import React from "react";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// import QcCheck from "./QcCheck";
import UserLogin from "./UserLogin";
import QcCheck from "./QcCheck";



const role = localStorage.getItem("role");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
      {/* <Route path="/" element={RootLayout}/> */}
        <Route path="/" element={<UserLogin />} />

              <Route
                path="/qcreport"
                element={<QcCheck/>}
              />



      </Route>
    </>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
