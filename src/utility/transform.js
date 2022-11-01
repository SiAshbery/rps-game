export const transformGameObject = (targetObject, transform) => {
  const gameObject = targetObject.gameObject || targetObject;
  if (transform.position !== null) {
    gameObject.setPosition(transform.position);
  }
  if (transform.scale !== null) {
    gameObject.setPosition(transform.scale);
  }

  return targetObject;
};

export default transformGameObject;
