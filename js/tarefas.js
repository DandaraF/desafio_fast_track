const input_tarefa = document.getElementById("input_tarefa");
const dt_inicio = document.getElementById("dt_inicio");
const hr_inicio = document.getElementById("hr_inicio");
const dt_termino = document.getElementById("dt_termino");
const hr_termino = document.getElementById("hr_termino");
const descricao = document.getElementById("descricao");
// const status_tarefa = document.querySelector("#status_tarefa");
let listaTarefas = document.getElementById("listaTarefas");

const KEY_LOCAL_STORAGE = 'listaDeTarefas';
const KEY_USER_ID = 'idUser';
const KEY_USER_NAME = 'nameUser';

let dbTarefas = [];
let user_id = -1;

pegarUsuarioIdLocalStorage();
listarTarefasLocalStorage();
renderizarListaTarefaHtml();
selecionarNomeUsuario();

let tarefa = {
    "tarefa": input_tarefa.value,
    "dt_inicio": dt_inicio.value,
    "hr_inicio": hr_inicio.value,
    "dt_termino": dt_termino.value,
    "hr_termino": hr_termino.value,
    "descricao": descricao.value,
    "id_usuario": user_id
}

let tipos_status = {
    pendente: "Pendente",
    andamento: "Andamento",
    realizada: "Realizada",
    atraso: "Em abraso"
}

function listarTarefasLocalStorage() {
    if (localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbTarefas = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));

    }
}

function selecionarNomeUsuario() {
    const nome_usuario = document.querySelector("#nome-usuario");
    nome_usuario.innerHTML = `
    <img src="assets/img/user.png" alt="Usuario"/>
    ${localStorage.getItem(KEY_USER_NAME)}`
}

function pegarUsuarioIdLocalStorage() {
    user_id = JSON.parse(localStorage.getItem(KEY_USER_ID));
}

