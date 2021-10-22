import api from '../services/api';

import { createContext, useEffect, useState } from "react";

export const ListContext = createContext();

export function ListProvider({children}) {

    const [items, setItems] = useState([]);

    useEffect(()=> {
        loadList();
    }, []);

    async function loadList() {
        await api.get('/list').then(res=> {
            let arr = [];
            res.data.forEach(element => {
                arr.push(element);
            });

            setItems([...arr]);
        }).catch(err=> {
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        })
    }

    return (
        <ListContext.Provider value={{items, loadList}}>
            {children}
        </ListContext.Provider>
    )
}