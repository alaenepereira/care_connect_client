import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

import './style.css';

export default function BackButton() {
  const location = useLocation();
const navigate = useNavigate();

 const hiddenRoutes = ['/login', '/forgot-password', '/home'];

  const showBackButton = !hiddenRoutes.includes(location.pathname);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    showBackButton && (
      <button className="back-button" onClick={handleGoBack}>
        <FaArrowLeft />
      </button>
    )
  );
}