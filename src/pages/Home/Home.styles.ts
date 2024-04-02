import styled from "styled-components";
import { Button as ButtonMui } from "@mui/material";

export const Main = styled.div`
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: end;
  width: 100vw;
  background-color: white;
  height: 5%;

  @keyframes myAnim {
    0% {
      opacity: 0;
      transform: translateY(-250px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: myAnim 1s ease 0s 1 normal forwards;
`;

export const Button = styled(ButtonMui)`
  font-size: 15px !important;
  margin-right: 10px !important;
  margin-top: 10px !important;
  color: black !important;
  &:nth-child(1) {
    background-color: black !important;
    color: white !important;
    box-shadow: none !important;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 95%;
`;

export const Title = styled.div`
  font-size: 50px;
  font-weight: 900;
`;

export const SubTitle = styled.div`
  color: grey;
  font-weight: 500;
  font-size: 30px;
`;
