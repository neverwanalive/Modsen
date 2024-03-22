import styled from "styled-components";
import { TextField as TextFieldMUI } from "@mui/material";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  border-radius: 5px;
  padding: 32px 32px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
  justify-content: center;
  display: flex;
`;

export const TextField = styled(TextFieldMUI)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;
