import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { auth } from "../..";
import {
  Additional,
  Button,
  ButtonContainer,
  Form,
  FormContainer,
  Main,
  Switcher,
  TextField,
  Title,
  TitleContainer,
  Link,
} from "./Registration.styles";

export const Registration: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(7, "Too Short!")
        .max(21, "Too Long!")
        .required("Password field is required"),
      repeatPassword: Yup.string()
        .required("Retype your password")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
      email: Yup.string()
        .email("Invalid email")
        .required("Email field is required"),
    }),
    onSubmit: () => {},
  });

  const createUser = (email: string, password: string) => {
    if (Object.keys(formik.errors).length) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/map");
      })
      .catch((error) => {
        setOpen(true);
      });
  };

  return (
    <Main>
      <FormContainer>
        <TitleContainer>
          <Title>Sign Up</Title>
          <Additional>
            Enter your email and password below to create an account
          </Additional>
        </TitleContainer>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="This email already exist"
          action={action}
        />
        <Form>
          <TextField
            error={!!formik.errors.email && !!formik.touched.email}
            helperText={formik.touched.email ? formik.errors.email : undefined}
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
            error={!!formik.errors.password && !!formik.touched.password}
            helperText={
              formik.touched.password ? formik.errors.password : undefined
            }
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
          <TextField
            error={
              !!formik.errors.repeatPassword && !!formik.touched.repeatPassword
            }
            helperText={
              formik.touched.repeatPassword
                ? formik.errors.repeatPassword
                : undefined
            }
            size="small"
            label="Repeat password"
            variant="outlined"
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
          />
        </Form>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={() =>
              createUser(formik.values.email, formik.values.password)
            }
          >
            Sign Up
          </Button>
        </ButtonContainer>
        <Switcher>
          Already have an account?
          <Link onClick={() => navigate("/login")}>Sign In</Link>
        </Switcher>
      </FormContainer>
    </Main>
  );
};
