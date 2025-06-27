import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProtectedAdminRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      toast.error("🚫 Please login as admin to access this page");
    } else {
      setIsVerified(true);
    }
  }, [token]);

  if (!token) return null; // ❌ Don't render anything if not logged in

  return isVerified ? children : null;
};

export default ProtectedAdminRoute;