function formatarData(data) {
    const dataCriada = new Date(data);
    return dataCriada.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function selecionarStatus(dt_inicio, dt_termino) {
    const hoje = new Date();

    horaMinutoAtual = hoje.getHours() + ":" + hoje.getMinutes();

    let dataAtual = new Date(formatarDataFormatoInputDate(hoje.toLocaleDateString()));
    let data_inicio = new Date(formatarDataFormatoInputDate(dt_inicio));
    let data_termino = new Date(formatarDataFormatoInputDate(dt_termino));

    if (data_termino < dataAtual) return tipos_status.atraso;
    if (data_inicio > dataAtual) return tipos_status.pendente;
    if (data_inicio <= dataAtual && data_termino > dataAtual) return tipos_status.andamento;
}

function selecionarDadosForm() {
    inicio = formatarData(dt_inicio.value);
    termino = formatarData(dt_termino.value);

    let tarefa = {
        "nome": input_tarefa.value,
        "dt_inicio": inicio,
        "hr_inicio": hr_inicio.value,
        "dt_termino": termino,
        "hr_termino": hr_termino.value,
        "descricao": descricao.value,
        "id_usuario": user_id,
        "status": ''
    }

    return tarefa
}

function verificarInputVazios() {
    let inputs = [input_tarefa.value, dt_inicio.value, hr_inicio.value, dt_termino.value, hr_termino.value, descricao.value]

    if (inputs[0] == '' || inputs[1] == '' || inputs[2] == '' || inputs[3] == '' || inputs[4] == '' || inputs[5] == '') {
        alert("Preencha todos os campos!")
    }
    else {
        return true;
    }
}

function cadastrarTarefa() {
    input_preenchidos = verificarInputVazios();

    if (input_preenchidos) {
        tarefa = selecionarDadosForm();

        tarefa.id = dbTarefas.length + 1,
            tarefa.status = selecionarStatus(tarefa.dt_inicio, tarefa.dt_termino);

        dbTarefas.push(tarefa);
        salvarTarefasLocalStorage(dbTarefas);
        renderizarListaTarefaHtml();

        alert("Tarefa cadastrada com sucesso!")
    }

}

function limparInput() {
    input_tarefa.value = '';
    dt_inicio.value = '';
    hr_inicio.value = '';
    dt_termino.value = '';
    hr_termino.value = '';
    descricao.value = '';
}

function renderizarListaTarefaHtml() {
    listaTarefas.innerHTML = '';
    for (let i = 0; i < dbTarefas.length; i++) {
        if (dbTarefas[i].id_usuario == user_id) {
            let tr = criarTagTr(dbTarefas[i]);
            listaTarefas.appendChild(tr);
        }
    }
    limparInput();
}

function modal() {
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");

    [modal, fade].forEach((el) => el.classList.toggle("hide"));

}

function pegarTarefaPeloId(id) {
    for (i = 0; i < dbTarefas.length; i++) {
        if (dbTarefas[i].id == id && dbTarefas[i].id_usuario == user_id) {
            return dbTarefas[i];
        }
    }
}

function abrirModalInfo(id) {
    modal();

    const nome = document.querySelector(".nome-tarefa");
    const descricao = document.querySelector(".descricao-tarefa");

    tarefa = pegarTarefaPeloId(id)

    nome.innerText = tarefa.nome;
    descricao.innerText = tarefa.descricao;

}

function criarTagTr(tarefa) {
    let tr = document.createElement('tr');
    tr.id = tarefa.id;

    let td_nome = document.createElement('td');
    let td_inicio = document.createElement('td');
    let td_termino = document.createElement('td');
    let td_status = document.createElement('td');
    let td_btn = document.createElement('td');

    [td_nome, td_inicio, td_termino, td_status].forEach((i) => {
        i.setAttribute('onclick', 'abrirModalInfo(' + tarefa.id + ')')
    })

    let btn_alterar = document.createElement('button');
    btn_alterar.setAttribute('class', 'btn btn-warning btn-alterar');
    btn_alterar.innerHTML = 'Alterar';

    btn_alterar.setAttribute('onclick', 'editarTarefa(' + tarefa.id + ')');

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

function formatarDataFormatoInputDate(data) {
    return data.replaceAll('/', '-').split('-').reverse().join('-');
}

function marcarTarefa(realizado, dt_inicio, dt_termino) {
    if (realizado) {
        tarefa.status = tipos_status.realizada;
    } else {
        tarefa.status = selecionarStatus(dt_inicio, dt_termino);
    }
}

function editarTarefa(id) {
    let btnCriarTarefa = document.querySelector("#btn-criar-tarefa");
    let containerButtonsAlterar = document.querySelector("#buttons-alterar");
    let btnMudarStatus = document.querySelector("#btn-mudar-status");
    let id_tarefa = document.querySelector("#id_tarefa");
    let status_tarefa = document.querySelector("#status_tarefa");

    btnCriarTarefa.setAttribute('class', 'hide-criar-tarefa');
    containerButtonsAlterar.setAttribute('class', 'hide-buttons')

    let tarefa = pegarTarefaPeloId(id)

    if (tarefa.status == tipos_status.realizada) {
        btnMudarStatus.innerHTML = `Marcar como não realizada`

    } else {
        btnMudarStatus.innerHTML = `Marcar como realizada`
    }

    input_tarefa.value = tarefa.nome;
    dt_inicio.value = formatarDataFormatoInputDate(tarefa.dt_inicio);
    hr_inicio.value = tarefa.hr_inicio;
    dt_termino.value = formatarDataFormatoInputDate(tarefa.dt_termino);
    hr_termino.value = tarefa.hr_termino;
    descricao.value = tarefa.descricao;
    id_tarefa.value = tarefa.id;
    status_tarefa.value = tarefa.status;

}

function salvarAlteracaoTarefa() {
    let confirmacao = window.confirm('Tem certeza que deseja alterar a tarefa? ');

    if (confirmacao) {
        tarefa = selecionarDadosForm();
        tarefa.id = document.querySelector("#id_tarefa").value;
        tarefa.status = document.querySelector("#status_tarefa").value;

        for (i = 0; i < dbTarefas.length; i++) {
            if (dbTarefas[i].id == tarefa.id) {
                dbTarefas[i] = tarefa;
            }
        }

        salvarTarefasLocalStorage(dbTarefas);
        listarTarefasLocalStorage();
        renderizarListaTarefaHtml();

        sairModoEdicao();
        alert("Tarefa alterada com sucesso!");
    }


}

function excluirTarefa() {
    let confirmacao = window.confirm('Tem certeza que deseja excluir a tarefa?');

    if (confirmacao) {
        let id_tarefa = document.querySelector("#id_tarefa").value;
        for (i = 0; i < dbTarefas.length; i++) {
            if (dbTarefas[i].id == id_tarefa && dbTarefas[i].id_usuario == user_id) {
                let index = dbTarefas.indexOf(dbTarefas[i])
                dbTarefas.splice(index, 1)
            }
        }

        salvarTarefasLocalStorage(dbTarefas);
        listarTarefasLocalStorage();
        renderizarListaTarefaHtml();

        sairModoEdicao()
        alert("Tarefa excluida com sucesso!");
    }

}

function sairModoEdicao() {
    let btnCriarTarefa = document.querySelector("#btn-criar-tarefa");
    let containerButtonsAlterar = document.querySelector("#buttons-alterar");

    btnCriarTarefa.setAttribute('class', 'btn-criar-tarefa');
    containerButtonsAlterar.setAttribute('class', 'container-buttons-alterar hide-buttons');

    limparInput();
}


function mudarStatusTarefa() {
    let confirmacao = window.confirm('Tem certeza que deseja alterar o status da tarefa? ');

    if (confirmacao) {
        let status = document.querySelector("#status_tarefa").value

        tarefa = selecionarDadosForm();
        tarefa.id = document.querySelector("#id_tarefa").value;

        if (status == tipos_status.realizada) {
            tarefa.status = selecionarStatus(tarefa.dt_inicio, tarefa.dt_termino);
        } else {
            tarefa.status = tipos_status.realizada;
        }

        for (i = 0; i < dbTarefas.length; i++) {
            if (dbTarefas[i].id == tarefa.id) {
                dbTarefas[i] = tarefa;
            }
        }

        salvarTarefasLocalStorage(dbTarefas);
        listarTarefasLocalStorage();
        renderizarListaTarefaHtml();
        sairModoEdicao();

        alert("Status alterado com sucesso!");
    }

}
