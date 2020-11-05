# react-useonview

> A react hook that returns a ref and does sth. when the element attached to that ref is scrolled into view.

[![NPM](https://img.shields.io/npm/v/react-useonview.svg)](https://www.npmjs.com/package/react-useonview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-useonview
```

or

```bash
yarn add react-useonview
```

## Usage

```jsx
import React, { Component } from 'react'

import useOnView from 'react-useonview'

const App = () => {
  const [visible, setVisible] = useState(false)

  const trigger = useOnView(() => setVisible(true))

  return (
    <div>
      <div style={{ height: '100vh' }}></div>
      <div
        ref={trigger}
        style={{ opacity: visible ? '1' : '0', transition: '1s' }}
      >
        I appear when scrolled into view
      </div>
    </div>
  )
}
```

## notes

- the function will probably execute several times
- does not care whether the element which has the ref attached is actually visible
- you could also just use the code below

## whole code

<code>
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
</code>

## License

MIT © [JustinHorn](https://github.com/JustinHorn)
