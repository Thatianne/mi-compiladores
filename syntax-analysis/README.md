# Executar projeto

Node v12.18.4

## Arquivos de teste

Adicione os arquivos de teste no diretório `syntax-analysis/tests` com a extensão `.txt`.

## Executar teste

Para executar a análise sintática e léxica execute o comando abaixo estando na raiz do projeto.

```
npm run analyze $nome-do-arquivo
```

Este comando irá criar um arquivo correspondente no diretório `syntax-analysis/input` com o resultado da análise léxica e um arquivo em `syntax-analysis/output` com os erros ou a mensagem de sucesso da análise sintática.

Exemplo: No diretório `syntax-analysis/tests` possui o arquivo `global/success.txt`, execute

```
npm run analyze global/success
```

(sem a extensão `txt`)
