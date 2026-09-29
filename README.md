# p1-nivaldo-4modulo

API de Ordem de Serviço baseada no projeto `pj_pet_get` do professor Nivaldo.
Utiliza CommonJS, Express, Sequelize, MySQL, bcrypt, JWT e express-validator,
com a mesma divisão entre models, controllers, routes e helpers do material.

A entidade do problema é Ordem de Serviço. A tabela `users` é auxiliar para
cadastro e login, como no ZIP, usando somente nome, e-mail e senha.
Qualquer usuário cadastrado e autenticado pode acessar todas as ordens.

## Executar

1. Instale as dependências com `npm install`.
2. Com o MySQL iniciado, crie o banco:

   ```sql
   CREATE DATABASE IF NOT EXISTS `p1-nivaldo-4modulo`;
   ```

3. Confira usuário, senha, host e porta em `src/db/conn.js`.
4. O `.env` local já tem uma chave `CHAVETOKEN` gerada. Em outra máquina,
   copie `.env.example` para `.env` e substitua o valor por uma chave secreta.
5. Execute `npm start`. A API atende em `http://localhost:3030`.

O `conn.sync()` cria as tabelas a partir dos models. Ele não cria o banco.
O `.env` é ignorado pelo Git para não publicar o segredo.

## Rotas

| Método | Caminho | Função | Exige token |
| --- | --- | --- | --- |
| POST | `/users/register` | Cadastrar usuário | Não |
| POST | `/users/login` | Fazer login e obter token | Não |
| POST | `/ordens-servico` | Criar ordem | Sim |
| GET | `/ordens-servico` | Listar ordens | Sim |
| GET | `/ordens-servico/:id` | Consultar uma ordem | Sim |
| DELETE | `/ordens-servico/:id` | Excluir uma ordem | Sim |

## Testar no Postman ou Insomnia

Use `Content-Type: application/json` nas requisições com corpo.

Primeiro, envie um POST para `/users/register`:

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "senha123"
}
```

Depois, envie um POST para `/users/login`:

```json
{
  "email": "maria@example.com",
  "password": "senha123"
}
```

A resposta contém `token`. Copie esse valor e configure a autenticação
como **Bearer Token** para acessar as rotas de Ordem de Serviço.
Isso envia o cabeçalho `Authorization: Bearer SEU_TOKEN`.

Envie um POST para `/ordens-servico`:

```json
{
  "nome_cliente": "João",
  "nome_funcionario": "Maria",
  "servico": "Manutenção de computador",
  "valor_servico": "150.00",
  "status": "Aberta"
}
```

O valor permanece como texto, conforme a model original. Informe um número
não negativo, com ponto como separador decimal. O ID é gerado pelo Sequelize.
Use o ID retornado para consultar ou excluir, por exemplo `/ordens-servico/1`.

## Como o código funciona

- **Model:** define os campos da tabela; é como a ficha preenchida para cada ordem.
- **Routes:** relacionam o endereço e o método HTTP ao controller correspondente.
- **Controllers:** recebem os dados, consultam ou alteram o banco e retornam JSON.
- **Validators:** verificam os dados antes de executar o controller.
- **bcrypt:** transforma a senha em um hash no cadastro e compara esse hash no login.
- **JWT:** funciona como um comprovante de login. O helper `verify-token.js`
  confere a assinatura antes de liberar as rotas de ordens.

`CHAVETOKEN` é o segredo usado para assinar e verificar o JWT; ela não é o token
enviado pelo cliente. O token é gerado ao fazer login. Assim como no ZIP,
o token não tem prazo de expiração configurado.
