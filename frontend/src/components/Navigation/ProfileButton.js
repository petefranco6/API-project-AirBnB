// frontend/src/components/Navigation/ProfileButton.js
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useHistory } from "react-router-dom";
import profile from "../../icons/profile.png";
import menu from "../../icons/menu.png";

import classes from "./ProfileButton.module.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // if (ulRef.current && !ulRef.current.contains(event.target)) {
      //   setShowMenu(false);
      // }
      if (!menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mouseup", handleOutsideClick);

    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, []);

  const closeMenu = () => setShowMenu(false);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.replace("/");
  };

  return (
    <div ref={menuRef}>
      <button
        onClick={() => {
          setShowMenu((prevState) => !prevState);
        }}
        className={classes["profile-btn"]}
      >
        <img className={classes.menu} src={menu} alt="" />
        <img className={classes.profile} src={profile} alt="" />
      </button>
      <div className={classes.dropdown}>
        <ul
          className={`${showMenu && classes["dropdown-menu"]} ${
            !showMenu && classes.hidden
          }`}
        >
          {user ? (
            <>
              <li className={classes.trip}>
                <Link onClick={closeMenu} className={classes.trips} to="/trips">
                  Trips
                </Link>
              </li>
              <div className={classes.divider}></div>
              <li className={classes.user}>
                <Link
                  onClick={closeMenu}
                  className={classes.host}
                  to="/hosting"
                >
                  Manage your listings
                </Link>
              </li>
              <div className={classes.divider}></div>
              <li className={classes.logout}>
                <button onClick={logoutHandler}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <div className={classes.modals}>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div className={classes.divider}></div>
              <div className={classes.host}>
                <OpenModalMenuItem
                  className="host"
                  itemText="Airbnb your home"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
