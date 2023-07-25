import { EventEmitter } from "events";
import { 
	AbstractActionManager,
	ActionManager,
	ArcRotateCamera,
	Color3,
	Engine,
	ExecuteCodeAction,
	HemisphericLight,
	Mesh,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Vector3,
} from "@babylonjs/core";

import { defined } from "../utils/type";
import Marble from "./marble";

export default class World {
	private readonly _events = new EventEmitter();
	public on = this._events.on.bind(this._events);
	public once = this._events.once.bind(this._events);
	public off = this._events.off.bind(this._events);

	private _canvas: HTMLCanvasElement;
	private _engine: Engine;
	private _camera: ArcRotateCamera;

	private _bigMarble: Marble;

	public scene: Scene;

	constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		this._engine = new Engine(canvas, false, {}, true);
		this.scene = new Scene(this._engine);
	}

	private _onSceneReady = () => {
		this._camera = new ArcRotateCamera("camera1", 0, 0, 10, new Vector3(4, 0, -10), this.scene);
		this._camera.setTarget(Vector3.Zero());
		this._camera.attachControl(this._canvas, true);

		const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
		light.intensity = 0.7;
	
		this._bigMarble = new Marble(
			this.scene, {
				name: "big_marble",
				diameter: 10,
				color: new Color3(1, 0.2, 0),
				action: new ExecuteCodeAction(
					ActionManager.OnPickUpTrigger, (e) => {
						const mesh = e.meshUnderPointer;
						alert(mesh?.name);
					}
				)
			});
	}

	public start = (): void => {
		if (this.scene.isReady()) {
			this._onSceneReady();
		} 
		else {
			this.scene.onReadyObservable.addOnce(() => this._onSceneReady());
		}

		this._engine.runRenderLoop(() => {
			if (this.scene.activeCamera) {
				this.scene.render();
			}
		});
	}

	public resize = () => {
		this._engine.resize();
	}
}