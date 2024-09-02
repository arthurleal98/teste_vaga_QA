const puppeteer = require('puppeteer');
require('dotenv').config();
const GithubHomePage = require('../pages_objects/githubHomePage');
const GithubLoginPage = require('../pages_objects/githubLoginPage');
const GithubUserPage = require('../pages_objects/githubUserPage');

let browser;
let page;
let githubHomePage;
let githubLoginPage;
let githubUserPage;

// Configuração inicial antes de todos os testes
beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
});

// Limpeza após todos os testes
afterAll(async () => {
    await browser.close();
});

describe('GitHub', () => {
    // Teste para abrir o navegador
    it('Abrir navegador', async () => {
        try {
            page = await browser.newPage();
            expect(page).not.toBeNull();
        } catch (error) {
            throw new Error(`Erro ao abrir o navegador: ${error.message}`);
        }
    });

    // Teste para acessar a página inicial do GitHub
    it("Acessar página www.github.com", async () => {
        try {
            githubHomePage = new GithubHomePage(page);
            await githubHomePage.acessarHomePage();
            expect(await page.url()).toBe(githubHomePage.obterUrlHomePage());
        } catch (error) {
            throw new Error(`Erro ao acessar a página do GitHub: ${error.message}`);
        }
    });

    // Teste para acessar a página de login
    it("Acessar página de login", async () => {
        try {
            await githubHomePage.acessarPaginaDeLogin();
            githubLoginPage = new GithubLoginPage(page);
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            expect(await page.title()).toBe(githubLoginPage.obterTituloLogin());
        } catch (error) {
            throw new Error(`Erro ao acessar a página de login do GitHub: ${error.message}`);
        }
    });

    // Teste para preencher o formulário de login
    it("Preencher formulário E-mail e Senha", async () => {
        try {
            await githubLoginPage.preencherFormularioLogin(process.env.EMAIL, process.env.PASSWORD);
        } catch (error) {
            throw new Error(`Erro ao preencher formulário de login: ${error.message}`);
        }
    });

    // Teste para efetuar a autenticação
    it("Efetuar autenticação", async () => {
        try {
            await githubLoginPage.efetuarAutenticacao();
            githubUserPage = new GithubUserPage(page);
            expect(await githubUserPage.verificarSeEstaNaPaginaDoUsuario()).toBe(true);
        } catch (error) {
            throw new Error(`Erro ao efetuar autenticação: ${error.message}`);
        }
    });

    // Teste para validar se a autenticação foi bem sucedida
    it("Validar se a autenticação foi bem sucedida", async () => {
        try {
            expect(await githubUserPage.verificarSeEstaNaPaginaDoUsuario()).toBe(true);
        } catch (error) {
            throw new Error(`Erro ao validar autenticação: ${error.message}`);
        }
    });

    // Teste para checar se o usuário foi redirecionado para a URL esperada após o login
    it("Checar se após logado o usuário foi redirecionado para a URL esperada.", async () => {
        try {
            expect(page.url()).toBe(githubUserPage.obterUrlPaginaUsuario());
        } catch (error) {
            throw new Error(`Erro ao validar URL da página do usuário: ${error.message}`);
        }
    });

    // Teste para validar o nome do usuário na página
    it("Validar o nome do usuário da página localizado abaixo da foto do perfil", async () => {
        try {
            expect(await githubUserPage.verificarNomeUsuario(process.env.GITHUB_NAME)).toBe(true);
        } catch (error) {
            throw new Error(`Erro ao validar nome do usuário: ${error.message}`);
        }
    });

    // Teste para navegar até a aba 'Repositories' e acessar os Pull Requests de um repositório aleatório
    it("Navegar até a aba 'Repositories' e acessar os Pull Requests de um repositório aleatório", async () => {
        try {
            expect(await githubUserPage.validarSeEstaNaPaginaPullRequests()).toBe(true);
        } catch (error) {
            throw new Error(`Erro ao navegar até a aba 'Repositories' e acessar um repositório aleatório: ${error.message}`);
        }
    });

    // Teste para criar um novo repositório
    it("Criar um novo repositório", async () => {
        try {
            await githubUserPage.criarNovoRepositorio(process.env.NOME_REPOSITORIO, "Repositório de teste");
        } catch (error) {
            throw new Error(`Erro ao criar um novo repositório: ${error.message}`);
        }
    });

    // Teste para acessar a página do repositório criado
    it("Acessar a página do repositório criado", async () => {
        try {
            await githubUserPage.acessarRepositorio(process.env.NOME_REPOSITORIO);
            expect(await page.url()).toBe(`https://github.com/${process.env.GITHUB_USERNAME}/${process.env.NOME_REPOSITORIO}`);
        } catch (error) {
            throw new Error(`Erro ao acessar a página do repositório criado: ${error.message}`);
        }
    });

    // Teste para tirar screenshot da página do repositório criado
    it("Tirar screenshot da página do repositório criado", async () => {
        try {
            await page.screenshot({ path: `img/repositorio-criado-${process.env.NOME_REPOSITORIO}.png` });
        } catch (error) {
            throw new Error(`Erro ao tirar screenshot da página do repositório criado: ${error.message}`);
        }
    });

    // Teste para deslogar do GitHub
    it("Deslogar do GitHub", async () => {
        try {
            await githubUserPage.deslogar();
        } catch (error) {
            throw new Error(`Erro ao deslogar do GitHub: ${error.message}`);
        }
    });

    // Teste para validar se o usuário foi deslogado
    it("Validar se o usuário foi deslogado", async () => {
        try {
            expect(await page.url()).toBe('https://github.com/');
        } catch (error) {
            throw new Error(`Erro ao validar se o usuário foi deslogado: ${error.message}`);
        }
    });

    // Teste para fechar o navegador
    it("Fechar navegador", async () => {
        try {
            await page.close();
        } catch (error) {
            throw new Error(`Erro ao fechar o navegador: ${error.message}`);
        }
    });
});