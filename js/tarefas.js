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
function selecionarDadosForm(){
    inicio = formatarData(dt_inicio.value);
    termino = formatarData(dt_termino.value);

    let tarefa = {
        "nome": input_tarefa.value,
        "dt_inicio": inicio,
        "hr_inicio": hr_inicio.value,
        "dt_termino": termino,
        "hr_termino": hr_termino.value,
        "descricao": descricao.value,
        "id_usuario":0
    }

    return tarefa
}

function cadastrarTarefa() {
    tarefa = selecionarDadosForm()

    let tamanho =  dbTarefas.length;

    tarefa.id = tamanho + 1,

    selecionarStatus(tarefa)
    dbTarefas.push(tarefa);
    salvarTarefasLocalStorage(dbTarefas);
    renderizarListaTarefaHtml();
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

function modal(){
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    [modal, fade].forEach((el) => el.classList.toggle("hide"));

}

function pegarTarefaPeloId(id){
    for(i=0; i<dbTarefas.length; i++){
        if(dbTarefas[i].id == id){
            return dbTarefas[i];
        }
    }
}

function abrirModalInfo(id){
    modal();
    
    const nome = document.querySelector(".nome-tarefa");
    const descricao = document.querySelector(".descricao-tarefa");

    tarefa = pegarTarefaPeloId(id)
    
    nome.innerText = tarefa.nome;
    descricao.innerText = tarefa.descricao;

}

function criarTagTr(tarefa){

    let tr = document.createElement('tr');
    tr.id = tarefa.id;

    console.log("criei a tag tr")

    let td_nome = document.createElement('td');
    let td_inicio = document.createElement('td');
    let td_termino = document.createElement('td');
    let td_status = document.createElement('td');
    let td_btn = document.createElement('td');

    [td_nome, td_inicio, td_termino,td_status].forEach((i) =>{
        i.setAttribute('onclick','abrirModalInfo('+tarefa.id+')')
    })

    let btn_alterar = document.createElement('button');
    btn_alterar.setAttribute('class','btn btn-warning btn-alterar');
    btn_alterar.innerHTML = 'Alterar';

    btn_alterar.setAttribute('onclick', 'editarTarefa('+tarefa.id+')');
  
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

function formatarDataFormatoInputDate(data){
    return data.replaceAll('/', '-').split('-').reverse().join('-');
}

function editarTarefa(id){
    console.log(id)
    let btnCriarTarefa = document.querySelector("#btn-criar-tarefa");
    let containerButtonsAlterar = document.querySelector("#buttons-alterar");
    let id_tarefa = document.querySelector("#id_tarefa");

    btnCriarTarefa.classList.toggle('hide-criar-tarefa');
    containerButtonsAlterar.classList.toggle('hide-buttons')

    let tarefa = pegarTarefaPeloId(id)

    input_tarefa.value = tarefa.nome;
    dt_inicio.value = formatarDataFormatoInputDate(tarefa.dt_inicio);
    hr_inicio.value = tarefa.hr_inicio;
    dt_termino.value = formatarDataFormatoInputDate(tarefa.dt_termino);
    hr_termino.value = tarefa.hr_termino;
    descricao.value = tarefa.descricao;
    id_tarefa.value = tarefa.id;
    
}

function salvarAlteracaoTarefa(){
    tarefa = selecionarDadosForm()
    tarefa.id = document.querySelector("#id_tarefa").value;
    selecionarStatus(tarefa)

    for(i=0; i < dbTarefas.length; i++){
        if (dbTarefas[i].id == tarefa.id){
            dbTarefas[i] = tarefa;
        }
    }

    salvarTarefasLocalStorage(dbTarefas);
    listarTarefasLocalStorage();
    renderizarListaTarefaHtml();

}