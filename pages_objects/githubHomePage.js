
class GithubHomePage{
    constructor(page){
        this.page = page;
    }

    async acessarHomePage(){
        await this.page.goto('https://github.com');
    }

    async obterUrl(){
        return this.page.url();
    }

    async acessarPaginaDeLogin(){
        // aguardar o elemento "Sign in" aparecer na tela
        await this.page.waitForSelector('a[href="/login"]');
        // clicar no link "Sign in"
        await this.page.click('a[href="/login"]');
    }

    obterUrlHomePage(){
        return "https://github.com/";
    }


}

module.exports = GithubHomePage;