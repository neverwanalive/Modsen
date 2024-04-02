import styled from "styled-components";
import { TextField as TextFieldMUI, Button as ButtonMui } from "@mui/material";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  width: 100% !important;
  padding: 10px !important;
  margin-top: 32px !important;
  box-shadow: none !important;
  background-color: black !important;
  font-size: 12px !important;
`;

export const Switcher = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

export const Link = styled.div`
  margin-left: 10px;
  cursor: pointer;
  text-decoration: underline;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  :nth-child(2) {
    background-color: white !important;
    border-color: lightgray !important;
    color: black !important;
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 30px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22%;
  @media (max-width: 1279px) {
    width: 100%;
    padding: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 35px;
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
`;

export const Additional = styled.div`
  font-size: 18px;
  color: grey;
`;

export const TextField = styled(TextFieldMUI)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  & label.Mui-focused {
    color: black;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: grey;
    }
  }
`;
