import {
	ActionManager,
	ExecuteCodeAction,
	Color3,
	Mesh,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Texture,
	ActionEvent,
	Scalar,
} from "@babylonjs/core";

import { defined } from "../utils/type";

type MeshFeatures = {
	name: string,
	diameter: number,
	textureImg?: string,
	action: (e: ActionEvent) => void,
}

export default class Marble {
  private _scene: Scene;
	private _mesh: Mesh;

	constructor(scene: Scene, meshFeatures: MeshFeatures) {
		this._scene = scene;
		this._initMesh(meshFeatures);
	}

	private _initMesh(meshFeatures: MeshFeatures) {
		const { name, diameter, textureImg, action } = meshFeatures;
		this._mesh = MeshBuilder.CreateSphere(name, { diameter: diameter }, this._scene);

		this._setMaterial(textureImg);
		this._setActionManager(action);
		this._setRandomPosition();
	}

	private _setMaterial(textureImg?: string) {
		let material = new StandardMaterial("mat");
		if (defined(textureImg)) {
			material.diffuseTexture = new Texture(textureImg);
		} else {
			material.diffuseColor = new Color3(1, 0.2, 0);
		}
		this._mesh.material = material;
	}

	private _setActionManager(action: (e: ActionEvent) => void) {
		const actionManager = this._mesh.actionManager ?? new ActionManager(this._scene);
		if (!defined(this._mesh.actionManager)) {
			this._mesh.actionManager = actionManager;
		}
		this._mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, action));
	}

	private _setRandomPosition() {
		this._mesh.position.x = Scalar.RandomRange(-10, 10);
		this._mesh.position.y = Scalar.RandomRange(-10, 10);
		this._mesh.position.z = Scalar.RandomRange(-10, 10);
	}

	public getMesh() {
		return this._mesh;
	}
	
	public disposeMesh() {
		return this._mesh.dispose();
	}
}