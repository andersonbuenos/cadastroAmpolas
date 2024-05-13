import { useContext, useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';

import Pagination from '@mui/material/Pagination';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


import Context from '../Context'

export default function AppTable() {

  const Dia = useContext(Context)

  const [rows, setRows] = useState([])
  const [page, setPage] = useState(4)

  const [pageLimit, setPageLimit] = useState(0)

  useEffect(() => {
    fetch(Dia.apiUrl)
      .then(e => e.json())
      .then(e => {
        Dia.setDataTable(e.data)
        Dia.setPageLimit(e.pages)
      })
  }, [Dia.page])

  function pg(n) {

    Dia.setPage(n)

    // console.log(n)
    // console.log(Dia.apiUrl)

    // fetch(Dia.apiUrl)
    //   .then(e => e.json())
    //   .then(e => {
    //     Dia.setDataTable(e.data)
    //     Dia.setPageLimit(e.last)
    //     Dia.setPage(n)
    //   })
  }


  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table" >
        <caption>
          <Pagination
            onChange={(e, i) => pg(i)}
            style={{ display: 'flex', justifyContent: 'center' }}
            count={Dia.pageLimit}
            color="secondary"
            page={Dia.page}
          />
        </caption>

        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}

            <TableCell>id</TableCell>
            <TableCell align='right'>Macro</TableCell>
            <TableCell align='right'>Tipo de ampola</TableCell>
            <TableCell align='right'>Status </TableCell>
            <TableCell align='right'>Total de ampolas</TableCell>
            <TableCell align='right'>Município</TableCell>
            <TableCell align='right'>Município recebido</TableCell>
            <TableCell align='right'>Município transferido</TableCell>
            <TableCell align='right'>Editar</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {(Dia.dataTable || rows).map((row) => (
            <TableRow key={row['id']}>
              <TableCell style={{ textWrap: 'nowrap' }}>{row['id']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Macro']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Tipo de ampola']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Status']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Total de ampolas']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Município']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Município recebido']}</TableCell>
              <TableCell style={{ textWrap: 'nowrap' }} align='right'>{row['Município transferido']}</TableCell>
              <TableCell align='right' >
                <Button variant="contained" onClick={()=>Dia.CRUD.readInputs(row['id'])}><EditIcon fontSize='small' /> <p style={{ marginLeft: 10 }} > Editar</p> </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}








