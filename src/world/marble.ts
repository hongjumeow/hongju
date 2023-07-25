import {
	AbstractActionManager,
	ActionManager,
	Color3, 
	ExecuteCodeAction,
	Mesh,
	MeshBuilder,
	Scene,
	StandardMaterial,
} from "@babylonjs/core";

import { defined } from "../utils/type";

type MeshFeatures = {
	name: string,
	diameter: number,
	color: Color3,
	action: ExecuteCodeAction,
}

export default class Marble {
  private _scene: Scene;
	private _mesh: Mesh;

	constructor(scene: Scene, meshFeatures: MeshFeatures) {
		this._scene = scene;
		this._initMesh(meshFeatures);
	}

	private _initMesh(meshFeatures: MeshFeatures) {
		const { name, diameter, color, action } = meshFeatures;
		this._mesh = MeshBuilder.CreateSphere(name, { diameter: diameter }, this._scene);

		let material = new StandardMaterial(name + "_mat", this._scene);
		material.alpha = 1;
		material.diffuseColor = color;
		this._mesh.material = material;

		this._mesh.actionManager = new ActionManager(this._scene);
		this._mesh.actionManager.registerAction(action);
	}

	private _ensureActionManager(mesh: Mesh): AbstractActionManager {
		const actionManager = mesh.actionManager ?? new ActionManager(this._scene);
		if (!defined(mesh.actionManager)) {
			mesh.actionManager = actionManager;
		}

		return actionManager;
	}
}