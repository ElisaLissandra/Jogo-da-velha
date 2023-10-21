import React from 'react'; // Importa a biblioteca react 
import ReactDOM from 'react-dom/client'; // Importa o object ReactDOM
import './index.css';  // Importa o arquivo .css

 // Função responsável pelos quadrados do tabuleiro
  function Square(props) {
    return (
      <button className='square' onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
   // Define uma classe chamada 'Board' que estende a classe React.Component.
  class Board extends React.Component {  
    // Estado do componente 
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true, // Rastreia o próximo jogador 
      };
    }

    //Declaração da função handleClick 
    handleClick(i) {
      const squares = this.state.squares.slice(); // Cria uma cópia do array 'squares'
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] =  this.state.xIsNext ? 'X' : 'O'; // Altera o valor do quadrado de acordo com o jogador
      this.setState({
        squares: squares, // Atualiza o estado com o novo array squares
        xIsNext: !this.state.xIsNext // Altera  o jogador atual
      });
    }

    // Renderiza um quadrado e passa o valor e a função onClick para o componente Square  .
    renderSquare(i) { 
      return(
        <Square  value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />  // Retorna um componente 'Square'.
      );
    }
    
    // Define um método 'render' para a classe 'Board'.
    render() { 

      // Chama a função que declara o vencedor 
      const winner = calculateWinner(this.state.squares);
      let status;
      // verifica se existe vencedor 
      if(winner) {
        status = 'Vencedor: ' + winner; 
      }else { // Se não existe vencedor, retorna quem será o próximo a jogar 
        status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O');
      }


      return ( 
      // Renderiza o valor da variável 'status' em um elemento com a classe 'status'.
        <div>
          <div className="status">{status}</div> 
          <div className="board-row">
            {this.renderSquare(0)}  
            {this.renderSquare(1)}  
            {this.renderSquare(2)}   
          </div>
          <div className="board-row">
            {this.renderSquare(3)}  
            {this.renderSquare(4)}  
            {this.renderSquare(5)}  
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)} 
            {this.renderSquare(8)} 
          </div>
        </div>
      );
    }
  }
  
   // Define uma classe chamada 'Game' que estende a classe React.Component.
  class Game extends React.Component { 
    render() { 
      return (  // Retorna um elemento React.
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }


  // Função que declara o vencedor
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 5, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Itera todos os quadrados
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
     return null;
  }


  
  // ========================================
  
  // Cria uma raiz React no elemento HTML com o id "root".
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />); // Renderiza o componente 'Game' na raiz React.
  