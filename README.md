# learn-graph

**Nome:** Ezequiel José Oliveira

O intuito desse projeto é aprender Teoria dos Grafos programando os seus conceitos na prática.
Dessa forma é muito mais fácil assimilar seus conceitos, aprender suas aplicações e tornar possível resolver problemas que de maneira habitual seria impossível.

Esses são alguns dos conceitos aplicados nesse projeto e a relação entre eles.

##### Ordem do grafo

A ordem do grafo é o número de vertices que ele possui. 
Parece simples, mas é, porém como viremos a seguir isso nos ajuda a resolver problemas muito mais complexos.

##### Tamanho do grafo

O tamanho de um grafo é a soma de suas arestas.

##### Grau dos vertices

Aqui representamos uma tabela com a relação de cada vertice e o seu grau.

##### É grafo regular

O grafo é regular se todas as suas arestas possuem o mesmo grau. Viu, acabamos de utilizar a primeira definição e vamos usa-lá muita como viremos a seguir.

##### É grafo simples

O grafo é simples se ele não possuir laço e nem arestas paralelas.
Olha que interessante, as proximas duas definições seram a respeito de multigrafo e de pseudografo. Com essas duas definições conseguimos falar se um grafo é simples apenas provando se ele é multigrafo ou pseudografo poupando um trabalham.

##### É pseudografo

O grafo ;e pseudografo se ele possuir algum laço.

##### É multigrafo

O grafo é multigrafo se ele possuir alguma aresta paralela.

##### É grafo conexo

O grafo é conexo se para todo vertice conseguimos chegar a qualquer ou vertice.

##### É grafo completo

O grafo é completo se cada vertice possuir arestas ligando-o a cada outro vertice

##### É grafo ciclo

Um grafo ciclo ou circular é um grafo com N número de vertices conectados em uma rede fechada e cada vertice possui grau 2.
Para ajudar a definir se um grafo é circular, foi utilizado a definição de grau e de conectividade (Grafo Conexo), sendo assim, é nescessario provar que cada vertice possui grau 2 e que esse grafo é conexo.

##### Matriz de adjacencias

Implementar uma matriz de adjacencias utilizando o conceito de adjacência.

##### Matriz de incidências

Implementar uma matriz de incidências é muito simples logo que precisamos listar todas as arestas em uma tabela e relaciona-lo com os seus vertices.
Não é necessário fazer uso de nenhuma outra definição

##### Matriz de distâncias

Para implementar uma matriz de distâncias é necessário calcular a distância de cada vertice para cada vertice.

##### Árvore geradora mínima

Encontrar uma árvore geradora mínima pode parecer complicado a primeira momento mas é muito mais simples do que parece.
Primeiro de tudo é necessário criar um novo grafo com todos os vertices do grafo original.
Depois criar um vetor S contendo todas arestas do grafo ordenado por peso.
Cada aresta do vetor S é adicionada no novo grafo se os vertices dessa aresta não estiver conectados.
Pronto. Esse novo grafo possui é uma árvore geradora mínima.


##### Fecho transitivo do vertice

Para encontrar o fecho transitivo do vertice é necessário encontrar todos os vertices que o nosso vertice consegue alcançar.
Para isso usamos o conceito de Fecho Transitivo do Grafo e isolamos apenas o nosso vertice em questão.

##### Fecho transitivo do grafo

Para encontrar o fecho transitivo do grafo é necessário encontrar todos os vertices que cada vertice consegue alcançar.
Para isso foi usado o algoritmo de Floyd-Warshall.
