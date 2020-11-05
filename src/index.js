import { useEffect, useRef } from 'react'

const useOnView = (doSth) => {
  const viewTrigger = useRef()

  useEffect(() => {
    const func = function (e) {
      if (viewTrigger.current) {
        const pageSize = window.innerHeight + window.pageYOffset
        const heightOfObj = calcHeight(viewTrigger.current)

        if (heightOfObj <= pageSize) {
          doSth()
        }
      }
    }

    window.addEventListener('scroll', func)
    return () => window.removeEventListener('scroll', func)
  }, [doSth])

  return viewTrigger
}

function calcHeight(obj) {
  let top = obj.offsetTop + obj.clientHeight

  while (obj.offsetParent) {
    obj = obj.offsetParent
    top += obj.offsetTop
  }
  return top
}

export default useOnView
