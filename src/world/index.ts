import { EventEmitter } from "events";
import {
	ArcRotateCamera,
	Engine,
	HemisphericLight,
	Scene,
	Vector3,
	MeshBuilder,
	Color3,
	StandardMaterial,
	CubeTexture,
	Texture,
	PhotoDome,
} from "@babylonjs/core";

import Marble from "./marble";

export default class World {
	private readonly _events = new EventEmitter();
	public on = this._events.on.bind(this._events);
	public once = this._events.once.bind(this._events);
	public off = this._events.off.bind(this._events);
	public emit = this._events.emit.bind(this._events);

	private _canvas: HTMLCanvasElement;
	private _engine: Engine;
	private _camera: ArcRotateCamera;

	public scene: Scene;

	constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		this._engine = new Engine(canvas, false, {}, true);
		this.scene = new Scene(this._engine);
	}

	private _onSceneReady = (): void => {
		this._events.on("onDrop", function() {console.log("hi")});

		this._camera = new ArcRotateCamera("camera1", 0, 0, 20, new Vector3(4, 0, -10), this.scene);
		this._camera.setTarget(Vector3.Zero());
		this._camera.attachControl(this._canvas, true);

    const skyDome = new PhotoDome(
			"skyDome",
			"./duskfair2.jpg",
			{
					resolution: 32,
					size: 1000,
					useDirectMapping: false,
					halfDomeMode: true,
			},
			this.scene
		);
		skyDome.rotation.x = - Math.PI / 2;
		skyDome.position.y = -15;

		const ground = MeshBuilder.CreateGround("ground", {width: 1000, height: 1000}, this.scene);
		ground.position.y = -15;
		const groundMaterial = new StandardMaterial("grass_mat", this.scene);
		groundMaterial.diffuseColor = new Color3(.5, .5, .5);
		ground.material = groundMaterial;

		const light = new HemisphericLight("light", new Vector3(0, 100, 0), this.scene);
		light.intensity = 0.7;

		for (let i=0; i<20; i++) {
			const marble = new Marble(this.scene, {
				name: "marble_" + i,
				diameter: 1,
				textureImg:'earth.jpeg',
				action:(e) => {alert(e.meshUnderPointer)}}
			);
		}
	}

	public dropMarbles = (): void => {
		console.log("drop marbles");
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

	public resize = (): void => {
		this._engine.resize();
	}
}