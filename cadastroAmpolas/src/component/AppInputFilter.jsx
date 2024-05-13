// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';

// import React from 'react';
import Context from '../Context';

export default function BasicTextFields() {
  
  const Dia = useContext(Context)

  function handleChage(){


    const val = event.target.value
    Dia.setSearch(val)
    fetch(Dia.apiUrl)
    .then(e=> e.json() )
    .then(e=>{
      console.log(e)
      Dia.setDataTable(e.data)
      Dia.setPageLimit(e.last)
      Dia.setPage(1)
    })

  }

  return (
    <Box
      textAlign="center"
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      <TextField onKeyUp={handleChage} style={{ width: 500, maxWidth: '100%' }} id="outlined-basic" label="Pesquisar" variant="outlined" />
    </Box>
  );
}