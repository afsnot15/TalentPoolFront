# TalentPoolFront

Projeto Web de Cadastro de Produto, destinado ao Code Talent Pool da VR Software.

## Iniciando Aplicação

Navegue até o diretório raiz do projeto.

Execute o seguinte comando:

```bash
 docker compose up
 ```

A aplicação será iniciada na porta 4200.

Acesse o endereço http://localhost:4200 em seu navegador para utilizar a aplicação.


## Execução de testes

Para rodar os testes unitários e gerar o relatório de cobertura, execute o seguinte comando:

```bash
docker exec -it front-talentpool npm run test:cov
```

ou

"attach" no container através do comando:

```bash
docker exec -it front-talentpool
```

e a seguir execute o comando:

```bash
npm run test:cov
```
