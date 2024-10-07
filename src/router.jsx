// src/router.jsx

import { createBrowserRouter, createRoutesFromElements, Route , Navigate} from "react-router-dom";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Créer un router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profil" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

export default router;
