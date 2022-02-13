import React,{ useState } from "react";
import styles from "./TrackRow.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Plstyles from "./Playstyle.module.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '1px solid lightgrey',
  boxShadow: 24,
  p: 4,
};

function TrackRow({allplaylist, track, handlePlay, type ,PlistId, showTracks}) {

  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);
  const [currentTrack, setCurrentTrack] = useState(false);
  // const [removelists, setremovelists] = useState(false);

  function removeplaylist(e){
    e.preventDefault();
    const newClicked = e.target.id;
    // setDeletelists(newClicked)
    console.log(newClicked,'kkk')
      // DELETE request using axios with error handling
      Axios.patch('http://localhost:8000/playlist/removeTrack/'+PlistId,{
              id : newClicked,
          })
          .then(response => showTracks(e))
          .catch(error => {
              console.error('There was an error!', error);
          });
  
  }

    function addTrackTolist(e){
      console.log(track,allplaylist,e.target.id);
      Axios.put('http://localhost:8000/playlist/addTrack/'+e.target.id,{
              id : track.id,
              title : track.title,
              length : track.length,
              bpm : track.bpm,
              main_artists : track.main_artists,
              audio : track.audio
          })
          .then(response => toast(response.data.status))
          .catch(error => {
              console.error('There was an error!', error);
          });
    }

  return (
    <><div>
      <div className={styles.trackRow}>
        <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 12L8 5V19L20 12Z" fill="white" />
          </svg>
        </button>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title} </div>
          {type === "main" ?
            <><div  className={styles.trackArtist}>
              {track.main_artists.join(", ")}
            </div><div className={Plstyles.hgButtons} onClick={ HandleOpen} >Add</div></>
            : <div className={Plstyles.hgButtons} id={track.id} onClick={(e) => removeplaylist(e)}>remove from playlist</div>
            }

        </div>
      </div>
      <ToastContainer />
    </div>{
      type === "main" ?
      <div>
        <Modal
          open={open}
          onClose={HandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}><h2> Add To Your PlayList</h2>
            { allplaylist.map((playlist, ix) => (
              <>
              <div className={styles.trackRow} > <LibraryMusicIcon />   <span className = {styles.trackadd} id={playlist.id} onClick={(e) => addTrackTolist(e)}>{playlist.name}</span></div></>
              ))} 
          </Box>
        </Modal>
      </div>: null}</>
    
  );
}

export default TrackRow;
