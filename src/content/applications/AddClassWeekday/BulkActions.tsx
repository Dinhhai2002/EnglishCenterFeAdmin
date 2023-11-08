import { useRef, useState } from 'react';

import {
  Box, Button, IconButton, List, ListItem, ListItemText, Menu
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions({handleSubmitAddStudent}:any) {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };
  
  
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {/* <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography> */}

          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            startIcon={<PersonAddAltIcon />}
            onClick={handleSubmitAddStudent}
          >
            Thêm vào lớp học
          </Button>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
