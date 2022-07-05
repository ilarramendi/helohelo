import { Component } from 'preact';

import Options from '../../components/options/Options';
import Profile from '../../components/profile/Profile';

import Success from '../../../assets/icon-success.svg';

import { styles } from './App.scss';

interface State {
	options: any[];
	selectedOption: number;
	step: number;
	validEmail: boolean;
	email: string;
}

export default class App extends Component<{}, State> {
	state = {
		options: [],
		selectedOption: -1,
		step: 0,
		validEmail: false,
		email: ''
	};

	constructor() {
		super();

		fetch('https://api-demo-hh.vercel.app/api/options')
			.then(async r => r.json())
			.then(options => this.setState({options}));

		this.onNext = this.onNext.bind(this);
	}

	onNext() {
		const {step, email, options, selectedOption} = this.state;

		switch (step) {
			case 0: {
				this.setState({step: 1});
				break;
			}
			case 1: {
				fetch(
					`https://api-demo-hh.vercel.app/api/send?email=${email}&option=${options[selectedOption].value}`,
					{method: 'post'}
				).then(r => {
					if (r.status === 200) this.setState({step: 2});
					else alert('Internal error');
				});
				break;
			}
			case 2: {
					this.setState({
						step: 0,
						email: '',
						selectedOption: -1
					});
				break;
			}
		}
	}

	render({}, {selectedOption, options, step, validEmail, email}) {
		return (
			<div className={styles.container}>
				<div className={styles.verticalContainer}>
					{step === 2 && <Success className={styles.success} />}
					<h1>
						{[
							'Para comenzar selecciona una de las siguientes opciones.',
							'Para terminar completa el siguiente formulario.',
							'Gracias por completar nuestro formulario.'
						][step]}
					</h1>
					{step === 0 && (
						<Options
							options={options}
							selected={selectedOption}
							onClick={selectedOption => this.setState({selectedOption})}
						/>
					)}
					{step === 1 && (
						<>
							<h2>Correo electronico</h2>
							<input
								className={
									email.length > 0 &&
									(validEmail ? styles.valid : styles.invalid)
								}
								value={email}
								onChange={e =>
									this.setState({
										validEmail:
											e.target.value.match(/[.\-\w]+@[\-\w]+\.[\-\w]+/) && true,
										email: e.target.value
									})
								}
							/>
							<label
								className={`${styles.errorLabel} ${
									!validEmail && email.length > 0 && styles.visible
								}`}>
								Por favor, ingresa un correo electronico valido.
							</label>
						</>
					)}
					<button
						className={styles.nextButton}
						disabled={[selectedOption === -1, !validEmail, false][step]}
						onClick={this.onNext}>
						{['Siguiente', 'Enviar', 'Volver'][step]}
					</button>
				</div>
				<Profile />
			</div>
		);
	}
}
