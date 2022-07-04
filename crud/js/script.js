const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCDC = document.querySelector('#m-CDC')
const sROTA = document.querySelector('#m-ROTA')
const sGRUPO = document.querySelector('#m-GRUPO')
const sCDCV = document.querySelector('#m-CDCV')
const sDATA = document.querySelector('#m-DATA')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCDC.value = itens[index].CDC
    sROTA.value = itens[index].ROTA
    sGRUPO.value = itens[index].GRUPO
    sCDCV.value = itens[index].CDCV
    sDATA.value = itens[index].DATA
    id = index
  } else {
    sCDC.value = ''
    sROTA.value = ''
    sGRUPO.value = ''
    sCDCV.value = ''
    sDATA.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.cdc}</td>
    <td>${item.rota}</td>
    <td>${item.grupo}</td>
    <td>${item.cdcv}</td>
    <td>${item.data}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sCDC.value == '' || sROTA.value == '' || sGRUPO.value == '' || sCDCV.value == '' || sDATA.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].cdc = sCDC.value
    itens[id].rota = sROTA.value
    itens[id].grupo = sGRUPO.value
    itens[id].cdcv = sCDCV.value
    itens[id].data = sDATA.value
  } else {
    itens.push({'cdc': sCDC.value, 'rota': sROTA.value, 'grupo': sGRUPO.value, 'cdcv': sCDCV.value, 'data': sDATA.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()