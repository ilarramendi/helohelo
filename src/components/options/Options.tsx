import {Component} from 'preact';

import Chevron from '../../../assets/icon-chevron-right.svg';

import {styles} from './Options.scss';

interface Props {
	options: any[];
	selected: number;
	onClick: (selected: number) => void;
}

export default class Options extends Component<Props> {
	render({options, selected, onClick}) {
		return (
			<div className={styles.container}>
				{options.map((o, i) => (
					<button
						className={`${styles.option} ${selected == i && styles.selected}`}
						onClick={() => onClick(i)}>
						<img src={o.image} />
						<label>{o.label}</label>
						<Chevron />
					</button>
				))}
			</div>
		);
	}
}
