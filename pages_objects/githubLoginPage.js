class GithubLoginPage {

    login = 'input#login_field';
    senha = 'input#password';
    botaoEntrar = 'input[type="submit"]';

    constructor(page) {
        this.page = page;
    }
    
    async preencherFormularioLogin(email, senha) {
        try {
            await this.page.waitForSelector(this.login);
            await this.page.click(this.login);
            await this.page.type(this.login, email);
            await this.page.waitForSelector(this.senha);
            await this.page.click(this.senha);
            await this.page.type(this.senha, senha);
        } catch (error) {
            throw new Error(`Erro ao preencher formulário de login: ${error.message}`);
        }
    }

    async efetuarAutenticacao() {
        try {
            await this.page.waitForSelector(this.botaoEntrar);
            await this.page.click(this.botaoEntrar);
            await this.page.waitForNavigation({waitUntil: 'networkidle0'});
        }
        catch (error) {
            throw new Error(`Erro ao efetuar autenticação: ${error.message}`);
        }
    }

    obterTituloLogin() {
        return "Sign in to GitHub · GitHub";    
    }
}

module.exports = GithubLoginPage;