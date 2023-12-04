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
function verificarSeEmailEstaCadastrado(email){
    for(i=0; i< dbLogins.length; i++){
        if(dbLogins[i].email == email){
            return true;
        }
    }
}

function cadastrarUsuario(){
    usuario = selecionarDadosForm();

    emailCadastrado = verificarSeEmailEstaCadastrado(usuario.email);

    if(usuario.nome == '' || usuario.email == ''  || usuario.senha == ''){
        alert("Preencha todos os campos!");
    }else{
        if(emailCadastrado){
            alert("E-mail já cadastrado!");
        }else{
                
                usuario.id_usuario = dbLogins.length + 1;
            
                dbLogins.push(usuario);
                salvarUsuarioLocalStorage(usuario);
    
                alert("Usuário cadastrado com sucesso!")

                nome_registro.value = '';
                email_registro.value = '';
                senha_registro.value = '';

        }
    }
}



function salvarUsuarioLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(dbLogins));
}

function validarUser(){
    let email_input = document.getElementById('email_login').value;
    let senha_input = document.getElementById('password_login').value;

    for(i=0; i< dbLogins.length; i++){
        if(dbLogins[i].email == email_input && dbLogins[i].senha == senha_input){
            return dbLogins[i]
        }
    }
}

function logar(){
    usuario_info = validarUser();
    if(usuario_info){
        localStorage.setItem('idUser', usuario_info.id_usuario)
        localStorage.setItem('nameUser', usuario_info.nome)
        window.location.href = "tarefas.html";
    }else{
        alert("E-mail e/ou senha inválido!")
    }

}

function listarUsuariosLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        dbLogins = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }  
}