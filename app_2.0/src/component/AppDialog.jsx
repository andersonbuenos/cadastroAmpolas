import {Dialog, DialogTitle} from '@mui/material'
import { useContext, useEffect, useState } from 'react';

import Context from '../Context';

function AppDialog({children}) {

  const Dia = useContext(Context)

  return (
    <Dialog open={Dia.dialogOpen} maxWidth="xs" fullWidth={true}>
    {/* <Dialog open={Dia.dialogOpen} onClick={Dia.DialogClose} maxWidth="xs" fullWidth={true}> */}
      <DialogTitle onClick={(e) => { e.stopPropagation(); }}>
        {children}
      </DialogTitle>
    </Dialog>
  );
}

export default AppDialog