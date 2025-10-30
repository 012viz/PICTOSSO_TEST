import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { PlaceDetails } from '@/app/api/places/[place_id]/route';
import { autoCompletePlace, shippingAddress, shippingAddressLine1, shippingCity, shippingCountry, shippingStateProvince, shippingZipCode } from '@/signals';
import countryList from './country-list';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyDuxD05Nb6Z-tJtSVUFnseps_puiu4mhss';

const getPlaceDetails: (placeId: string) => Promise<PlaceDetails> = async (placeId) => {
  const url = `/api/places/${placeId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  place_id?: string;
  structured_formatting: StructuredFormatting;
}

export default function GoogleMaps() {
  const [value, setValue] = React.useState<PlaceType | null>(autoCompletePlace.value);
  const [inputValue, setInputValue] = React.useState(shippingAddress.value || '');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      className='pictosso-input'

      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
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
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={async (event: any, newValue: PlaceType | null) => {
        autoCompletePlace.value = newValue;
        if (newValue?.place_id) {
          const details = await getPlaceDetails(newValue.place_id);
          shippingCity.value = details.city;
          shippingStateProvince.value = details.stateProvince;
          shippingZipCode.value = details.zipCode;
          shippingAddressLine1.value = details.addressLine1;
          const country = countryList.find((country) => country.code === details.countryCode)
          if (country) {
            shippingCountry.value = country;
          }
        }
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        shippingAddress.value = newInputValue;
        console.log("shippingAddress", shippingAddress)
        setInputValue(newInputValue);
      }}
      renderInput={(params) => {
        console.log("RENDERINPUT", params)
        return <TextField {...params} placeholder='Search...' fullWidth />
      }}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                {/* <LocationOnIcon sx={{ color: 'text.secondary' }} /> */}

              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}