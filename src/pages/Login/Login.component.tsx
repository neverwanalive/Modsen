import { useFormik } from "formik";
import React from "react";

import { Form, FormContainer, Main, TextField, Title } from "./Login.styles";

export const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });
  console.log(formik.values);
  return (
    <Main>
      <FormContainer>
        <Title>LOGIN</Title>
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
      </FormContainer>
    </Main>
  );
};
