import { useEffect, useState } from "react";

type UseLocalStorage = {
    key: string,
    fallbackState: any
}

export const useLocalStorage = ({key,fallbackState}:UseLocalStorage) => {

    const [value,setValue] = useState<any>(()=>{
        const valueInStorage = localStorage.getItem(key);
        return valueInStorage ? JSON.parse(valueInStorage) : fallbackState 
    }
    );

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[value,key])

    return [value, setValue];
};