import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../..";
import {
  Additional,
  Form,
  FormContainer,
  Main,
  TextField,
  Title,
  TitleContainer,
  Button,
  ButtonContainer,
  Switcher,
  Link,
} from "./Login.styles";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/map");
      })
      .catch((error) => {
        setOpen(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const event = (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        signIn(formik.values.email, formik.values.password);
      }
    };

    window.addEventListener("keypress", event);

    return () => {
      window.removeEventListener("keypress", event);
    };
  });

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
    <Main>
      <FormContainer>
        <TitleContainer>
          <Title>Sign In</Title>
          <Additional>
            Enter your email below to login to your account
          </Additional>
        </TitleContainer>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Email or password are incorrect"
          action={action}
        />
        <Form>
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <TextField
            size="small"
            label="Password"
            variant="outlined"
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
        </Form>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={() => signIn(formik.values.email, formik.values.password)}
          >
            Login
          </Button>
        </ButtonContainer>
        <Switcher>
          Don't have an account?
          <Link onClick={() => navigate("/registration")}>Sign Up</Link>
        </Switcher>
      </FormContainer>
    </Main>
  );
};
