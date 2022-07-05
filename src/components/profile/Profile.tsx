import {Component} from 'preact';

import Card from '../../../assets/icon-card.svg';
import Home from '../../../assets/icon-home.svg';

import {styles} from './Profile.scss';

export default class Options extends Component {
	render() {
		return (
			<div className={styles.container}>
				<img src='/image.jpg' />
				<button className={styles.homeButton}>
					<Home />
				</button>
				<div>
					<h2>Juancito Perez</h2>
					<label>Lorem ipsum dolor sit amet, consectetur adipiscing elit</label>
					<div className={styles.positionContainer}>
						<Card />
						<label>HTML Hacker</label>
					</div>
					<div className={styles.positionContainer}>
						<Card />
						<label>Lorem ipsum dolor</label>
					</div>
				</div>
				<button className={styles.nowButton}>lo quiero ya</button>
			</div>
		);
	}
}
