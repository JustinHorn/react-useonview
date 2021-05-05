import { useEffect, useRef } from 'react';

/**
 *  @param doSth - function triggered when HTML element  has been scrolled in to view
 *  @param fullView - set fullView:false | true to decided whether the full object shall have been scrolled into view until the function is triggered
 *
 * @returns viewTrigger - a useRef<HTMLElement>() ref
 */
const useOnView = (doSth: () => void, fullView?: boolean) => {
  const viewTrigger = useRef<HTMLElement>();

  useEffect(() => {
    const func = function (_event: any) {
      if (viewTrigger.current) {
        const pageHeightLocation = window.innerHeight + window.pageYOffset;
        const objectPageHeight = calcHeight(viewTrigger.current, fullView);

        if (objectPageHeight <= pageHeightLocation) {
          doSth();
        }
      }
    };

    window.addEventListener('scroll', func);
    return () => window.removeEventListener('scroll', func);
  }, [doSth]);

  return viewTrigger;
};

function calcHeight(obj: HTMLElement, fullView?: boolean) {
  let top = obj.offsetTop;

  if (fullView) {
    top += obj.clientHeight;
  }

  while (obj.offsetParent) {
    obj = obj.offsetParent as HTMLElement;
    top += obj.offsetTop;
  }
  return top;
}

export default useOnView;
