import { auto } from 'browser-unhandled-rejection';
import { serviceWorkerUpdate } from 'web-utility';
import { render } from 'react-dom';
import message from 'antd/es/message';

import PageRoot from './page';

auto();

globalThis.addEventListener('unhandledrejection', ({ reason }) => {
  if (reason instanceof URIError) message.error(reason.message);
});

const { serviceWorker } = window.navigator;

if (process.env.NODE_ENV !== 'development')
  serviceWorker
    ?.register('sw.js')
    .then(serviceWorkerUpdate)
    .then(worker => {
      if (window.confirm('New version of this Web App detected, update now?'))
        worker.postMessage({ type: 'SKIP_WAITING' });
    });

serviceWorker?.addEventListener('controllerchange', () =>
  window.location.reload()
);

render(<PageRoot />, document.querySelector('main'));
