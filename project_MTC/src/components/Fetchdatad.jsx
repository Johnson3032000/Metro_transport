import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {

    const [data, setData] = useState([]);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/transports")
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log(error));
    }, []);



    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}