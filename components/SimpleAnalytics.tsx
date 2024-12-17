'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { SimpleAnalyticsProps } from '@/lib/simple-analytics/types';
import { getScriptAttributes, getScriptUrl, getNoscriptUrl } from '@/lib/simple-analytics/utils';

export function SimpleAnalytics(props: SimpleAnalyticsProps) {
  const { enabled = true, children, ...config } = props;

  useEffect(() => {
    // Initialize events queue
    window.sa_event = window.sa_event || function(...args: any[]) {
      const a = [].slice.call(args);
      window.sa_event.q ? window.sa_event.q.push(a) : window.sa_event.q = [a];
    };
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  const scriptUrl = getScriptUrl(config);
  const noscriptUrl = getNoscriptUrl(config);
  const attributes = getScriptAttributes(config);

  return (
    <>
      <Script
        id="sa-events-queue"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`,
        }}
      />
      <Script
        async
        defer
        src={scriptUrl}
        {...attributes}
      />
      <noscript>
        <img
          src={noscriptUrl}
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      {children}
    </>
  );
}