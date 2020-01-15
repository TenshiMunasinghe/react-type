import React, {Component} from "react";
class TypingResult extends Component {
	componentDidMount = () => {
		this.props.setRef(this.input);
	};

	render() {
		const {showResult, gameInfo, handleReset, handleChange} = this.props;
		return (
			<div id='typing'>
				{showResult && (
					<h1 className='result'>
						Your score: {gameInfo.score}
						<br />
						Time: {gameInfo.resultTime} seconds
					</h1>
				)}
				<form onSubmit={handleReset} className='set-time'>
					<label>Choose your time limit</label>
					<input
						type='number'
						name='countTime'
						onChange={handleChange}
						value={gameInfo.countTime}
						min='1'
						max='300'
						ref={input => {
							this.input = input;
						}}
					/>
					<input type='submit' value='Start' className='submitBtn' />
				</form>
			</div>
		);
	}
}

export default TypingResult;
