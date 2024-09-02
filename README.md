# Projeto: Automação de Testes para GitHub com Puppeteer e Jest

## Descrição

Este projeto realiza a automação de testes para o site do GitHub utilizando Puppeteer e Jest. Ele simula a interação do usuário com o site, desde o acesso à página inicial até o login, criação de repositórios e logout. O padrão de Page Object Model (POM) foi utilizado para organizar o código de forma modular e reutilizável.

## Estrutura do Projeto
* **pages_objects/**: Contém as classes que representam as páginas do GitHub.

    * **githubHomePage.js**: Página inicial do GitHub.
    * **githubLoginPage.js**: Página de login do GitHub.
    * **githubUserPage.js**: Página do usuário autenticado no GitHub.
* **tests/**: Contém os arquivos de testes.

    * **github.test.js**: Contém os testes automatizados.
* **.env**: Arquivo de variáveis de ambiente, onde são armazenados dados sensíveis, como credenciais.

## Tecnologias Utilizadas
* **Puppeteer**: Biblioteca de automação de navegador para realizar a interação com o site.
* **Jest**: Framework de testes utilizado para validar os cenários.
* **Page Object Model (POM)**: Padrão utilizado para representar as páginas e facilitar a manutenção do código.

## Pré-requisitos
1. **Node.js**: Certifique-se de ter o Node.js instalado.
2. **Instalação das Dependências**: Execute o comando abaixo para instalar as dependências do projeto:

    ```bash
    npm install
    ```	

3. **Variáveis de Ambiente**: Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
    ```bash
    EMAIL=seu-email@gmail.com
    PASSWORD=sua-senha
    GITHUB_NAME=seu-nome-no-github
    NOME_REPOSITORIO=nome-do-repositorio
    GITHUB_USERNAME=seu-username-no-github
    ```

## Estrutura de Código

### Testes Automatizados

Os testes estão organizados no arquivo **github.test.js** e incluem os seguintes cenários:

1. **Abrir navegador**: Verifica se o navegador é aberto corretamente.
2. **Acessar página inicial do GitHub**: Navega até a página inicial do GitHub.
3. **Acessar página de login**: Navega para a página de login do GitHub.
4. **Preencher formulário de login**: Preenche os campos de e-mail e senha.
5. **Efetuar autenticação**: Realiza a autenticação do usuário.
6. **Validar autenticação**: Verifica se o usuário foi autenticado com sucesso.
7. **Navegar até 'Repositories' e acessar Pull Requests**: Navega até a aba de repositórios e verifica os Pull Requests.
8. **Criar novo repositório**: Cria um novo repositório de teste.
9. **Acessar a página do repositório criado**:** Verifica se o repositório foi acessado corretamente.
10. **Tirar screenshot**: Captura uma imagem da página do repositório criado.
11. **Deslogar do GitHub**: Realiza o logout do usuário.
12. **Validar logout**: Verifica se o usuário foi deslogado com sucesso.
13. **Fechar navegador**: Fecha o navegador após os testes.

### Estrutura de Page Objects
* **GithubHomePage.js**: Contém os métodos para acessar a página inicial e a página de login.
* **GithubLoginPage.js**: Contém os métodos para preencher o formulário de login e autenticar o usuário.
* **GithubUserPage.js**: Contém os métodos para verificar a página do usuário, criar repositórios, e realizar o logout.

## Como Executar os Testes
1. **Executar Testes**: Para executar os testes, utilize o seguinte comando:

    ```bash
    npm test
    ```
2. **Visualizar Resultados**: O Jest irá exibir no console os resultados dos testes, indicando se foram bem-sucedidos ou se falharam.

## Considerações Finais

Este projeto exemplifica o uso de POM junto com Puppeteer e Jest para automatizar interações no GitHub. A organização modular facilita a manutenção do código e a extensão dos testes.