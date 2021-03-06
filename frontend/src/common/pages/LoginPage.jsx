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
import LockIcon from "@mui/icons-material/Lock";
import { CREATE_USER_URL, LOGIN_USER_URL } from "../constants/apiUrls";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectUser } from "../../features/user/userSlice";
import { HOME_ROUTE, REGISTER_ROUTE } from "../constants/appRoutes";
import translate from "../utils/translate";

const validationSchema = yup.object({
  email: yup
    .string("Enter e-mail")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter password").required("Password is required"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError("");
      setIsLoading(true);
      try {
        const { data } = await axios.post(LOGIN_USER_URL, {
          email: values.email,
          password: values.password,
        });
        dispatch(logIn(data));
        navigate(-1);
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
            <LockIcon />
          </Avatar>
        </div>
        <Typography textAlign="center" variant="h5">
          {translate("login")}
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
          <Link to={REGISTER_ROUTE}>
            <Typography>{translate("clickToRegister")}</Typography>
          </Link>
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            {translate("login")}
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
