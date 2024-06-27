import { auto } from 'browser-unhandled-rejection';
import { serviceWorkerUpdate } from 'web-utility';
import { configure } from 'mobx';
import { createRoot } from 'react-dom/client';
import { message } from 'antd';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer
} from '@ant-design/cssinjs';

import PageRoot from './page';

auto();

configure({ enforceActions: 'never' });

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

createRoot(document.querySelector('main')).render(
  <StyleProvider
    hashPriority="high"
    transformers={[legacyLogicalPropertiesTransformer]}
  >
    <PageRoot />
  </StyleProvider>
);
