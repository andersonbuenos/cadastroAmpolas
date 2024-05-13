// import * as React from 'react';
import { useContext, useEffect, useState } from 'react'

import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import Context from '../Context';

export default function AppSelect({ countyList, name = 'Lista', onChange=()=>{}, value=''}) {

    const [age, setAge] = useState('');
    const Dia = useContext(Context)

    const handleChange = (event) => {
        setAge(event.target.value);
        

        Dia.obj[name] = event.target.value


        onChange()
    };

    useEffect(()=>{
        if(age != value)
            setAge(value);
    }, [value])

   

    return (
        <div>
            <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth >
                <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label={name}
                    onChange={handleChange}
                >

                    {countyList.map((e, i) =>
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}




