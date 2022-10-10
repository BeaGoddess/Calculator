import { useState } from 'react';


function App() {

	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");

	const ops = ['/', '*' , '+', '-' , '.']


	// Atualizar o texto da calculadora
	const updateCalc = value => {
		// Não ser possível ter dois operadores seguidos nem colocar primeiro um operador
		if (
			ops.includes(value) && calc === '' ||
			ops.includes(value) && ops.includes(calc.slice(-1))
		) {
			return
		}

		// Fazer a soma das strings "3+1"
		setCalc(calc + value);

		// Quando existir a operação de dois números, atualizar o resultado
		if(!ops.includes(value)){
			setResult(eval(calc + value).toString());
		}
	}

	// Criar os botões através de uma função
	const createDigits = () => {
		const digits = [];

		for (let i = 1; i < 10; i++) {
			digits.push(
				<button 
					onClick={() => updateCalc(i.toString())} 
					key={i}>{i}
				</button>
			)
		}

		return digits;
	}

	// Função do Igual "="
	const calculate = () => {

		// Atualizar o valor do texto com a operação
		setCalc(eval(calc).toString());
		// Atualizar o valor do Resultado
		setResult(eval(calc).toString());
		
	}

	// Função do Delete "DEL"
	const deleteLast = () => {

		// Se não existe texto, não fazer nada
		if (calc == '' ){
			return
		} 

		// Eliminar o último
		const value = calc.slice(0, -1);

		// Atualizar valor
		setCalc(value);
		
	}


	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : ''}&nbsp;
					{calc || "0"}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>

					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{createDigits()}
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>

					<button onClick={calculate}>=</button>
				</div>
			</div>


		</div>
	);
}

export default App;
