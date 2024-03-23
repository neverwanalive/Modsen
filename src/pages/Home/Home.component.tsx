import React from "react";
import { Header, Main, Button, Container } from "./Home.styles";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Header>
        <Button variant="contained" onClick={() => navigate("/map")}>
          Get Started
        </Button>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
        <Button onClick={() => navigate("/registration")}>Sign Up</Button>
      </Header>
      <Container></Container>
    </Main>
  );
};
