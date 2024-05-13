import * as React from 'react';
import { useEffect, useState } from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import {
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select,
} from '@mui/material';



export default function AppSelect({countyList, name='Lista', value}) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // useEffect(()=>{
    //     event.target.value = 'eita'
    // },[value])

    

    return (
        <div>


            <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
                
                <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>

                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label={name}
                    onChange={handleChange}
                    defaultValue="testando"
                >
                    <MenuItem value="">
                        <em></em>
                    </MenuItem>

                    {countyList.map((e,i)=>
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                    )}

                    {/* <MenuItem value={10}>Ten</MenuItem> */}
                    {/* <MenuItem value={20}>Twenty</MenuItem> */}
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}

                </Select>
            </FormControl>

        </div>
    );
}