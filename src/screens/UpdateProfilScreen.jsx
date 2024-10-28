import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation, useGetProfilMutation } from "../redux/slices/usersApiSlice";
import { NavLink } from "react-router-dom";
import { setUserInfo } from "../redux/slices/authSlice";
import "../styles/Update.css";
import { useNavigate } from "react-router-dom";

const UpdateProfilScreen = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = useSelector((state) => state.auth.token);

  const [updateUser] = useUpdateUserMutation();
  const [getProfil] = useGetProfilMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
  }, [userInfo]);

  const handleUpdate = async () => {
    try {
      const res = await updateUser({
        token: `Bearer ${token}`,
        data: {
          firstName,
          lastName,
        },
      }).unwrap();

      const userRes = await getProfil({ token: `Bearer ${token}` }).unwrap();
      dispatch(setUserInfo(userRes.body));

      navigate("/profil");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <main className="main bg-grey">
      <>
        <div className="header">
          <h1 className="update-title">Welcome back</h1>
          <div className="edit-form">
            <div className="left-form">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <NavLink>
                <button className="save-button text-btn-form" onClick={handleUpdate}>
                  Save
                </button>
              </NavLink>
            </div>
            <div className="right-form">
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <NavLink to="/profil">
                <button className="cancel-button text-btn-form">Cancel</button>
              </NavLink>
            </div>
          </div>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </>
    </main>
  );
};

export default UpdateProfilScreen;
