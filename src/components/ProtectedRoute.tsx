import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = !!token || !!localStorage.getItem("accessToken");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;