'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


    const tempClient = {
        nome: 'Deivison',
        email:'DeivisonJohnny@gmail.com',
        celular: '23232323',
        cidade: 'Barra',
}

    // CRUID - create read update delete

    const createCliente = (client) => {
        localStorage.setItem("db_cliente", JSON.stringify( client))

    }
    //Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
