import React from 'react';

import './style.css';

const ListItem = (props)=> {
    return(
        <article className="list-item">
            <p>{`O colaborador ${props.employee} portador do CPF: ${props.cpf} trará ${props.item} para o café da manhã.`}</p>
        </article>
    );
}

export default ListItem;