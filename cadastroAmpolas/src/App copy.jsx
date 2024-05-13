import { useState } from 'react'
import './App.css'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import AppDialog from './AppDialog'

function App() {

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  // const [dialogOpened, setDialogOpened] = useState(false)

  return (
    <>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>

      <AppDialog opened={open}>
        Conteudo
      </AppDialog>

    </>
  )
}

export default App
