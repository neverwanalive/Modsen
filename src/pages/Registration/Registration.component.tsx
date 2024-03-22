import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import {
  Form,
  FormContainer,
  Main,
  TextField,
  Title,
} from "./Registration.styles";

export const Registration: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "Too Short!")
        .max(21, "Too Long!")
        .required("First name field is required")
        .nullable(),
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

  console.log(formik.values);

  return (
    <Main>
      <FormContainer>
        <Title>Sign Up</Title>
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
      </FormContainer>
    </Main>
  );
};
