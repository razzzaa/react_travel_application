import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TokenTimer() {
  const timeoutDuration = 900000;
  let logoutTimer;
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .get("http://localhost:3030/api/logout")
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      handleLogOut();
    }, timeoutDuration);
  };

  useEffect(() => {
    resetLogoutTimer();

    const handleInteraction = () => {
      resetLogoutTimer();
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      clearTimeout(logoutTimer);
    };
  }, []);
}

export default TokenTimer;