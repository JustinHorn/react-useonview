import React, { useState } from 'react'

import useOnView from 'react-useonview'

const App = () => {
  const [visible, setVisible] = useState(false)

  const trigger = useOnView(() => setVisible(true), { fullView: false })

  return (
    <div>
      <div style={{ height: '100vh' }}></div>
      <div
        ref={trigger}
        style={{ opacity: visible ? '1' : '0', transition: '1s' }}
      >
        Hi!
      </div>
    </div>
  )
}

export default App
