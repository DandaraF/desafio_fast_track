const input_tarefa = document.getElementById("input_tarefa");
const dt_inicio = document.getElementById("dt_inicio");
const hr_inicio = document.getElementById("hr_inicio");
const dt_termino = document.getElementById("dt_termino");
const hr_termino = document.getElementById("hr_termino");
const descricao = document.getElementById("descricao");
let listaTarefas = document.getElementById("listaTarefas");

let dbTarefas = [];

let tarefa = {
    "tarefa": input_tarefa.value,
    "dt_inicio": dt_inicio.value,
    "hr_inicio": hr_inicio.value,
    "dt_termino": dt_termino.value,
    "hr_termino": hr_termino.value,
    "descricao": descricao.value
}


//Funções

function adicionarTarefa() {
    let tamanho =  dbTarefas.length;

    let tarefa = {
        "nome": input_tarefa.value,
        "dt_inicio": dt_inicio.value,
        "hr_inicio": hr_inicio.value,
        "dt_termino": dt_termino.value,
        "hr_termino": hr_termino.value,
        "descricao": descricao.value,
        "id": tamanho + 1
    }
    dbTarefas.push(tarefa);
    // salvarTarefasLocalStorage(dbTarefas);
    renderizarListaTarefaHtml();
}
function alterarTarefa(id){
    console.log(id)
}
function renderizarListaTarefaHtml() {
    listaTarefas.innerHTML = '';
    for(let i=0; i < dbTarefas.length; i++) {
        let tr = criarTagTr(dbTarefas[i]);
        listaTarefas.appendChild(tr);
    } 
    // input_tarefa.value = '';  
}

function criarTagTr(tarefa){
    let tr = document.createElement('tr');
    tr.id = tarefa.id;

    let td_nome = document.createElement('td');
    let td_inicio = document.createElement('td');
    let td_termino = document.createElement('td');
    let td_status = document.createElement('td');
    let td_btn = document.createElement('td');

    let btn_alterar = document.createElement('button');
    btn_alterar.setAttribute('class','btn btn-warning');
    btn_alterar.innerHTML = 'Alterar';

    btn_alterar.setAttribute('onclick', 'alterarTarefa('+tarefa.id+')');
    
    td_nome.innerText = tarefa.nome;
    td_inicio.innerText = `${tarefa.dt_inicio} às ${tarefa.hr_inicio}`;
    td_termino.innerText = `${tarefa.dt_termino} às ${tarefa.hr_termino}`;
    td_status.innerText = tarefa.status;
    td_btn.appendChild(btn_alterar);

    tr.appendChild(td_nome);
    tr.appendChild(td_inicio);
    tr.appendChild(td_termino);
    tr.appendChild(td_status);
    tr.appendChild(td_btn)

    return tr;

    // listaTarefas.innerHTML += `
    // <tr>
    //     <td >${tarefa.nome}</td>
    //     <td>${tarefa.dt_inicio} às ${tarefa.hr_inicio}</td>
    //     <td>${tarefa.dt_termino} às ${tarefa.hr_termino}</td>
    //     <td>${tarefa.status}</td>
    //     <td><button type="button" class="btn btn-warning" onclick=alterarTarefa(${tarefa.id})>Alterar</button></td>
    // </tr>
    // `;
}

function salvarTarefasLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbTarefas));
}


//<tr>
/* 
<td >1</td>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
<td>
    <button type="button" class="btn btn-warning">Alterar</button>
</td>
</tr> */