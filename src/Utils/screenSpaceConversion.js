/* eslint-disable no-undef */
import { Vector3 } from 'three';

// eslint-disable-next-line import/prefer-default-export
export const screenToWorldSpace = ({ xy: [x, y], z, camera, size }) => {
  // normalize screenspace coordinates
  const mouse = new Vector3((x / size.width) * 2 - 1, (-y / size.height) * 2 + 1, 0);
  const cameraPos = camera.position;
  // project normalize coordinates with camera
  const vector = mouse.unproject(camera);
  // get normalized vector in direction of worldspace point
  vector.sub(camera.position).normalize();
  // get scalar between camera and worldspace point
  const distance = (z - camera.position.z) / vector.z;
  // scale target vector from camera worldspace to desired mouse coordinate in worldspace
  const worldSpace = cameraPos.add(vector.multiplyScalar(distance));
  return worldSpace;
};
