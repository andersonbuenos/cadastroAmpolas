// import { Dialog, DialogTitle } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react';

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

    const FlexBetween = ({ children }) => {
        return (
            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                {children}
            </section>
        )
    }


    const [txt, setTxt] = useState('')

    function changeInput(e) {
        e.target.value = e.target.value.replace(/\D/g, "")
        Dia.obj['Total de ampolas'] = e.target.value
        setTxt(e.target.value)
    }

    useEffect(()=>{
        setTxt(Dia.obj['Total de ampolas'])
    },[Dia.obj])
    
    

    return (
        <AppDialog>

            {/* <input value={Dia.obj['id']}></input> */}
            <AppSelect countyList={Informations.List.macro} name='Macro' value={Dia.obj['Macro']} />
            <AppSelect countyList={Informations.List.ampoule} name='Tipo de ampola' value={Dia.obj['Tipo de ampola']} />
            <AppSelect countyList={Informations.List.status} name='Status' value={Dia.obj['Status']} />
            <TextField sx={{ my: 1 }} label="Total de ampolas" variant="outlined" fullWidth onChange={(e) => {changeInput(e);}} value={txt} />
            <AppSelect countyList={Informations.List.counties} name='Município' value={Dia.obj['Município']} />
            {/* <AppSelect countyList={Informations.List.counties} name='Município recebido' value={Dia.obj['Município recebido']} />
            <AppSelect countyList={Informations.List.counties} name='Município transferido' value={Dia.obj['Município transferido']} /> */}
            <AppSelect countyList={Informations.List.counties} name='Município recebido' value={Dia.obj['Município recebido']} disabled={Dia.obj['Status'] === 'Transferido'} />
            <AppSelect countyList={Informations.List.counties} name='Município transferido' value={Dia.obj['Município transferido']} disabled={Dia.obj['Status'] === 'Recebido'} />


            
            
            <FlexBetween>
                {/* <Button variant="contained" onClick={btRegister}>Cadastrar</Button> */}

                {/* <Button variant="contained" onClick={Dia.CRUD.create}>Cadastrar</Button> */}
                
                {
                    Dia.obj['id'] ? (
                        <Button variant="contained" onClick={Dia.CRUD.edit}>CONFIRMAR EDIÇÃO</Button>
                    ) : (
                        <Button variant="contained" onClick={Dia.CRUD.create}>CONFIRMAR CADASTRO</Button>
                    )
                }
                

                {/* <Button variant="contained" onClick={Dia.CRUD.readInputs}>Load Id</Button> */}
                <Button color='secondary' variant="contained" onClick={Dia.DialogClose}>Cancelar</Button>
            </FlexBetween>


        </AppDialog>
    );
}

export default AppDialogFields