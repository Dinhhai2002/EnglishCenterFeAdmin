import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import utils from 'src/utils/Utils';
import DialogUser from './DialogUser';
import { useEffect, useLayoutEffect, useState } from 'react';
import userApiService from 'src/services/API/UserApiService';
import DialogAvatar from './UploadAvatar';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = () => {
  const [user, setUser] = useState<any>({});
  const [changeData, setChangeData] = useState<any>(true);

  useLayoutEffect(() => {
    userApiService
      .getUser()
      .then((data: any) => {
        setUser(data.data);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    userApiService
      .getUser()
      .then((data: any) => {
        setUser(data.data);
      })
      .catch((error: any) => {});
  }, [changeData]);

  return (
    <>
      <Box display="flex" mb={3}></Box>
      <CardCover>
        <CardMedia image={user.avatar_url} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.user_name} src={user.avatar_url} />
        <ButtonUploadWrapper>
          <DialogAvatar changeData={changeData} setChangeData={setChangeData} />
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.user_name}
        </Typography>
        <Typography variant="subtitle2">
          Địa chỉ: {user.full_address}
        </Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {utils.getRole(Number(user.role))} | {user.email} | {user.phone}
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <DialogUser
              user={user}
              changeData={changeData}
              setChangeData={setChangeData}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileCover;
