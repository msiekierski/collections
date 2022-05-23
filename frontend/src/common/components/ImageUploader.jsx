import React from "react";
import ImageUploading from "react-images-uploading";
import { DropzoneArea } from "mui-file-dropzone";
import { makeStyles } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const ImageUploader = ({ image, setImage }) => {
  const { settings } = useSelector(selectUser);
  return (
    <Box
      sx={{
        backgroundColor: "#646464",
        ".MuiDropzoneArea-root": {
          backgroundColor: settings.isDarkMode ? "#646464" : "DEDADA",
        },
      }}
    >
      <DropzoneArea
        acceptedFiles={["image/jpeg", "image/png"]}
        showPreviews={false}
        filesLimit={1}
        maxFileSize={40000000}
        onChange={(files) => {
          if (files.length > 0) setImage(files[0]);
        }}
        showAlerts={false}
        dropzoneText="Upload your collection image"
      />
    </Box>
  );
};

export default ImageUploader;
