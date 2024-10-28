import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useGetProfilMutation } from "../redux/slices/usersApiSlice";
import { setCredentials, setUserInfo } from "../redux/slices/authSlice";
import validator from "validator";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getProfil] = useGetProfilMutation();
  const [login] = useLoginMutation();

  const handleCheck = (e) => {
    setCheckbox(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!validator.isEmail(email)) {
      setEmailError("Entrer un email valide.");
      valid = false;
    }

    if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Le password doit contenir au moins 8 caracteres un caractère special et une majuscule.");
      valid = false;
    }

    if (valid) {
      try {
        if (checkbox) {
          localStorage.setItem("persist", true);
        }
        //demande au back le token si mail et password valid recupere le token en res
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ token: res.body.token }));
        //envoi du token qui sera decoder depuis le back end et verifier si valide retourne le userinfo
        const userRes = await getProfil({ token: `Bearer ${res.body.token}` }).unwrap();
        dispatch(setUserInfo(userRes.body));
        navigate("/profil");
      } catch (err) {
        console.error("Login failed", err);
        setGeneralError(err.data.message);
        //si erreur retourne au login ex: 401 pour token invalide
        navigate("/login");
      }
    } else {
      return;
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {emailError && (
              <p className="error-text" style={{ color: "red" }}>
                {emailError}
              </p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="error-text" style={{ color: "red" }}>
                {passwordError}
              </p>
            )}
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={checkbox} onChange={handleCheck} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <input className="sign-in-button" type="submit" value="Se connecter" />
          {generalError && (
            <p className="error-text" style={{ color: "red" }}>
              {generalError}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default LoginScreen;
