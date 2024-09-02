class GithubLoginPage {

    // Seletores para os campos de login, senha e botão de entrar
    login = 'input#login_field';
    senha = 'input#password';
    botaoEntrar = 'input[type="submit"]';

    constructor(page) {
        this.page = page; // Inicializa a página do Puppeteer
    }
    
    // Método para preencher o formulário de login
    async preencherFormularioLogin(email, senha) {
        try {
            // Aguarda o campo de login aparecer e preenche com o email
            await this.page.waitForSelector(this.login);
            await this.page.click(this.login);
            await this.page.type(this.login, email);

            // Aguarda o campo de senha aparecer e preenche com a senha
            await this.page.waitForSelector(this.senha);
            await this.page.click(this.senha);
            await this.page.type(this.senha, senha);
        } catch (error) {
            throw new Error(`Erro ao preencher formulário de login: ${error.message}`);
        }
    }

    // Método para efetuar a autenticação
    async efetuarAutenticacao() {
        try {
            // Aguarda o botão de entrar aparecer e clica nele
            await this.page.waitForSelector(this.botaoEntrar);
            await this.page.click(this.botaoEntrar);

            // Aguarda a navegação completar após o clique no botão de entrar
            await this.page.waitForNavigation({waitUntil: 'networkidle0'});
        } catch (error) {
            throw new Error(`Erro ao efetuar autenticação: ${error.message}`);
        }
    }

    // Método para obter o título da página de login
    obterTituloLogin() {
        return "Sign in to GitHub · GitHub"; // Retorna o título esperado da página de login
    }
}

module.exports = GithubLoginPage; // Exporta a classe GithubLoginPage