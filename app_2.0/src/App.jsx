import { useContext, useEffect, useState } from 'react'
import './App.css'

import {
  Button,
  Select,
  TextField
} from '@mui/material'

import AppDialog from './component/AppDialog.jsx'
import AppDialogFields from './component/AppDialogFields.jsx'
import AppSelect from './component/AppSelect.jsx'
import AppToolbar from './component/AppToolbar.jsx'
import AppTable from './component/AppTable.jsx'
import AppContainer from './component/AppContainer'
import AppInputFilter from './component/AppInputFilter.jsx'
import AppDialogFieldsEdit from './component/AppDialogFieldsEdit.jsx'

import Context from './Context.jsx';
import Informations from './Informations.jsx'


function App() {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dataTable, setDataTable] = useState([])
  
  const [page, setPage] = useState(1)
  const [pageNum, setpageNum] = useState(5) // quantidade de resultados por página
  const [pageLimit, setPageLimit] = useState(0)
  const [search, setSearch] = useState('')

  const baseUrl = `http://localhost:3000/result/`

  const apiUrl = `http://localhost:3000/result?_page=${page}&_per_page=${pageNum}&Município=${search}`
  

  const [obj, setObj] = useState({
    'id': '',
    'Macro': '',
    'Tipo de ampola': '',
    'Status': '',
    'Total de ampolas': '',
    'Município': '',
    'Município recebido': '',
    'Município transferido': '',
  })

  const DialogOpen = () => setDialogOpen(true)
  const DialogClose = () => setDialogOpen(false)

  const btRegisterFields = () => {
    setObj({
      'Macro': '',
      'Tipo de ampola': '',
      'Status': '',
      'Total de ampolas': '',
      'Município': '',
      'Município recebido': '',
      'Município transferido': '',
    })

    Dia.DialogOpen()
  }

  const CRUD = {
    create() {
      if (Dia.obj['Macro'] == '') { alert("O campo Macro está vazio"); return }
      if (Dia.obj['Tipo de ampola'] == '') { alert("O campo Tipo de ampola está vazio"); return }
      if (Dia.obj['Status'] == '') { alert("O campo Status está vazio"); return }
      if (Dia.obj['Total de ampolas'] == '') { alert("O campo Total de ampolas está vazio"); return }
      if (Dia.obj['Município'] == '') { alert("O campo Município está vazio"); return }
/*       if (Dia.obj['Município recebido'] == '') { alert("O campo <Município recebido> está vazio"); return }
      if (Dia.obj['Município transferido'] == '') { alert("O campo <Município transferido> está vazio"); return } */

      if (obj['Status'] === 'Recebido' && obj['Município recebido'].length == 0) {
        alert('O campo Município recebido é obrigatório quando o Status é "Recebido"');
        return;
    }
    
    // Verifica se o 'Status' é 'Transferido' e se 'Município transferido' está vazio
    if (obj['Status'] === 'Transferido' && obj['Município transferido'].length == 0) {
        alert('O campo Município transferido é obrigatório quando o Status é "Transferido"');
        return;
    }

      // registrar
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Dia.obj)
      })
        .then(z => {
          fetch(apiUrl)
            .then(e => e.json())
            .then(g => {
              fetch(baseUrl + `?_page=${g.last}&_per_page=${pageNum}`)
                .then(e => e.json())
                .then(e => {
                  // Dia.createData(Dia.obj)
                  Dia.DialogClose()
                  Dia.setPage(g.last)
                  Dia.setDataTable(e.data)
                  Dia.setPageLimit(e.last)
                })
            })
        })




      Dia.DialogClose()
    },

    readInputs(id) {
      Dia.DialogOpen()
      // 80d6      
      fetch(baseUrl + id)
        .then(e => e.json())
        .then(e => {
          Dia.setObj({
            'id': e['id'],
            'Macro': e['Macro'],
            'Tipo de ampola': e['Tipo de ampola'],
            'Status': e['Status'],
            'Total de ampolas': e['Total de ampolas'],
            'Município': e['Município'],
            'Município recebido': e['Município recebido'],
            'Município transferido': e['Município transferido'],
          })
        })
    },

    edit() {

      if (Dia.obj['Macro'] == '') { alert("O campo <Macro> está vazio"); return }
      if (Dia.obj['Tipo de ampola'] == '') { alert("O campo <Tipo de ampola> está vazio"); return }
      if (Dia.obj['Status'] == '') { alert("O campo <Status> está vazio"); return }
      if (Dia.obj['Total de ampolas'] == '') { alert("O campo <Total de ampolas> está vazio"); return }
      if (Dia.obj['Município'] == '') { alert("O campo <Município> está vazio"); return }
      if (Dia.obj['Município recebido'] == '') { alert("O campo <Município recebido> está vazio"); return }
      if (Dia.obj['Município transferido'] == '') { alert("O campo <Município transferido> está vazio"); return }

      const id = Dia.obj['id']

      fetch(baseUrl + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Dia.obj),
      })

        .then(e => e.json())
        .then(e => {
          const index = Dia.dataTable.map(e => e.id).indexOf(id)
          Dia.dataTable[index] = obj
          Dia.DialogClose()
        })
    }
  }

  const Dia = {
    dialogOpen: dialogOpen,
    page: page,
    pageLimit: pageLimit,
    dataTable: dataTable,
    setDialogOpen: setDialogOpen,
    setDataTable: setDataTable,
    setPage: setPage,
    setPageLimit: setPageLimit,
    DialogOpen: DialogOpen,
    DialogClose: DialogClose,
    obj, setObj,
    CRUD,
    baseUrl,
    apiUrl,
    pageNum, setpageNum,
    search, setSearch,
  }

  function add1000() {

    function rand(arr) {
      const r = (Math.random() * arr.length - 1) | 0
      return arr[r]
    }

    function registrar() {
      // rand(macro)
      let total = (Math.random() * 100) | 0
      const obj = {
        'Macro': rand(Informations.List.macro),
        'Tipo de ampola': rand(Informations.List.ampoule),
        'Status': rand(Informations.List.status),
        'Total de ampolas': total,
        'Município': rand(Informations.List.counties),
        'Município recebido': rand(Informations.List.counties),
        'Município transferido': rand(Informations.List.counties),
      }

      fetch('http://localhost:3000/result/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
    }

    for (let i = 0; i < 1000; i++) {
      registrar()
      console.log(i)
    }
  }

  return (
    <Context.Provider value={Dia}>
      <AppToolbar />
      <AppContainer>
        <Button variant="contained" onClick={btRegisterFields}>Cadastrar</Button>
        {/* <Button style={{ marginLeft: 10 }} variant="contained" onClick={add1000}>Add 1000 registros</Button> */}
        <AppInputFilter />
        <AppTable />
        <AppDialogFields />
      </AppContainer>
    </Context.Provider>
  )
}

export default App
