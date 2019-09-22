const diveUntillTarget = (component, componentToReach) => {
  let currentComponent = component;
  let tries = 0;
  const MAX_TRIES = 15;
  const recursiveDive = () => {
    if (currentComponent.name() !== componentToReach && tries <= MAX_TRIES) {
      currentComponent = currentComponent.dive();
      tries += 1;
      recursiveDive();
    }
  };
  recursiveDive();
  return currentComponent.dive();
};

export default diveUntillTarget