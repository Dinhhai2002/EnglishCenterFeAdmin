import { IconButton, Tooltip, useTheme } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function IconActions({
  handleClickOpen,
  id,
  type,
  title,
  isCheck = false,
  disabled = false
}) {
  const theme = useTheme();
  const map = {
    0: {
      icon: isCheck ? (
        <CheckCircleIcon fontSize="small" />
      ) : (
        <DeleteTwoToneIcon fontSize="small" />
      ),
      background: isCheck
        ? theme.colors.info.lighter
        : theme.colors.error.lighter,
      color: isCheck ? theme.palette.info.main : theme.palette.error.main
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
    },
    3: {
      icon: <DeleteForeverIcon fontSize="small" />,
      background: theme.colors.error.lighter,
      color: theme.palette.error.main
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
        disabled={disabled}
      >
        {map[type].icon}
      </IconButton>
    </Tooltip>
  );
}

export default IconActions;
