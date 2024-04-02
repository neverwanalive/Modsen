import styled from "styled-components";
import { MapContainer } from "react-leaflet";
import { Button as ButtonMui } from "@mui/material";

export const Main = styled(MapContainer)`
  height: 100%;
  width: 100%;
`;

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  @media (max-width: 1279px) {
    flex-direction: column;
  }
`;

export const SideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const PopupTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

export const PopupButtonContainer = styled.div``;

export const PopupCategories = styled.div`
  font-size: 13px;
`;

export const Button = styled(ButtonMui)``;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 25px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
  gap: 10px;
`;
