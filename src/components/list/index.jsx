import React, { useContext } from 'react';
import { ListContext } from '../../context/listContext';
import ListItem from '../listItem';

import './style.css';

const List = ()=> {

    const {items} = useContext(ListContext);
    console.log(items);

    return(
        <section className="list-wrapper">
            {
                items.map(item=> (<ListItem key={item.item} employee={item.employee} cpf={item.cpf} item={item.item} />))
            }
            
        </section>
    );
}

export default List;