let canvas = document.getElementById('cobrinhaLili'); 
/* 1.let permite várias os valores da variável dentro de escopos/blocos {} sem alterar o valor declarado globalmente/foda;
2. getElementbyId() é um método para obter um elemento do doc html através de sua ID, pra pegar infos ou manipula-lo; */
let context = canvas.getContext('2d'); 
// getContext renderiza o desenho feito no canvas, neste caso um plano 2d;
let box = 16; 
//variável box vai definir o tamanho das caixas em que será dividida o tamanho total do canvas ;
let lili = []; //variável array para criar a cobrinha, pois seu movimento será adicionando elemento e retirando o último elemento para andar;
lili[0] = { //passando valores pra array, definindo valor inicial no centro da tela;
  x: 16 * box,
  y: 16 * box
} 
let direction = 'right'; //variável para definir a direção positiva para o movimento cartesiano da cobrinha a partir da posição inicial lili[0], na veretical o padrão fica down;
let food = { //variável criar as comidinhas
  x: Math.floor(Math.random() * 31 + 1) * box, //Math.floor() retira a parte flutuante (0.) do numero aleatório gerado pelo Math.random() que é entre 0 e 1;
  y: Math.floor(Math.random() * 31 + 1) * box
}

//funções de desenho:

function createBG() {
  context.fillStyle = '#5B2C6F'; //define a cor para o context, o fillStyle trabalha o stilo do canvas;
  context.fillRect(0, 0, 32 * box, 32 * box); // desenha um retângulo através de de (x, y, width, heigth);
}

//desenho cobrinha:
function createCobrinha(){
  for(i=0; i < lili.length; i++) { //percorre todo o tamanho da array e incrementa pintando o corpo da cobrinha e setando o tamanho;
    context.fillStyle = '#F8C471'; //cor da lili
    context.fillRect(lili[i].x, lili[i].y, box, box); //tamanho inicial da lili
  }
}

//desenho comida
function createFood (){
  context.fillStyle =' #C0392B';
  context.fillRect(food.x, food.y, box, box);
}

//Criando evento para o clique do teclado 'keydown' chame a função update
document.addEventListener('keydown', update);

function update (event){
  if(event.keyCode == 37 && direction != 'right') direction = 'left'; //além da condicional da tecla, é necessário condicionar que a direção oposta da direção anterior não pode acontecer, para não bugar o tamanho da cobrinha;
  if(event.keyCode == 38 && direction != 'down') direction = 'up'; //neste caso, se a direção atual for 'up' e for digitado a oposta 'down', ela muda para 'up';
  if(event.keyCode == 39 && direction != 'left') direction = 'right';
  if(event.keyCode == 40 && direction != 'up') direction = 'down'; // Os valores keyCode = 37, 38, 39 e 40 correspondem as teclas de setas do teclado;
}

//Função que inicia o jogo:
function startGame(){ 

//Criando condicionais para definir que quando a cobrinha exceder uma margem do canvas, ela tenha continuidade na margem oposta, mudando as propriedades da cobrinha num plano cartesiano;
  if(lili[0].x > 31 * box && direction == 'right') lili[0].x = 0; //quando exceder a margem direita aparece na margem esquerda;
  if(lili[0].x < 0 && direction == 'left') lili[0].x = 32 * box; //quando exceder a margem esquerda aparece na margem direita;
  if(lili[0].y > 31 * box && direction == 'down') lili[0].y = 0;
  if(lili[0].y < 0 && direction == 'up') lili[0].y = 32 * box;

//Nessa função passamos todas as funções que serão chamadas para o inicio do jogo  
  createBG();
  createCobrinha();
  createFood();

//elementos para movimento:
  let liliX = lili[0].x; 
  let liliY = lili[0].y;
  // varáveis para setar posições iniciais para o movimento da cobrinha

  // criando coordenadas para o movimento da cobrinha através de condicionais para as direções;
  if(direction == 'right') liliX += box; //direita cartesiana = positiva
  if(direction == 'left') liliX -= box; //esquerda caresiana = negativa
  if(direction == 'up') liliY -= box; // y - negativo 
  if(direction == 'down') liliY += box; // y - positivo
  
  // criando condição para caso da posição 
  if(liliX != food.x || liliY != food.y) {
    lili.pop(); //método pop() retira o último valor da array, assim dá a impressão do movimento;
  } else {food.x = Math.floor(Math.random() * 31 + 1) * box;
    food.y = Math.floor(Math.random() * 31 + 1) * box
  } //no caso do else, será quando a cobrinha se chocar com a comida e nesse caso uma nova comida aleatória será criada e a cobrinha aumenta de tamanho;

  let newHead = {
    x: liliX,
    y: liliY
  }
  lili.unshift(newHead); // método unshift() ascrescenta valor no início da array, que será a cabeça da cobrinha, completando o movimento do jogo;

  for(i = 1; i < lili.length; i ++) {
    if(lili[0].x == lili[i].x && lili[0].y == lili[i].y){ clearInterval(game);
      alert ('Game Over, vamo de novo!')
    } //criamos um laço de repetição com a condição de que se a cabeça da cobrinha lili[0] se chocar com outro elemento da array lili[i] o jogo acaba
  }
}

let game = setInterval(startGame, 70); 
/* 1. setInterval() chama uma função num intervalo de tempo especificado em milissegundos, atualizando o jogo para movimentar a cobrinha, essa função tb vai parar o jogo quando a cobrinha chocar o próprio corpo chamada por clearInterval(); 
2. 50 milissegundos permite que o jogo não trave, diminui pois coloquei o box em metade do valor do projeto original;
*/





