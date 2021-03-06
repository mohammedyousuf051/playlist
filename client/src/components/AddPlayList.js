import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 222,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddPlayList({getPlaylist}) {
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);



    const url ="http://localhost:8000/playlist/add";

    const [data, setData] = useState({
        name:'',
        description:''
    })

    function handle(e){

        const newdata={...data}
        newdata[e.target.id]=e.target.value
        setData(newdata);
        console.log(newdata)
    }

    function submit(e)
    {
        e.preventDefault();
        console.log(data)
        Axios.post(url,{
            name: data.name,
            description: data.description
        })
        .then(res => {
          getPlaylist()
          setOpen(false)
        })
    }



  return (
    <div>
      <Button onClick={HandleOpen} variant="outlined">Create Playlist</Button>
      <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2 style={{color:"black"}}>Create PlayList</h2>
        <form >
            <TextField onChange={(e) => handle(e)}  id="name" value={data.name} label="PlayList Name" variant="filled" />
            <TextField onChange={(e) => handle(e)}  id="description" value={data.description} label="Description" variant="filled" /><br></br><br></br>
            {/* <input onChange={(e) => handle(e)}  id="name" value={data.name} placeholder="name" type="text" />
            <input onChange={(e) => handle(e)}  id="description" value={data.description} placeholder="description" type="text" /> */}
            <Button variant="outlined" type="button" onClick={(e) => submit(e)}>Create</Button>
        </form>
???
        </Box>
      </Modal>
    </div>
  );
}

export default AddPlayList
