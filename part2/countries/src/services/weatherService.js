import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const get = (country) => {
    const encodedCountry = encodeURIComponent(country);
    const url = `${baseURL}${encodedCountry}&appid=${apiKey}`;
    const request = axios.get(url);
    return request
                .then(response => {return response.data})
                .catch(error => {
                    if (error.response && error.response.status === 404){
                        return "Not information available";
                    }
                    else{
                        throw error;
                    }
                });
}

export default {get}