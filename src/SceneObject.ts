import type { Object3D } from 'three';

export interface SceneObject {
  object3D: Object3D;
  update(time: number): void;
}
