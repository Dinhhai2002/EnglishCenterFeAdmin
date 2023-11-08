import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import Iframe from 'react-iframe';
import YouTube from 'react-youtube';
import lessonsApiService from 'src/services/API/LessonsApiService';

const opts = {
  width: '1200',
  height: '500',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

function DialogVideo({ openDialogMapVideo, id, handleCloseVideo }) {
  const [lessons, setLessons] = useState<any>({});
  const [videoIdMatch, setVideoIdMatch] = useState('');

  const theme = useTheme();

  useLayoutEffect(() => {
    lessonsApiService
      .findOne(id)
      .then((data) => {
        setLessons(data.data);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <Dialog
      fullScreen={true}
      open={openDialogMapVideo[id] || false}
      onClose={() => {
        handleCloseVideo(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: 20 }}
        id="responsive-dialog-title"
      >
        Video bài học
      </DialogTitle>

      <DialogContent>
        {lessons.video_type === 0 ? (
          <YouTube videoId={lessons.id_video} opts={opts} />
        ) : (
          <Iframe
            url={`https://drive.google.com/file/d/${lessons.id_video}/preview`}
            width="1200"
            height="500"
            id=""
            className=""
            display="block"
            position="relative"
          />
        )}

        <Box sx={{ mt: 2 }}>
          <Typography>{lessons.name}</Typography>
          <Typography>{lessons.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleCloseVideo(id);
          }}
          variant="outlined"
        >
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogVideo;
