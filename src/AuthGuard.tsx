import {  type ReactNode, useEffect, useLayoutEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import LandingPage from "./Landingpage";
import Loader from "./Loader";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();



  useLayoutEffect(() => {
    if (isLoaded && !isSignedIn) {
    //     alert("ilkl")
    //   navigate("/signin");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return (<Loader/>);

  if (!isSignedIn) return (<LandingPage/>); // prevent flicker

  return <>{children}</>;
}
