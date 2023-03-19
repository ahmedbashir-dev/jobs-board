import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY, RAPID_API_HOST} from "@env";

const rapidApiKey = RAPID_API_KEY;
const rapidApiHost = RAPID_API_HOST;
const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

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
