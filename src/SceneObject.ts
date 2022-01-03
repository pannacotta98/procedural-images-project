import type { Camera, Object3D, WebGLRenderer } from 'three';

export interface SceneObject {
  object3D: Object3D;
  update(time: number, renderer?: WebGLRenderer, camera?: Camera): void;
}
