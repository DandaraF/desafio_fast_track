# Desafio Fast Track - Imã Tech

## SharpCoders - Desafio de HTML, CSS, Bootstrap e JS

Desolvedor um sistema para gerenciamento de tarefas utilizando: HTML, CSS, JavaScript e Bootstrap.

### Critérios de aceite

O projeto deverá ser responsivo e possui duas telas, uma de login e uma de listagem das tarefas.

As informações referentes ao gerenciamento das tarefas serão:

- Título da tarefa
- Data de início
- Horário de início
- Data de término
- Horário de término
- Descrição da tarefa

Na listagem das tarefas, deverá ter um status para indicar se determinada tarefa foi concluída ou não, você deve implementar os seguintes status:

- Pendente: Quando a tarefa ainda não foi feita.
- Em andamento: Quando a tarefa se encontra no prazo de início de término estipulado.
- Realizada: Quando é especificada que a tarefa foi feita.
- Em Atraso: Quando a tarefa não foi realizada no prazo estabelecido.

Estrutura em funcionamento: 

- Ao realizar o login ou a criação de uma conta deverá ir para a página gerenciador de tarefas:
- Na tabela, ao clicar no nome da tarefa, deverá abrir um modal contendo a descrição dela

- Ainda na tabela, haverá um botão para alterarmos as nossas tarefas, ao clicar neste botão, o formulário deverá preencher com os dados da tarefa, além de exibirmos novos botões, contendo as seguintes ações:
    - Alterar tarefa
    - Remover tarefa
    - Marcar como realizada
    - Cancelar
   
   Independente do status que estiver a tarefa (pendente, em andamento ou atraso), podemos alterar seu status para realizada.

 - Tarefas que foram realizadas, ao invés de ter o botão **Marcar como realizada**, deverá ter um outro botão **Marcar como não realizada**, ao   clicar, a tarefa deve voltar ao status condizente com as datas informadas (pendente, não realizada ou em andamento).

 - Na barra superior, onde temos o nome e o link para sair, será obrigatório:

- Exibir uma mensagem contendo o nome do cliente (você define a mensagem).
- Criar um link para sair, onde volta para a página inicial, contendo o formulário de autenticação e criação de conta.
