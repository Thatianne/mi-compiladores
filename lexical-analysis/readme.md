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

# TODO

## Ver os casos

### Ex.: &a

Estaria certo considerar sendo um lexema apenas com erro (&a)? Ou deveria ser considerado dois lexemas, um com erro (& -> operador lógico incompleto) e um lexema certo (a -> identificador).

&a -> erro

ou

& -> erro

a -> identificador

### Ex.: |b

Considerar

|b -> erro

ou

| -> erro

b -> identificador

### Ex.: 'bb

'bb -> caracter não fechado

ou

'b -> caracter não fechado
b -> identificador

## Separação de estados para estados específicos

Foi feita a separação dos estados para:

- operadores lógicos
- operadores aritméticos
- operadores relacionais

Será necessário fazer a separação dos delimitadores
