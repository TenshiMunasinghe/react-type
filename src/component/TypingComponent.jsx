import React, {Component} from "react";

class TypingComponent extends Component {
	componentDidMount = () => {
		this.props.setRef(this.input);
	};

	render() {
		const {
			currentWord,
			inputText,
			countTime,
			style,
			correctOrWrong
		} = this.props.gameInfo;

		return (
			<div id='typing'>
				<h2 className='currentWord'>{currentWord}</h2>
				<h3 className='inputText' style={style}>
					{inputText}
				</h3>
				<p>Remaining time: {countTime}</p>
				{correctOrWrong && <p>{correctOrWrong}</p>}

				<form onSubmit={this.props.handleSubmit}>
					<input
						type='text'
						name='inputText'
						value={inputText}
						onChange={this.props.handleChange}
						ref={input => {
							this.input = input;
						}}
					/>
					<input type='submit' style={{display: "none"}} />
				</form>
			</div>
		);
	}
}

export default TypingComponent;
