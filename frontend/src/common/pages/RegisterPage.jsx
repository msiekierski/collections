import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { CREATE_USER_URL } from "../constants/apiUrls";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/appRoutes";
import translate from "../utils/translate";

const validationSchema = yup.object({
  email: yup
    .string("Enter e-mail")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter password")
    .min(4, "Password should be at least 4-character long")
    .required("Password is required"),
  repeatPassword: yup
    .string("Reapeat password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat your password"),
});

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError("");
      setIsLoading(true);
      try {
        await axios.post(CREATE_USER_URL, {
          email: values.email,
          password: values.password,
        });
        navigate(LOGIN_ROUTE);
      } catch (e) {
        if (!!e.response.data) {
          setError(e.response.data);
        } else {
          setError(e.message);
        }
      }
      setIsLoading(false);
    },
  });

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alingItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
            <PersonAddAltIcon />
          </Avatar>
        </div>
        <Typography textAlign="center" variant="h5">
          {translate("createNewAccount")}
        </Typography>
        {error && (
          <Alert sx={{ mt: 1, mb: 1 }} severity="error">
            {error}
          </Alert>
        )}
        <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="password"
            margin="dense"
            fullWidth
            id="password"
            name="password"
            label={translate("password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            type="password"
            margin="dense"
            fullWidth
            id="repeatPassword"
            name="repeatPassword"
            label={translate("repeatPassword")}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            helperText={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
          />
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            {translate("register")}
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
