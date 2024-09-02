const puppeteer = require('puppeteer');
require('dotenv').config();
const GithubHomePage = require('../pages_objects/githubHomePage');
const GithubLoginPage = require('../pages_objects/githubLoginPage');
const GithubUserPage = require('../pages_objects/githubUserPage');
const { timeout } = require('puppeteer');



let browser;
let page;
let githubHomePage;
let githubLoginPage;
let githubUserPage;


beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
});

afterAll(async () => {
    await browser.close();
});

describe('GitHub', () => {
    it('Abrir navegador', async () => {
        try {
            page = await browser.newPage();

            expect(page).not.toBeNull();
        } catch (error) {
            throw new Error(`Erro ao abrir o navegador: ${error.message}`);
        }
    });

    it("Acessar página www.github.com", async ()=>{
        try{
            githubHomePage = new GithubHomePage(page);

            await githubHomePage.acessarHomePage();
            
            expect(await page.url()).toBe(githubHomePage.obterUrlHomePage());
        }
        catch(error){
            throw new Error(`Erro ao acessar a página do GitHub: ${error.message}`);
        }
    });

    it("Acessar página de login", async ()=>{
        try{
            await githubHomePage.acessarPaginaDeLogin();

            githubLoginPage = new GithubLoginPage(page);
            await page.waitForNavigation({ waitUntil: 'networkidle0' });

            expect(await page.title()).toBe(githubLoginPage.obterTituloLogin());
        }
        catch(error){
            throw new Error(`Erro ao acessar a página de login do GitHub: ${error.message}`);
        }
    });

    it("Preencher formulário E-mail e Senha", async ()=>{
        try{
            await githubLoginPage.preencherFormularioLogin(process.env.EMAIL, process.env.PASSWORD);
        }
        catch(error){
            throw new Error(`Erro ao preencher formulário de login: ${error.message}`);
        }
    });

    it("Efetuar autenticação", async ()=>{
        try{
            await githubLoginPage.efetuarAutenticacao();

            githubUserPage = new GithubUserPage(page);

            expect(await githubUserPage.verificarSeEstaNaPaginaDoUsuario()).toBe(true);
        }
        catch(error){
            throw new Error(`Erro ao efetuar autenticação: ${error.message}`);
        }
    });

    it("Validar se a autenticação foi bem sucedida", async ()=>{
        try{
            expect(await githubUserPage.verificarSeEstaNaPaginaDoUsuario()).toBe(true);

        }
        catch(error){
            throw new Error(`Erro ao validar autenticação: ${error.message}`);
        }
    });

    it("Checar se após logado o usuário foi redirecionado para a URL esperada.", async ()=>{
        try{
            expect(page.url()).toBe(githubUserPage.obterUrlPaginaUsuario());
        }
        catch(error){
            throw new Error(`Erro ao validar URL da página do usuário: ${error.message}`);
        }
    });

    it("Validar o nome do usuário da página localizado abaixo da foto do perfil", async ()=>{
        try{
            expect(await githubUserPage.verificarNomeUsuario(process.env.GITHUB_NAME)).toBe(true);
        }
        catch(error){
            throw new Error(`Erro ao validar nome do usuário: ${error.message}`);
        }
    });

    it("Navegar até a aba 'Repositories' e acessar os Pull Requests de um repositório aleatório", async () => {
        try {
            
            expect(await githubUserPage.validarSeEstaNaPaginaPullRequests()).toBe(true);
        } catch (error) {
            throw new Error(`Erro ao navegar até a aba 'Repositories' e acessar um repositório aleatório: ${error.message}`);
        }
    });

    it("Criar um novo repositório", async () => {
        try {
            // Criar um novo repositório
            await githubUserPage.criarNovoRepositorio(process.env.NOME_REPOSITORIO, "Repositório de teste");
    
        } catch (error) {
            throw new Error(`Erro ao criar um novo repositório: ${error.message}`);
        }
    });

    it("Acessar a página do repositório criado", async () => {
        try {
            // Acessar a página do repositório criado
            await githubUserPage.acessarRepositorio(process.env.NOME_REPOSITORIO);
            
            // Verificar se a url contempla o nome do repositório criado
            expect(await page.url()).toBe(`https://www.github.com/${process.env.GITHUB_USERNAME}/${process.env.NOME_REPOSITORIO}`);

        } catch (error) {
            throw new Error(`Erro ao acessar a página do repositório criado: ${error.message}`);
        }
    });

    it("Tirar screenshot da página do repositório criado", async () => {
        try {
            // Tirar screenshot da página do repositório criado na pasta como nome "img"
            await page.screenshot({ path: `img/repositorio-criado-${process.env.NOME_REPOSITORIO}.png` });
        } catch (error) {
            throw new Error(`Erro ao tirar screenshot da página do repositório criado: ${error.message}`);
        }
    });

    it("Deslogar do GitHub", async () => {
        try {
            await githubUserPage.deslogar();
    
            // Verificar se o usuário foi deslogado
            expect(await page.title()).toBe('Logout');
        } catch (error) {
            throw new Error(`Erro ao deslogar do GitHub: ${error.message}`);
        }
    });

    it("Validar se o usuário foi deslogado", async () => {
        try {
            expect(await page.url()).toBe('https://github.com/');
        } catch (error) {
            throw new Error(`Erro ao validar se o usuário foi deslogado: ${error.message}`);
        }
    });

    it("Fechar navegador", async () => {
        try {
            await page.close();
        } catch (error) {
            throw new Error(`Erro ao fechar o navegador: ${error.message}`);
        }
    });


        











    
});