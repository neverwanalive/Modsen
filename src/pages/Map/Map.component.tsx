import React, { useContext, useEffect, useState } from "react";
import {
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
  Circle,
  Polyline,
} from "react-leaflet";
import Select from "react-select";
import {
  Main,
  MainContainer,
  SideBox,
  Container,
  PopupButtonContainer,
  PopupTitle,
  PopupCategories,
  Button,
  Title,
  ButtonContainer,
} from "./Map.styles";
import { LatLngTuple } from "leaflet";
import { Header } from "../Home/Home.styles";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../..";
import {
  Drawer,
  TextField,
  Toolbar,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { categories } from "../../constants/categories";
import { blackIcon, redIcon } from "../../constants/marker";
import { DataSnapshot, onValue, ref, remove, set } from "firebase/database";
import { database } from "../..";
import { createFileLevelUniqueName } from "typescript";
import CloseIcon from "@mui/icons-material/Close";

export const Map: React.FC = () => {
  const [category, setCategory] = useState<any>("");
  const [radius, setRadius] = useState<any>(500);
  const apiKey = "02b09f6358694e93ac7356d855a253e0";
  const userid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { authState } = useContext(Context);
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [clickPos, setClickPos] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [fav, setFav] = useState<any>([]);
  const [waypoints, setWaypoints] = useState<any>([]);
  const [distance, setDistance] = useState<any>(0);
  const [time, setTime] = useState<any>(0);
  const [open, setOpen] = React.useState(false);

  const getGeolocation = () => {
    const success = ({ coords }: any) => {
      const { latitude, longitude } = coords;
      const pos: LatLngTuple = [latitude, longitude];
      if (!position || (position[0] !== latitude && position[1] !== longitude))
        setPosition(pos);
    };

    const error = ({ message }: any) => {
      if (!position || (position[0] !== 51.5 && position[1] !== -0.09))
        setPosition([51.5, -0.09]);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  };

  const changeRaduis = (val: any) => {
    setRadius(val);
  };

  const signOutFn = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setClickPos([e.latlng.lat, e.latlng.lng]);
        setWaypoints([]);
        setOpen(false);
      },
    });

    return clickPos && <Marker icon={blackIcon} position={clickPos} />;
  };

  const deleteData = (e: any, place: any) => {
    remove(ref(database, "users/" + `${userid}/` + place.properties.place_id));
    e.stopPropagation();
  };

  const saveData = (e: any, place: any) => {
    set(ref(database, "users/" + `${userid}/` + place.properties.place_id), {
      data: { ...place, saved: true },
    });
    setData((l: any) =>
      l.filter((v: any) => v.properties.place_id !== place.properties.place_id)
    );
    e.stopPropagation();
  };

  const getData = () => {
    const url =
      "https://api.geoapify.com/v2/places?categories=" +
      `${category}` +
      "&filter=circle:" +
      `${clickPos[1]}` +
      "," +
      `${clickPos[0]}` +
      "," +
      `${radius}` +
      "&limit=500&apiKey=" +
      `${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((places) => {
        const arr = fav.map((v: any) => v.properties.place_id);
        const newData = places.features
          .filter((o: any) => !arr.includes(o.properties.place_id))
          .map((v: any) => ({
            ...v,
            saved: false,
          }));
        setData(newData);
      });
  };

  const getDBData = () => {
    onValue(ref(database, "users/" + `${userid}/`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFav(Object.values(data).map((o: any) => o.data));
      } else {
        setFav([]);
      }
    });
  };

  const ShowNotFav = () => {
    return (
      data && (
        <>
          {data?.map((v: any, id: any) => (
            <Marker
              icon={redIcon}
              position={[v.properties.lat, v.properties.lon]}
            >
              <Popup>
                <PopupTitle>{v.properties.formatted}</PopupTitle>
                <PopupCategories>
                  {v.properties.categories.map((v: any) => (
                    <ul>
                      <li>{v}</li>
                    </ul>
                  ))}
                </PopupCategories>
                <PopupButtonContainer>
                  <Button onClick={(e) => saveData(e, v)}>save</Button>
                  <Button disabled={!clickPos} onClick={(e) => routing(e, v)}>
                    show route
                  </Button>
                </PopupButtonContainer>
              </Popup>
            </Marker>
          ))}
        </>
      )
    );
  };

  const ShowFav = () => {
    return fav.map((v: any) => (
      <Marker position={[v.properties.lat, v.properties.lon]}>
        <Popup>
          <PopupTitle>{v.properties.formatted}</PopupTitle>
          <PopupCategories>
            {v.properties.categories.map((v: any) => (
              <ul>
                <li>{v}</li>
              </ul>
            ))}
          </PopupCategories>
          <PopupButtonContainer>
            <Button onClick={(e) => saveData(e, v)}>save</Button>
            <Button disabled={!clickPos} onClick={(e) => routing(e, v)}>
              show route
            </Button>
          </PopupButtonContainer>
        </Popup>
      </Marker>
    ));
  };

  console.log(fav);

  const routing = (e: any, place: any) => {
    const url =
      "https://api.geoapify.com/v1/routing?waypoints=" +
      `${clickPos}` +
      "|" +
      `${[place.properties.lat, place.properties.lon]}` +
      "&mode=drive&apiKey=" +
      `${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWaypoints(
          data.features[0].geometry.coordinates[0].map((v: any) => v.reverse())
        );
        setTime(Math.round(data.features[0].properties.time));
        setDistance(Math.round(data.features[0].properties.distance));
        setOpen(true);
      });
    e.stopPropagation();
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (userid) getDBData();
  }, [userid]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <MainContainer>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={
          "Time to place = " +
          `${time}` +
          " seconds" +
          ". Distance to place = " +
          `${distance}` +
          " meters"
        }
        action={action}
      />
      <Container>
        {position && (
          <Main
            center={position}
            zoom={16}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            closePopupOnClick={true}
          >
            <TileLayer
              attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
              url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=02b09f6358694e93ac7356d855a253e0"
              id="osm-bright"
            />
            {clickPos && radius && (
              <Circle center={clickPos} radius={radius} color="blue" />
            )}
            <Polyline positions={waypoints} color="red" />
            <ShowFav />
            <ShowNotFav />

            <MapEvents />
          </Main>
        )}
        <SideBox>
          <Title>Choose Radius</Title>
          <TextField
            type="number"
            value={radius}
            onChange={(e) => changeRaduis(e.target.value)}
          />
          <Title>Choose Categories</Title>
          <Select
            options={categories}
            isMulti
            onChange={(v) => setCategory(v.map((o) => o.value).join(","))}
          />
          <Button
            disabled={!category || !clickPos}
            variant="contained"
            onClick={() => getData()}
          >
            Search
          </Button>
          <ButtonContainer>
            {!authState.pending && authState.user && (
              <Button variant="outlined" onClick={() => signOutFn()}>
                Sign Out
              </Button>
            )}
            {!authState.pending && !authState.user && (
              <>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/registration")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </ButtonContainer>
        </SideBox>
      </Container>
    </MainContainer>
  );
};
