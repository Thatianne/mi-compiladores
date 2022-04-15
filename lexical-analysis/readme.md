# Decisões de projeto

## String

A string poderá ocupar mais de uma linha.

## Caracter

Ex.: 'ab'c'

'ab é um erro

'c' é um caracter

## Identificador

Para o caso em que se tem um caracter inválido ao formar um identificador

Ex.: Juli@na

juli identificador

@ erro

na é um identificador

## Número

Para tratar erro em número de ponto flutuante, foi decidido a seguinte abordagem

Ex.: 1..3

1.. é um erro

3 é um número inteiro

## Operadores lógicos

Ex.: &ba

&b é um erro

a é um identificador

Ex.: |ba

|b é um erro

a é um identificador

# Separação das classes em estados específicos

Foi feita a separação para:

- Operadores lógicos
- Operadores aritméticos
- Operadores relacionais
- Delimitadores (TODO)

# Executar projeto

Node v12.18.4

O projeto foi desenvolvido em sistema linux e os arquivos de teste que se encontram no diretório `input` foram criados no mesmo SO.

No arquivo `index.js`, adicionar o arquivo de entrada que deve ser testado e o nome do arquivo de saída. Exemplo:

```
Process.init('input/input1.txt', 'output/output1.txt');
```

Para executar, execute o comando

```
node index.js
```
