class GithubUserPage {

    constructor(page) {
      this.page = page;
    }
  
    // Verifica se está na página do usuário
    async verificarSeEstaNaPaginaDoUsuario() {
      try {
        // Verifica se existe o elemento span com classe AppHeader-context-item-label  
        await this.page.waitForSelector('.AppHeader-context-item-label');
        return true;
      } catch (error) {
        return false;  
      }
    }
  
    // Retorna a URL da página do usuário
    obterUrlPaginaUsuario() {
      return "https://github.com/";
    }
  
    // Verifica o nome do usuário na página
    async verificarNomeUsuario(nomeUsuario) {
      try {
        // Clicar na foto do perfil que tem atributo data-login igual ao nome do usuário
        await this.page.click('button[data-login="'+process.env.GITHUB_USERNAME+'"]');
  
        // Verificar se um div tem o title igual ao nome do usuário
        await this.page.waitForSelector('div[title="'+nomeUsuario+'"]');
        return true;
      } catch (error) {
        return false;
      }
    }
  
    // Navega para a aba "Pull Requests"
    async navegarParaAbaPullRequests() {
      try {
        // Clicar no link na tag a com id = pull-requests-tab
        await this.page.click('a[id="pull-requests-tab"]');
        await this.page.waitForNavigation({ waitUntil: 'load' });
      } catch (error) {
        throw new Error(`Erro ao navegar para a aba 'Pull Requests': ${error.message}`);
      }
    }
  
    // Obtém o nome de um repositório aleatório a partir da URL
    obterNomeRepositorioAleatorio() {
      let url = this.page.url();
      url = url.split("/");
      return url[url.length-1];
    }
  
    // Navega para a aba "Repositories"
    async navegarParaAbaRepositorios() {
      try {
        // Clicar no link "Repositories"
        await this.page.click('a[href="/'+process.env.GITHUB_USERNAME+'?tab=repositories"]');
        await this.page.waitForNavigation({waitUntil: 'load'});
      } catch (error) {
        throw new Error(`Erro ao navegar para a aba 'Repositories': ${error.message}`);
      }
    }
  
    // Acessa um repositório aleatório
    async acessarRepositorioAleatorio() {
      try {
        // Navegar até a aba "Repositories"
        await this.navegarParaAbaRepositorios();
        // Aguardar a página carregar
        await this.page.waitForNavigation({ waitUntil: 'load' });
  
        // Obter todos os repositórios
        await this.page.waitForSelector('a[itemprop="name codeRepository"]'); // Aguarda os elementos aparecerem
        const repositorios = await this.page.$$('a[itemprop="name codeRepository"]');
  
        // Obter um repositório aleatório
        const repositorioAleatorio = repositorios[Math.floor(Math.random() * repositorios.length)];
  
        // Rolamento até o repositório aleatório
        await repositorioAleatorio.evaluate(() => {
          document.querySelector('a[itemprop="name codeRepository"]').scrollIntoView({ block: 'center', inline: 'center' });
        });
  
        // Clicar no repositório aleatório e esperar pela navegação ao mesmo tempo
        await Promise.all([
          repositorioAleatorio.click(),
          this.page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
  
        // Clicar na aba pull requests
        await this.page.click('a[id="pull-requests-tab"]');
  
        return this.obterNomeRepositorioAleatorio();
  
      } catch (error) {
        throw new Error(`Erro ao acessar repositório aleatório: ${error.message}`);
      }
    }
  
    // Valida se está na página de Pull Requests
    async validarSeEstaNaPaginaPullRequests() {
      let repositorioAleatorio = await this.acessarRepositorioAleatorio();
  
      await this.page.goto(`https://www.github.com/${process.env.GITHUB_USERNAME}/${repositorioAleatorio}/pulls`);
  
      // Procurar por um texto com nome do repositório
      try {
        await this.page.waitForSelector('a[id="pull-requests-tab"]');
        await this.page.click('a[id="pull-requests-tab"]');
        return true;
      } catch (error) {
        return false;
      }
    }
  
    // Clica no primeiro pull request
    async clicarPullRequest() {
      try {
        // Clicar no primeiro pull request
        await this.page.waitForSelector('a[data-hovercard-type="pull_request"]');
        await this.page.click('a[data-hovercard-type="pull_request"]');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
      } catch (error) {
        throw new Error(`Erro ao clicar no pull request: ${error.message}`);
      }
    }
  
    // Cria um novo repositório
    async criarNovoRepositorio(nomeRepositorio, descricaoRepositorio) {
      try {
        await this.page.goto(`https://www.github.com/${process.env.GITHUB_USERNAME}?tab=repositories`, { waitUntil: 'networkidle0' });
  
        // Clicar no botão "New"
        await this.page.waitForSelector('a[class="text-center btn btn-primary ml-2"]');
        await this.page.click('a[class="text-center btn btn-primary ml-2"]');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
  
        // Preencher o formulário de criação de repositório
        await this.page.waitForSelector('input[data-testid="repository-name-input"]');
        await this.page.type('input[data-testid="repository-name-input"]', nomeRepositorio);
  
        await this.page.waitForSelector('input[name="Description"]');
        await this.page.type('input[name="Description"]', descricaoRepositorio);
  
        await this.page.click('input[data-testid="repository-name-input"]');
  
        // Esperar 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Pressionar Enter para criar o repositório
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Enter');
  
      } catch (error) {
        throw new Error(`Erro ao criar novo repositório: ${error.message}`);
      }
    }
  
    // Acessa um repositório pelo nome
    async acessarRepositorio(nomeRepositorio) {
      try {
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        // Clicar no repositório criado
        await this.page.goto(`https://www.github.com/${process.env.GITHUB_USERNAME}/${nomeRepositorio}`, { waitUntil: 'networkidle0' });
      } catch (error) {
        throw new Error(`Erro ao acessar repositório: ${error.message}`);
      }
    }
  
    // Desloga do GitHub
    async deslogar() {
      try {
        // Clicar na foto do perfil
        await this.page.click('button[data-login="'+process.env.GITHUB_USERNAME+'"]');
        // Clicar no botão "Sign out"
        await this.page.click('a[href="/logout"]');
        await this.page.waitForNavigation({waitUntil: 'load'});
  
        await this.page.waitForSelector('input[name="commit"]');
        await this.page.click('input[name="commit"]');
        await this.page.waitForNavigation({waitUntil: 'load'});
  
      } catch (error) {
        throw new Error(`Erro ao deslogar: ${error.message}`);
      }
    }
  }
  
  module.exports = GithubUserPage;