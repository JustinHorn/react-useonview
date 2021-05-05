import { useState } from 'react';

import './App.css';
import useOnView from 'react-useonview';

function App() {
  const [visible, setVisible] = useState(false);

  const trigger = useOnView(() => setVisible(true));

  return (
    <div>
      <div style={{ height: '100vh' }}></div>
      <div
        ref={trigger}
        style={{ opacity: visible ? '1' : '0', transition: '2s' }}
      >
        Hi!
      </div>
    </div>
  );
}

export default App;
