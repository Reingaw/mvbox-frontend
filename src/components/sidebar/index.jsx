import React, { useContext, useState } from 'react';
import {toast, ToastContainer } from 'react-toastify';
import { ListContext } from '../../context/listContext';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Sidebar = ()=> {

    const {items, loadList} = useContext(ListContext);

    const options = { headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',     
    }}

    const [usersItems, setUsersItems] = useState({
        employee: '',
        cpf: '',
        item: ''
    })

    function handleClick(e) {
        e.preventDefault();

        const { employee, cpf, item } = usersItems;

        if(isItemInTheList(item)) {
            toast.error('Alguém já trará este item!');
            return;
        }
        
        if(isUserInTheList(cpf, employee)) {
            saveAnotherItemToAnUser();
        }else {
            saveANewItemAndUser();
        }
        
    }

    function isItemInTheList(bfItem) {
        let itemIsInTheList = false;
        items.forEach(item => {
            if(bfItem === item.item) {
                itemIsInTheList = true;
            }
        });
        return itemIsInTheList;
    }

    function isUserInTheList(cpf, employee) {
        let isInTheList = false;
        items.forEach(item => {
            if(cpf === item.cpf && employee === item.employee) {
                isInTheList = true;
            }
        });
        return isInTheList;
    }

    async function saveAnotherItemToAnUser() {
        try {
            await api.post('/', usersItems, options)
                .then(()=> toast.success('Uau...Mandou bem!'))
                .catch(err=> {
                    if(err.response) {
                        toast.error('Algo deu errado!')
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    }
                })
        } catch (error) {
            console.error(error);
        }

        loadList();
    }

    async function saveANewItemAndUser() {
        /*try {
            await api.post('/', usersItems, options)
                .then(()=> toast.success('Uhull...Outra delícia adicionada!'))
                .catch(err=> {
                    if(err.response) {
                        toast.error('Algo deu errado!');
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    }
                })
        } catch (error) {
            console.error(error);
        }*/
        console.log(usersItems);

        loadList();
    }

    return(
        <section className="sidebar-wrapper">
            <ToastContainer theme={"colored"} />
            <h1 className="sidebar-title">Break Fest</h1>
            <form>
                <input 
                    type="text" 
                    placeholder="Nome do colaborador" 
                    value={usersItems.employee} 
                    onChange={e=> setUsersItems({...usersItems, employee: e.target.value})}
                />

                <input 
                    type="text" 
                    placeholder="CPF do colaborador" 
                    value={usersItems.cpf} 
                    onChange={e=> setUsersItems({...usersItems, cpf: e.target.value})}
                />

                <input 
                    type="text" 
                    placeholder="Item para o café da manhã" 
                    value={usersItems.item} 
                    onChange={e=> setUsersItems({...usersItems, item: e.target.value})}
                />

                <button 
                    id="submitButton" 
                    onClick={(e)=> handleClick(e)}
                >
                    CADASTRAR
                </button>

            </form>
        </section>
    );
}

export default Sidebar;