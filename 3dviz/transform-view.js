import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/shoelace-autoloader.js';
// import { parseToAFrame } from './utils.js';

function parseToAFrame(v) {
	if (v.x != undefined)
		return [v.x, v.y, v.z];
	else return v;
}

export class TransformView extends LitElement {
    static styles = css`
		div {
			margin: 1px;
		}
	`;
	static comps = ["rotation", "position", "scale"];

    static properties = {
        rotation: { type: String },
		position: { type: String },
		scale: { type: String },
    };

	get _input() {
		return Array.from(this.renderRoot?.querySelectorAll('array-view')) ?? null;
	}

	get transform() {
		this.position = this._input[0].values.map(d => +d);
		this.rotation = this._input[1].values.map(d => +d);
		// this.scale = this._input[2].values.map(d => +d);
		return {"position": this.position, "rotation": this.rotation, "scale": this.scale};
	}

	set transform(values) {
		this.position = parseToAFrame(values.position) ?? this.position;
		this.rotation = parseToAFrame(values.rotation) ?? this.rotation;
		// this.scale = parseToAFrame(values.scale) ?? this.scale;
		this._input[0].values = this.position;
		this._input[1].values = this.rotation;
		// this._input[2].values = this.scale;
	}

    constructor() {
        super();
		this.name = "Model name";
        this.rotation = [1,1,1];
		this.position = [1,1,1];
		// this.scale = [1,1,1];
    }

    render() {
        return html`
			<div>${this.name}</div>
			<array-view data="${"["+this.position.join(",")+"]"}" name="Position"></array-view>
		    <array-view data="${"["+this.rotation.join(",")+"]"}" name="Rotation"></array-view>
		`;
		// <!-- <array-view data="${"["+this.scale.join(",")+"]"}" name="Scale"></array-view> -->

    }
}

customElements.define('transform-view', TransformView);