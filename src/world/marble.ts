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

export default class Marble {
  private _scene: Scene;
	private _bigMarble: Mesh;

	constructor(scene: Scene) {
		this._scene = scene;
		this._init();
	}

	public _init() {
		this._bigMarble = MeshBuilder.CreateSphere("bigMarble", { diameter: 5 }, this._scene);

		let material = new StandardMaterial("marbleMat", this._scene);
		material.alpha = 1;
		material.diffuseColor = new Color3(1, 0.2, 0);
		this._bigMarble.material = material;

		this._bigMarble.actionManager = new ActionManager(this._scene);
		const action = new ExecuteCodeAction(
			ActionManager.OnPickUpTrigger, (e) => {
				const mesh = e.meshUnderPointer;
				alert(mesh?.name);
			}
		)
		this._bigMarble.actionManager.registerAction(action);
	}

	protected _ensureActionManager(mesh: Mesh): AbstractActionManager {
		const actionManager = mesh.actionManager ?? new ActionManager(this._scene);
		if (!defined(mesh.actionManager)) {
			mesh.actionManager = actionManager;
		}

		return actionManager;
	}
}