import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import * as _ from "lodash";
import { createNewItem } from "../../features/collectionItemsManagement/collectionItemsAPI";
import { addItem } from "../../features/collectionItemsManagement/collectionItemsSlice";
import { useDispatch } from "react-redux";
import translate from "../utils/translate";

let validationSchema = yup.object({
  name: yup.string().required("Item name is required"),
  tags: yup.array().min(1, "Add at least 1 tag"),
});

let initialValues = {
  name: "",
  tags: [],
};

const ItemCreator = ({
  isOpen,
  handleClose,
  customFields,
  uniqueTags,
  collectionId,
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  customFields.forEach(({ name, type }) => {
    if (type === "NUMBER") {
      validationSchema.fields[name] = yup.number().required("Required");
      initialValues[name] = 0;
    }
    if (type === "TEXT") {
      validationSchema.fields[name] = yup.string().required("Required");
      initialValues[name] = "";
    }
    if (type === "DATE") {
      const date = new Date().toJSON().slice(0, 10);
      validationSchema.fields[name] = yup.date().required("Required");
      initialValues[name] = date;
    }
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const newItem = {
        name: values.name,
        tags: values.tags,
        collectionId,
        customFields: customFields.map((customField) => ({
          name: customField.name,
          value: values[customField.name],
        })),
      };
      try {
        const { data } = await createNewItem(newItem);

        dispatch(addItem(data));
      } catch (e) {}
      setIsSubmitting(false);
      resetForm();
      handleClose();
    },
  });

  const resetForm = () => {
    formik.resetForm();
  };

  useEffect(() => {}, []);

  return (
    <Dialog
      fullScreen={true}
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={"lg"}
      scroll="paper"
    >
      <DialogTitle>
        <Typography variant="h4">{translate("itemCreator")}</Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />
        {customFields.map(({ _id, name, type }) => (
          <TextField
            key={_id}
            margin="dense"
            fullWidth
            id={name}
            name={name}
            label={name}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            sx={{ mb: 2 }}
          />
        ))}
        <Autocomplete
          multiple
          options={uniqueTags}
          defaultValue={[]}
          freeSolo
          onChange={(e, value) =>
            formik.setValues({ ...formik.values, tags: value })
          }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label={translate("tags")}
              error={formik.touched.tags && Boolean(formik.errors.tags)}
              helperText={formik.touched.tags && formik.errors.tags}
              placeholder="Your tag"
            />
          )}
        />
      </DialogContent>
      <Stack direction="row" justifyContent="center" spacing={4} sx={{ m: 2 }}>
        <Button
          onClick={() => {
            resetForm();
            handleClose();
          }}
          variant="contained"
          color="warning"
          fullWidth
        >
          {translate("cancel")}
        </Button>
        <LoadingButton
          onClick={() => formik.submitForm()}
          loading={isSubmitting}
          loadingPosition="end"
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2 }}
        >
          {translate("create")}
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};

export default ItemCreator;
