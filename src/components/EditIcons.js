import { Box, IconButton, Tooltip } from "@mui/material";
import {
  Close as CloseIcon,
  Crop as CropIcon,
  Refresh as RefreshIcon,
  Flip as FlipIcon,
  FindReplace as FindReplaceIcon,
} from "@mui/icons-material";

const EditIcons = ({
  onCloseEditIcons,
  onCropImage,
  onRotate,
  onFlipHorizontal,
  onFlipVertical,
  onReplace,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "8px",
        right: "8px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "5px",
        borderRadius: "8px",
        gap: "5px",
      }}
    >
      {[
        { icon: <CloseIcon />, title: "Close", onClick: onCloseEditIcons },
        { icon: <CropIcon />, title: "Crop", onClick: onCropImage },
        { icon: <RefreshIcon />, title: "Rotate", onClick: onRotate },
        {
          icon: <FlipIcon />,
          title: "Flip Horizontal",
          onClick: onFlipHorizontal,
        },
        {
          icon: <FlipIcon style={{ transform: "rotate(90deg)" }} />,
          title: "Flip Vertical",
          onClick: onFlipVertical,
        },
        { icon: <FindReplaceIcon />, title: "Replace", onClick: onReplace },
      ].map(({ icon, title, onClick }, index) => (
        <Tooltip key={index} title={title} placement="left">
          <IconButton sx={{ color: "white" }} onClick={onClick}>
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default EditIcons;
