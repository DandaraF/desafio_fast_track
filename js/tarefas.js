const input_tarefa = document.getElementById("input_tarefa");
const dt_inicio = document.getElementById("dt_inicio");
const hr_inicio = document.getElementById("hr_inicio");
const dt_termino = document.getElementById("dt_termino");
const hr_termino = document.getElementById("hr_termino");
const descricao = document.getElementById("descricao");
let listaTarefas = document.getElementById("listaTarefas");

const KEY_LOCAL_STORAGE = 'listaDeTarefas';

let dbTarefas = [];

listarTarefasLocalStorage();
renderizarListaTarefaHtml();

let tarefa = {
    "tarefa": input_tarefa.value,
    "dt_inicio": dt_inicio.value,
    "hr_inicio": hr_inicio.value,
    "dt_termino": dt_termino.value,
    "hr_termino": hr_termino.value,
    "descricao": descricao.value
}

let tipos_status = {
    pendente: "Pendente",
    andamento: "Andamento",
    realizada: "Realizada",
    atraso: "Em abraso"
}

//Funções
function listarTarefasLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbTarefas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
        console.log("executei")
    }  
}


function formatarData(data){
    const dataCriada= new Date(data);
    return dataCriada.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

function selecionarStatus(tarefa){
    const hoje = new Date();
    dataAtual = hoje.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    horaMinutoAtual = hoje.getHours() +":" + hoje.getMinutes();
    
    // Inicio: 21/11  > atual: 20/11 - vai acontecer
    if(tarefa.dt_inicio > dataAtual ){
        tarefa.status = tipos_status.pendente;
    }
    // Inicio: 19/11  < atual: 20/11 - já está acontecendo
    if(tarefa.dt_inicio < dataAtual && tarefa.dt_termino < dataAtual){
        tarefa.status = tipos_status.andamento;
    }
    // Inicio: 19/11  < atual: 20/11 - já está acontecendo
    if(tarefa.dt_termino  < dataAtual ){
        tarefa.status = tipos_status.andamento;
    }

}

function adicionarTarefa() {
    let tamanho =  dbTarefas.length;

    inicio = formatarData(dt_inicio.value);
    termino = formatarData(dt_termino.value);


    let tarefa = {
        "nome": input_tarefa.value,
        "dt_inicio": inicio,
        "hr_inicio": hr_inicio.value,
        "dt_termino": termino,
        "hr_termino": hr_termino.value,
        "descricao": descricao.value,
        "id": tamanho + 1
    }
    selecionarStatus(tarefa)
    // tarefa.status = selecionarStatus(tarefa);

    dbTarefas.push(tarefa);
    salvarTarefasLocalStorage(dbTarefas);
    renderizarListaTarefaHtml();
}
function alterarTarefa(id){
    console.log(id)
}

function limparInput(){
    input_tarefa.value='';
    dt_inicio.value = '';
    hr_inicio.value = '';
    dt_termino.value = '';
    hr_termino.value = '';
    descricao.value = '';
}

function renderizarListaTarefaHtml() {
    listaTarefas.innerHTML = '';
    for(let i=0; i < dbTarefas.length; i++) {
        let tr = criarTagTr(dbTarefas[i]);
        listaTarefas.appendChild(tr);
    } 
    
    limparInput();

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
}

function salvarTarefasLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbTarefas));
}


