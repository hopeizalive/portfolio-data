import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// #region agent log
fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:4',message:'index.tsx executing',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H5'})}).catch(()=>{});
// #endregion

const rootElement = document.getElementById('root');
// #region agent log
fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:8',message:'Root element check',data:{rootElementExists:!!rootElement},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H5'})}).catch(()=>{});
// #endregion
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
// #region agent log
fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:12',message:'React root created',data:{rootExists:!!root},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H5'})}).catch(()=>{});
// #endregion
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// #region agent log
fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:16',message:'App render called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H5'})}).catch(()=>{});
// #endregion