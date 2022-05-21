import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { createNewCommentUrl } from "../constants/apiUrls";

const validationSchema = yup.object({
  text: yup
    .string()
    .min(5, "Your comment must contain at least 5 characters")
    .required("Write here your comment"),
});

const CommentCreator = ({ itemId, userId }) => {
  const [isFetching, setIsFetching] = useState(false);
  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema,
    onSubmit: async ({ text }) => {
      setIsFetching(true);
      await axios.post(createNewCommentUrl(itemId), { text, userId });
      formik.resetForm();
      setIsFetching(false);
    },
  });
  return (
    <Paper sx={{ p: 3 }}>
      <TextField
        margin="dense"
        fullWidth
        name="text"
        label="Your comment"
        type="text"
        focused
        multiline
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          color="success"
          onClick={() => formik.submitForm()}
          loading={isFetching}
        >
          Submit comment
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default CommentCreator;
