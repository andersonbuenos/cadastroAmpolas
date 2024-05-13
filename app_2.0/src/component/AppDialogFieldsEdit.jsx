// import { Dialog, DialogTitle } from '@mui/material'
import { useContext, useEffect, useState } from 'react';

import AppSelect from './AppSelect'
import AppDialog from './AppDialog';

import {
    TextField,
    Button,
} from '@mui/material'


import Informations from '../Informations'
import Context from '../Context';


function AppDialogFields() {

    const Dia = useContext(Context)

    const [countyList, setCountyList] = useState([])

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios')
            .then(e => e.json())
            .then(e => {
                const lista = []
                e.map(g => {
                    lista.push(g.nome)
                    Informations.List.counties = lista
                    // setCountyList(lista)
                })
            })
            .catch(err => {
                setCountyList(Informations.List.counties)
            })
    }, [])

    // const macroList = ['Campo Grande', 'Corumbá', 'Dourados', 'Três Lagoas']
    // const statusList = ['Geladeira', 'Transferido', 'Recebido', 'Descartado']
    // const apouleList = ['Antibotrópico', 'Antielapédico', 'Antiloxoscélico', 'Antilbotrópico']

    const FlexBetween = ({ children }) => {
        return (
            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                {children}
            </section>
        )
    }

    const btRegister = () => {
        // Dia.DialogClose()

        if (sessionStorage['Macro'] == 'undefined' || sessionStorage['Macro']?.length == 0) alert('O campo <Macro> está vazio')

        const obj = {
            "Macro": sessionStorage['Macro'] || '',
            "Tipo de ampola": sessionStorage['Tipo de ampola'] || '',
            "Status": sessionStorage['Status'] || '',
            "Total de ampolas": sessionStorage['Total de ampolas'] || '',
            "Município": sessionStorage['Município'] || '',
            "Município recebido": sessionStorage['Município recebido'] || '',
            "Município transferido": sessionStorage['Município transferido'] || ''
        }


        if (obj['Macro'].length == 0) { alert('O campo <Macro> está vazio'); return }
        if (obj['Tipo de ampola'].length == 0) { alert('O campo <Tipo de ampola> está vazio'); return }
        if (obj['Status'].length == 0) { alert('O campo <Status> está vazio'); return }
        if (obj['Total de ampolas'].length == 0) { alert('O campo <Total de ampolas> está vazio'); return }
        if (obj['Município'].length == 0) { alert('O campo <Município> está vazio'); return }
        // if(obj['Município recebido'].length == 0) {alert('O campo <Município recebido> está vazio'); return}
        // if(obj['Município transferido'].length == 0) {alert('O campo <Município transferido> está vazio'); return}


        // fetch

        Dia.createData(obj)



        Dia.DialogClose()
    }

    function changeInput(e, label) {
        e.target.value = e.target.value.replace(/\D/g, "")
        // sessionStorage.setItem(name, event.target.value)
        sessionStorage.setItem(label, e.target.value);
    }

    return (
        <AppDialog>
            <AppSelect countyList={Informations.List.macro} name='Macro' />
            <AppSelect required countyList={Informations.List.ampoule} name='Tipo de ampola' />
            <AppSelect required countyList={Informations.List.status} name='Status' />
            <TextField required sx={{ my: 1 }} label="Total de ampolas" variant="outlined" fullWidth onChange={(e) => changeInput(e, 'Total de ampolas')} />
            <AppSelect required countyList={Informations.List.counties} name='Município' />
            <AppSelect required countyList={Informations.List.counties} name='Município recebido' />
            <AppSelect countyList={Informations.List.counties} name='Município transferido' />

            <FlexBetween>
                <Button variant="contained" onClick={btRegister}>Cadastrar</Button>
                <Button color='secondary' variant="contained" onClick={Dia.DialogClose}>Cancelar</Button>
            </FlexBetween>


        </AppDialog>
    );
}

export default AppDialogFields