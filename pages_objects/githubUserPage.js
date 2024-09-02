class GithubUserPage {

  constructor(page) {
    this.page = page;
  }

  async verificarSeEstaNaPaginaDoUsuario() {
    try {
      // Verifica se existe o elemento span com classe AppHeader-context-item-label  
        await this.page.waitForSelector('.AppHeader-context-item-label');
        return true;
    }
    catch (error) {
      return false;  
      
    }
    }

    obterUrlPaginaUsuario(){
        return "https://github.com/";
    }

    async verificarNomeUsuario(nomeUsuario){
        try {
            //Clicar na foto do perfil que tem atributo data-login igual ao nome do usuário
            await this.page.click('button[data-login="'+process.env.GITHUB_USERNAME+'"]');

            // verificar se um div tem o title igual ao nome do usuário
            await this.page.waitForSelector('div[title="'+nomeUsuario+'"]');
            return true;
        }
        catch (error) {
            return false;
        }
    }



    async navegarParaAbaPullRequests(){
        try {

            // Clicar no link na tag a com id = pull-requests-tab
            await this.page.click('a[id="pull-requests-tab"]');
            await this.page.waitForNavigation({ waitUntil: 'load' });


        }
        catch (error) {
            throw new Error(`Erro ao navegar para a aba 'Pull Requests': ${error.message}`);
        }
    }

    obterNomeRepositorioAleatorio(){
        let url = this.page.url();
        url = url.split("/");
        return url[url.length-1];

    }

    async navegarParaAbaRepositorios(){
        try {
            
            // Clicar no link "Repositories"
            await this.page.click('a[href="/'+process.env.GITHUB_USERNAME+'?tab=repositories"]');
            await this.page.waitForNavigation({waitUntil: 'load'});
        }
        catch (error) {
            throw new Error(`Erro ao navegar para a aba 'Repositories': ${error.message}`);
        }
    }

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

            // clicar na aba pull requests
            await this.page.click('a[id="pull-requests-tab"]');

            return this.obterNomeRepositorioAleatorio();

        } catch (error) {
            throw new Error(`Erro ao acessar repositório aleatório: ${error.message}`);
        }
    }

    async validarSeEstaNaPaginaPullRequests(){
        let repositorioAleatorio = await this.acessarRepositorioAleatorio();

        await this.page.goto(`https://www.github.com/${process.env.GITHUB_USERNAME}/${repositorioAleatorio}/pulls`);

        //Procurrar por um texto com nome do repositório
        try{
            await this.page.waitForSelector('a[id="pull-requests-tab"]');
            await this.page.click('a[id="pull-requests-tab"]');
            return true;
        }
        catch(error){
            return false;
        }

    }


    async clicarPullRequest() {
        try {
            // Clicar no primeiro pull request
            await this.page.waitForSelector('a[data-hovercard-type="pull_request"]');
            await this.page.click('a[data-hovercard-type="pull_request"]');
            await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        } catch (error) {
            throw new Error(`Erro ao clicar no pull request: ${error.message}`);
        }}
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

            //Esperar 2 segundos
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Pressionar Enter para criar o repositório
            await this.page.keyboard.press('Enter');
            await this.page.keyboard.press('Enter');


           

        } catch (error) {
            throw new Error(`Erro ao criar novo repositório: ${error.message}`);
        }
    }

    async acessarRepositorio(nomeRepositorio){
        try {
            // Clicar no repositório criado
            await this.page.goto(`https://www.github.com/${process.env.GITHUB_USERNAME}/${nomeRepositorio}`, { waitUntil: 'networkidle0' });
            await this.page.waitForNavigation({waitUntil: 'networkidle0'});
        }
        catch (error) {
            throw new Error(`Erro ao acessar repositório: ${error.message}`);
        }
    }

    async deslogar(){
        try {
            // Clicar na foto do perfil
            await this.page.click('button[data-login="'+process.env.GITHUB_USERNAME+'"]');
            // Clicar no botão "Sign out"
            await this.page.click('a[href="/logout"]');
            await this.page.waitForNavigation({waitUntil: 'load'});

            


        }
        catch (error) {
            throw new Error(`Erro ao deslogar: ${error.message}`);
        }
    }


    


}

module.exports = GithubUserPage;
