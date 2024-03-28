import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/UserContext";
import { auth } from "../..";
import { Header, Main, Button, Container } from "./Home.styles";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useContext(Context);

  const signOutFn = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <>
      <Main>
        {!authState.pending && (
          <Header>
            <Button variant="contained" onClick={() => navigate("/map")}>
              Get Started
            </Button>
            {authState.user && (
              <Button onClick={() => signOutFn()}>Sign Out</Button>
            )}
            {!authState.user && (
              <>
                <Button onClick={() => navigate("/login")}>Sign In</Button>
                <Button onClick={() => navigate("/registration")}>
                  Sign Up
                </Button>
              </>
            )}
          </Header>
        )}

        <Container></Container>
      </Main>
    </>
  );
};
