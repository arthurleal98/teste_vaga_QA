class GithubHomePage {
    constructor(page) {
        this.page = page; // Inicializa a página do Puppeteer
    }

    // Método para acessar a página inicial do GitHub
    async acessarHomePage() {
        await this.page.goto('https://github.com'); // Navega até a URL do GitHub
    }

    // Método para obter a URL atual da página
    async obterUrl() {
        return this.page.url(); // Retorna a URL atual da página
    }

    // Método para acessar a página de login do GitHub
    async acessarPaginaDeLogin() {
        // Aguarda o elemento "Sign in" aparecer na tela
        await this.page.waitForSelector('a[href="/login"]');
        // Clica no link "Sign in"
        await this.page.click('a[href="/login"]');
    }

    // Método para obter a URL da página inicial do GitHub
    obterUrlHomePage() {
        return "https://github.com/"; // Retorna a URL da página inicial do GitHub
    }
}

module.exports = GithubHomePage; // Exporta a classe GithubHomePage