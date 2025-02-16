import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url,mode, body) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
    
        const config = {
            method: mode,
            url: url,
            ...(mode === "post" && { data: body })
        };
    
        axios(config)
            .then(response => setData(response.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false)); 
    
    }, [url, mode, body]);
    return {data, loading, error}
}

export default useFetch;