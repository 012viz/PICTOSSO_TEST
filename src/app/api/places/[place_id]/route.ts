import { NextResponse, NextRequest } from 'next/server';

export interface PlaceDetails {
    city: string;
    stateProvince: string;
    zipCode: string;
    countryCode: string;
    addressLine1: string;
}

function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    // console.log("URL", url)
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extracting address components from the response
            const addressComponents = data.result.address_components;
            // console.log("addressComponents",addressComponents)

            // Extracting city, state/province, zip code, country code, and address line 1 from the address components
            let city, stateProvince, zipCode, countryCode, addressLine1;
            let addressLines = [];

            for (let component of addressComponents) {
                if (component.types.includes('locality')) {
                    city = component.long_name;
                } else if (component.types.includes('administrative_area_level_1')) {
                    stateProvince = component.long_name;
                } else if (component.types.includes('postal_code')) {
                    zipCode = component.long_name;
                } else if (component.types.includes('country')) {
                    countryCode = component.short_name;
                } 
                else if (component.types.includes('street_number')) {
                    addressLines.push(component.long_name); // Add street number
                } else if (component.types.includes('route')) {
                    addressLines.push(component.long_name); // Add street name
                }
            }
            addressLine1 = addressLines.join(" ");

            // Return the retrieved details
            return { city, stateProvince, zipCode, countryCode, addressLine1 };
        })
        .catch(error => {
            console.error('Error fetching place details:', error);
            throw error;
        });
}

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        const { place_id } = params;
        const details = await getPlaceDetails(place_id);
        return NextResponse.json(details, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unable to fetch products' + error });
    }
}
