// src/router.jsx

import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UpdateProfilScreen from "./screens/UpdateProfilScreen.jsx";

// Créer un router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profil" element={<ProfileScreen />} />
        <Route path="/profil/edit-profil" element={<UpdateProfilScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

export default router;
