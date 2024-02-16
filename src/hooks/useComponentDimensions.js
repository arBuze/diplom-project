import { useState, useEffect } from 'react';

function getComponentDimensions(component) {
  const componentWidth = component.clientWidth;
  console.log(component);
  return componentWidth;
}

export default function useComponentDimensions(component) {
  const [componentDimensions, setComponentDimensions] = useState(getComponentDimensions(component));

  useEffect(() => {
    function handleResize() {
      console.log(component);
      setComponentDimensions(getComponentDimensions(component));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return componentDimensions;
}
