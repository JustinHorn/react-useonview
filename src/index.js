import { useEffect, useRef } from 'react'

const useOnView = (
  doSth,
  options = {},
  condition = () => {
    return true
  }
) => {
  const viewTrigger = useRef()

  useEffect(() => {
    const func = function (e) {
      if (viewTrigger.current) {
        const pageHeightLocation = window.innerHeight + window.pageYOffset
        const objectPageHeight = calcHeight(viewTrigger.current, options)

        if (
          objectPageHeight <= pageHeightLocation &&
          condition(objectPageHeight, pageHeightLocation)
        ) {
          doSth()
        }
      }
    }

    window.addEventListener('scroll', func)
    return () => window.removeEventListener('scroll', func)
  }, [doSth])

  return viewTrigger
}

function calcHeight(obj, options) {
  let top = obj.offsetTop

  if (options.fullView) {
    top += obj.clientHeight
  }

  while (obj.offsetParent) {
    obj = obj.offsetParent
    top += obj.offsetTop
  }
  return top
}

export default useOnView
