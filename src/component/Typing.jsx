import React, {Component} from "react";
import TypingComponent from "./TypingComponent";
import TypingResult from "./TypingResult";

class Typing extends Component {
	state = {
		words: [
			"twice",
			"success",
			"frog",
			"help",
			"knife",
			"origin",
			"changing",
			"blind",
			"pig",
			"replied",
			"shelter",
			"according",
			"piece",
			"passage",
			"joined",
			"early",
			"brain",
			"massage",
			"everybody",
			"flew",
			"empty",
			"north",
			"bicycle",
			"jump",
			"labor",
			"know",
			"frame",
			"truth",
			"work",
			"horn",
			"angle",
			"thick",
			"even",
			"seed",
			"well",
			"to",
			"industrial",
			"merely",
			"where",
			"needle",
			"pilot",
			"numeral",
			"saved",
			"question",
			"number",
			"fall",
			"clothing",
			"notice",
			"needed",
			"wool",
			"community",
			"darkness",
			"rose",
			"bush",
			"is",
			"card",
			"arm",
			"factory",
			"law",
			"discover",
			"youth",
			"darkness",
			"horn",
			"troops",
			"jar",
			"remove",
			"toy",
			"additional",
			"cell",
			"push",
			"telephone",
			"pleasant",
			"fact",
			"fat",
			"here",
			"weight",
			"bear",
			"service",
			"rocky",
			"machine",
			"object",
			"additional",
			"shorter",
			"indicate",
			"burn",
			"cook",
			"horn",
			"till",
			"instrument",
			"industry",
			"fine",
			"song",
			"triangle",
			"rays",
			"lungs",
			"blow",
			"tune",
			"trip",
			"situation",
			"bill"
		],
		currentWord: "",
		inputText: "",
		correctOrWrong: "",
		countTime: 20,
		resultTime: 0,
		score: 0,
		gameOver: true,
		showResult: false,
		style: {}
	};

	componentDidMount = () => {
		// let words = await this.getWords(100);
		let {words} = this.state;
		this.setState({words});
	};

	componentDidUpdate = () => {
		!this.state.gameOver ? this.input.focus() : this.inputNum.focus();
	};

	// async getWords(num) {
	// 	let response = await fetch(
	// 		`https://random-word-api.herokuapp.com/word?key=IW8OWAEM&number=${num}`
	// 	);
	// 	return response.json();
	// }

	handleChange = e => {
		let {name, value} = e.target;
		let {currentWord} = this.state;
		value !== currentWord.slice(0, value.length)
			? this.setState(prev => {
					let style = {...prev.style};
					style.color = "red";
					return {[name]: value, style};
			  })
			: this.setState(prev => {
					let style = {...prev.style};
					style.color = "";
					return {[name]: value, style};
			  });
	};

	handleSubmit = async e => {
		e.preventDefault();
		const {inputText, currentWord, words} = this.state;
		const index = Math.floor(Math.random() * words.length);
		inputText === currentWord
			? this.setState(prev => {
					return {
						score: ++prev.score,
						inputText: "",
						currentWord: words[index],
						correctOrWrong: "Correct:)"
					};
			  })
			: this.setState(prev => {
					return {
						score: --prev.score,
						inputText: "",
						currentWord: words[index],
						correctOrWrong: "Wrong:("
					};
			  });
	};

	handleReset = async e => {
		e.preventDefault();
		// let words = await this.getWords(100);
		let {words} = this.state;
		const {countTime} = this.state;
		if (countTime <= 0) {
			return;
		}
		const index = Math.floor(Math.random() * words.length);
		let id;
		this.setState({
			words,
			currentWord: words[index],
			inputText: "",
			countTime: countTime,
			resultTime: 0,
			score: 0,
			gameOver: false,
			showResult: true,
			correctOrWrong: ""
		});
		id = setInterval(() => {
			this.setState(prev => {
				return {countTime: --prev.countTime, resultTime: ++prev.resultTime};
			});
			this.state.countTime <= 0 &&
				(() => {
					clearInterval(id);
					this.setState({gameOver: true});
				})();
		}, 1000);
	};

	render() {
		if (!this.state.gameOver) {
			return (
				<TypingComponent
					gameInfo={this.state}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					setRef={input => (this.input = input)}
				/>
			);
		} else {
			return (
				<TypingResult
					gameInfo={this.state}
					showResult={this.state.showResult}
					handleReset={this.handleReset}
					handleChange={this.handleChange}
					setRef={input => (this.inputNum = input)}
				/>
			);
		}
	}
}

export default Typing;
