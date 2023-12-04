const nome_registro = document.getElementById("name_register");
const email_registro = document.getElementById("email_register");
const senha_registro = document.getElementById("password_register");

const KEY_LOCAL_STORAGE = 'listaDeLogin';
let dbLogins = [];


listarUsuariosLocalStorage();

let cadastro = {
    "nome": nome_registro.value,
    "email": email_registro.value,
    "senha": senha_registro.value
}

function selecionarDadosForm(){
    let usuario = {
        "nome": nome_registro.value,
        "email": email_registro.value,
        "senha": senha_registro.value,
    }

    return usuario
}

function cadastrarUsuario(){

    let tamanho =  dbLogins.length;
    
    usuario = selecionarDadosForm();
    usuario.id_usuario = tamanho + 1;

    dbLogins.push(usuario);
    salvarUsuarioLocalStorage(usuario);
}

function salvarUsuarioLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbLogins));
}

function logar(){
    let email = document.getElementById('email_login').value;
    let senha = document.getElementById('password_login').value;
    console.log(dbLogins.length)
    for(i=0; i< dbLogins.length; i++){
        if(dbLogins[i].email == email && dbLogins[i].senha == senha){
            window.location.href = "tarefas.html";
            localStorage.setItem('idUser', dbLogins[i].id_usuario)
        }else{
            alert("E-mail e/ou senha inválido(s)");
        }
    }
}


function listarUsuariosLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbLogins = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }  
}