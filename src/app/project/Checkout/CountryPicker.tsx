import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countryList from './country-list';
import { InputAdornment } from '@mui/material';
import { useState } from '@preact-signals/safe-react/react';
import { shippingCountry } from '@/signals';

export interface Country {
    name: string;
    code: string;
    flag: string;
}

export default function CountrySelect() {
    // const [selected, setSelected] = useState<Country | null>(countryList.find((country) => country.code === 'FR') || null);

    return (
        <Autocomplete
            id="country-select-demo"
            className='pictosso-input'
            value={shippingCountry.value || undefined}
            onChange={(event, newValue) => {
                shippingCountry.value = newValue;
            }}
            disableClearable={true}
            popupIcon={
                <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path opacity="0.4" d="M11 1L6 6L1 1" stroke="black" />
                </svg>
            }
            sx={{
                width: '100%',
                height: '3rem', // fit to parent height
                paddingRight: '0.5rem',
                // padding: '0',
                display: 'flex',
                alignItems: 'center',
                '& .MuiInput-underline': { // remove border
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                },
                '& .MuiInput-input': { // remove outline
                    '&:focus': { outline: 'none' },
                },
                '& .MuiAutocomplete-inputRoot': { // remove border
                    border: 'none',
                    padding: 0,
                    '& fieldset': {
                        border: 'none',
                    },
                },
            }}
            options={countryList}
            autoHighlight
            getOptionLabel={(option) => `${option.name} (${option.code})`}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={option.flag}
                        alt=""
                    />
                    {option.name} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    // label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    InputProps={{
                        ...params.InputProps,

                        startAdornment: <InputAdornment position="start">
                            <img
                                loading="lazy"
                                width="20"
                                height="20"
                                src={shippingCountry.value?.flag}
                                alt=""
                            />
                        </InputAdornment>,
                    }}
                />
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& > img': { mr: 2, flexShrink: 0 },
                        }}
                    >
                        <img
                            loading="lazy"
                            width="20"
                            src={option.flag}
                            alt=""
                        />
                        {option.name} ({option.code})
                    </Box>
                ))
            }
            isOptionEqualToValue={(option, value) => option.code === value.code}
        />
    );
}