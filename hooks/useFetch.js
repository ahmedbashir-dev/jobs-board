import { useState, useEffect } from "react";
import axios from "axios";


const rapidApiKey = "8823589a17msh883dcc7eed14bd4p1883ecjsnbfeaa42a4538";
const rapidApiHost = "jsearch.p.rapidapi.com";
const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
    console.log(rapidApiHost);
    console.log(rapidApiKey);
	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		params: {
			...query
		},
		headers: {
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": rapidApiHost,
		},
	};

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.request(options);
            setData(res.data.data);
        } catch (error) {
            setError(error);
            alert("There is an error");
        }
        finally{
            setIsLoading(false);
        }
    }

	useEffect(()=>{
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
};

export default useFetch;