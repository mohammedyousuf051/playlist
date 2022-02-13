import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackRow from './TrackRow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddIcon from '@mui/icons-material/Add';
import Plstyles from "./Playstyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
  height: '500px',
  overflow: 'auto',
  width: '60%'
};

 function PlaylistDialog({playlisId, alltracks, getTracklist}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function allTrackstoadd(e){
    setOpen(true);
  }

  function addTrackTolist(e){
      if (open){
        const newclick = e.target.id
        console.log("hello",playlisId,newclick);
        Axios.put('http://localhost:8000/playlist/addTrack/'+playlisId.id,{
            id : alltracks[newclick].id,
            title : alltracks[newclick].title,
            length : alltracks[newclick].length,
            bpm : alltracks[newclick].bpm,
            main_artists : alltracks[newclick].main_artists,
            audio : alltracks[newclick].audio
        })
        .then(response => {toast(response.data.status)
            getTracklist()})
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
  }

  return (
    <div>
      <Button onClick={(e) => allTrackstoadd(e)}>Add Tracks</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2>Add Tracks to your playlist</h2>
        <a style={{color : 'lightgrey'}}>Just click on the track you wanna add to your playlist.</a>
        <div>{alltracks.map((track, ix) => (
          <div className={Plstyles.dialogcomp} > <MusicNoteIcon className={Plstyles.dialogmus}/> 
          <span className={Plstyles.dialogTitle} id={ix} onClick={(e) => addTrackTolist(e)}>  {track.title}</span> </div>
        ))}</div>
        
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default PlaylistDialog;