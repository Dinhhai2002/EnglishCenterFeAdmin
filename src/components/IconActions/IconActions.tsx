import { IconButton, Tooltip, useTheme } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
function IconActions({ handleClickOpen, id, type, title }) {
  const theme = useTheme();
  const map = {
    0: {
      icon: <DeleteTwoToneIcon fontSize="small" />,
      background: theme.colors.error.lighter,
      color: theme.palette.error.main
    },
    1: {
      icon: <ChangeCircleIcon fontSize="small" />,
      background: theme.colors.success.lighter,
      color: theme.palette.success.main
    },
    2: {
      icon: <EditTwoToneIcon fontSize="small" />,
      background: theme.colors.primary.lighter,
      color: theme.palette.primary.main
    }
  };
  return (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          '&:hover': {
            background: map[type].background
          },
          color: map[type].color
        }}
        color="inherit"
        size="small"
        onClick={() => {
          handleClickOpen(id);
        }}
      >
        {map[type].icon}
      </IconButton>
    </Tooltip>
  );
}

export default IconActions;
