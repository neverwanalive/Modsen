import styled from "styled-components";
import { Button as ButtonMui } from "@mui/material";

export const Main = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: end;
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

export const Container = styled.div``;
