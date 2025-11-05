// import React, { lazy, Suspense, useEffect } from "react";
import {  Route, Routes } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";

//restriction from Public routes to no login user
const ProtectedRoutes = () => {
 


 return (
   <Routes>
     <Route path="/dashboard" element={<Dashboard />}/>
   </Routes>
 );
};

export default ProtectedRoutes;
