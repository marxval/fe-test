import {useEffect, useState} from "react";

type UseData = { 
    url: string,
    defaultValue: any,
    transformData?: (data: any) => any
}

const CACHE:any = {};

export const useData = ({url,defaultValue,transformData}:UseData) => {

    const [data, setData] = useState<any>(defaultValue);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

        setError(false);

        if (CACHE[url] !== undefined) {
            setData(CACHE[url]);
            setLoading(false);
        } else {
            setLoading(true);
        }

        const getData = async () => {
            try {
                const response = await fetch(url);
                let newData = await response.json();
                if (transformData) {
                    newData = transformData(newData)
                }
                CACHE[url] = newData;
                setData(newData)
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getData();

    }, [url, transformData])


    return { data, loading, error }
}