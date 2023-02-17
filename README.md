Na minha lista de afazeres eu utilizei NodeJS, React, Banco de dados MongoDB, JavaScript, StyledComponents e outras bibliotecas que auxiliam na segurança como jwt e jsonwebtoken.

Minha aplicação contém cadastro, login e a lista de afazeres.

Para iniciar a aplicação é necessário entrar na rota do server com o comando:
'cd server'
e em seguida rodar o comando:
'yarn start'
para iniciar o servidor.

Após isso, abrir outra aba no terminal e rodar o comando:
'cd app'
e em seguida rodar o comando:
'yarn start'

A rota de cadastro irá pedir seu Nome, E-mail, Senha e Confirmar senha. A senha precisa ter no mínimo 8 caracteres, incluindo números, letras, ao menos uma letra maiúscula e algum caractere especial.

No login você precisa informar sua senha e email do cadastro.

Na página principal da lista, após o login, você poderá criar uma tarefa, editar, deletar e visualizar as tarefas sendo renderizadas automaticamente. Ao dar f5 na tela, elas persistem pois, utilizar estados para armazenar as tarefas do banco de dados. Bem como armazenei o token e o id do usuário no localstorage.
