import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import {input} from 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/shoelace-autoloader.js';
// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/components/input/input.js';
// import {map} from 'https://unpkg.com/lit-html/directives?module';
import { map } from 'https://cdn.skypack.dev/lit@2.7.4/directives/map.js';

export class ArrayView extends LitElement {
	static styles = css`
		sl-input {
			margin: 2px;
			width: 8vw;
		}
		label {
			display: grid;
			grid: auto / var(--label-width) 1fr;
			gap: var(--sl-spacing-3x-small) var(--gap-width);
			align-items: center;
		}
	`;

	static properties = {
		data: {type: Object},
		name: {type: String}
	};

	constructor() {
		super();
		this.name = "Name";
		this.data = [1,2,3];
	}

	_inputChanged(e) {
		const event = new Event('value-change', {bubbles: true, composed: true});
		this.dispatchEvent(event);
	}

	get _input() {
		return Array.from(this.renderRoot?.querySelectorAll('sl-input')) ?? null;
	}

	get values() {
		return this._input.map(d => d.value);
	}

	set values(values) {
		this._input.forEach((d,i) => d.value = values[i])
	}

	render() {
		return html`
		<div>${this.name}</div>
		<div style="display: flex;">
			${map(["X","Y","Z"], (d,i) => html`
				<div style="display: flex;">
					<label for="${d}">${d}:</label>
					<sl-input @input=${this._inputChanged} size="small"
						type="number" name="${d}" value=${this.data[i]}></sl-input>
				</div>
			`)}
		</div>
		`;
	}
}
customElements.define('array-view', ArrayView);
