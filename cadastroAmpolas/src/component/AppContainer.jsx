import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AppContainer({children}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {children}
      </Container>
    </React.Fragment>
  );
}