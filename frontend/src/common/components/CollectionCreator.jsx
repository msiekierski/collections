import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  COLLECTION_CREATION_URL,
  COLLECTION_TOPICS_URL,
  getCollectionCreationUrl,
} from "../constants/apiUrls";
import MDEditor from "@uiw/react-md-editor";
import AddIcon from "@mui/icons-material/Add";
import { customFieldTypes } from "../constants/customFieldTypes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageUploader from "./ImageUploader";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import translate from "../utils/translate";
import toBase64 from "../utils/toBase64";

const validationSchema = yup.object({
  name: yup.string().required("Collection name is required"),
  topic: yup.string(),
  description: yup.string(),
});

const CollectionCreator = ({ isOpen, handleClose, author, addCollection }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topics, setTopics] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [image, setImage] = useState(null);
  const { settings, user } = useSelector(selectUser);
  document.documentElement.setAttribute(
    "data-color-mode",
    settings.isDarkMode ? "dark" : "light"
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      topic: { _id: "BOOKS" },
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        let imgToBase64 = null;
        if (image) {
          imgToBase64 = await toBase64(image);
        }

        const { data } = await axios.post(
          getCollectionCreationUrl(author["_id"]),
          {
            ...values,
            customFields,
            imageBase64: imgToBase64,
          }
        );
        addCollection(data);
        resetForm();
        handleClose();
      } catch (e) {}
      setIsSubmitting(false);
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setCustomFields([]);
    setImage("");
  };

  useEffect(() => {
    let isMounted = true;
    const fetchTopics = async () => {
      try {
        const { data } = await axios.get(COLLECTION_TOPICS_URL);
        if (isMounted) {
          setTopics(data);
        }
      } catch (e) {}
    };

    fetchTopics();
    return () => {
      isMounted = false;
      formik.resetForm();
    };
  }, []);

  console.log(topics);

  console.log(formik.values);

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
        <Typography variant="h4">{translate("collectionCreator")}</Typography>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 1 }}>{translate("collectionName")}</Typography>
        <TextField
          margin="dense"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />

        <Typography sx={{ mb: 1 }}>{translate("description")}</Typography>
        <MDEditor
          value={formik.values.description}
          onChange={(value) =>
            formik.setValues({ ...formik.values, description: value })
          }
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 3 }}
          alignItems="center"
        >
          <Typography>{translate("topic")}</Typography>

          <Select
            value={topics.findIndex(
              (topic) => topic["_id"] === formik.values.topic["_id"]
            )}
            onChange={(e) =>
              formik.setValues({
                ...formik.values,
                topic: topics[e.target.value],
              })
            }
          >
            {topics.map((topic, index) => (
              <MenuItem value={index} key={index}>
                {topic["_id"]}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Typography textAlign="center">
            {translate("customFields")}
          </Typography>
          <IconButton
            onClick={() =>
              setCustomFields([
                ...customFields,
                { name: "", type: customFieldTypes[0] },
              ])
            }
          >
            <AddIcon />
          </IconButton>
        </div>
        {customFields.length === 0 && (
          <Typography sx={{ mt: 2 }} textAlign="center">
            {translate("customFieldsInfo")}
          </Typography>
        )}
        {customFields.map((customField, index) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 3, mb: 3 }}
            alignItems="center"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TextField
                label="Field name"
                margin="dense"
                name="name"
                value={customField.name}
                onChange={(e) => {
                  const fieldsCopy = customFields.slice();
                  fieldsCopy[index].name = e.target.value;
                  setCustomFields(fieldsCopy);
                }}
              />
              <IconButton
                onClick={() =>
                  setCustomFields(customFields.filter((_, i) => i !== index))
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
            <Select
              defaultValue={0}
              value={customField.type}
              onChange={(e) => {
                const fieldsCopy = customFields.slice();
                fieldsCopy[index].type = e.target.value;
                setCustomFields(fieldsCopy);
              }}
            >
              {customFieldTypes.map((fieldType, index) => (
                <MenuItem value={fieldType} key={index}>
                  {fieldType}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        ))}

        <div
          style={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Typography>{translate("collectionPhoto")}</Typography>
          <div style={{ width: "50%", margin: 20 }}>
            <ImageUploader image={image} setImage={setImage} />
          </div>
        </div>
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
          size="large"
          sx={{ mt: 2 }}
        >
          {translate("create")}
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};

export default CollectionCreator;
