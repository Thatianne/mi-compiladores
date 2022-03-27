string -> aceita quebra de linha

ERROS
x string -> tem erro quando não fecha a string e acaba o arquivo

X identificador -> ex: Juli@a. Considerar Juli@a um único lexema inválido ou considerar Juli @(erro) a, tres tokens. Segunda abordagem acredito que vai ser mais fácil

X numero -> ex: 9..4 Considerar que é 9. (erro) . (delimitador) 4 (numero)

x comentario de bloco -> não fechar o bloco e o arquivo ter acabado

operador logico -> ex: & Operador lógico mal formado

# Decisões de projeto

## String

A string poderá ocupar mais de uma linha.

## Identificador

Para o caso em que se tem um caracter inválido ao formar um identificador

Ex.: Juli@na
"juli" identificador
"@" erro
"na" é um identificador

## Número

Para tratar erro em número de ponto flutuante, foi decidido a seguinte abordagem

Ex.: 1..3

"1.." é um erro

"3" é um número inteiro
