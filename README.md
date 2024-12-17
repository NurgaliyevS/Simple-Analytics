# Next.js Simple Analytics Plugin

A privacy-friendly analytics solution for Next.js applications that respects user privacy and bypasses ad-blockers through a built-in proxy.

## Features

- 🔒 Privacy-focused analytics
- 🛡️ Ad-blocker resistant through built-in proxy
- 🚀 Optimized for Next.js 13+ and App Router
- 📊 Automatic event tracking
- 🎯 Custom event tracking
- 🌓 Dark mode tracking support
- 🔄 Configurable tracking options

## Installation

1. Copy the Simple Analytics plugin files into your Next.js project:
   - `components/SimpleAnalytics.tsx`
   - `lib/simple-analytics/`
   - `middleware.ts`
   - `types/simple-analytics.d.ts`

2. Add the SimpleAnalytics component to your root layout:

```tsx
// app/layout.tsx
import { SimpleAnalytics } from '@/components/SimpleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SimpleAnalytics
          enabled={true}
          ignorePages={['/admin/*', '/account/*']}
          collectEvents={['downloads', 'outbound']}
          downloadExtensions={['pdf', 'csv', 'docx']}
          customSettings={{
            collectDarkMode: true,
          }}
        >
          {children}
        </SimpleAnalytics>
      </body>
    </html>
  );
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable analytics tracking |
| `customDomain` | string | - | Custom domain for Simple Analytics |
| `mode` | 'hash' | - | Use hash-based routing |
| `collectDnt` | boolean | `false` | Collect Do Not Track visits |
| `ignorePages` | string[] | - | Pages to exclude from tracking |
| `autoCollect` | boolean | `true` | Auto-collect page views |
| `onloadCallback` | string | - | Callback function name when loaded |
| `hostname` | string | - | Override hostname |
| `saGlobal` | string | - | Override global function name |
| `collectEvents` | Array | - | Auto-collect specific events |
| `downloadExtensions` | string[] | `['pdf', 'csv', 'docx', 'xlsx', 'zip']` | File extensions to track |
| `useTitle` | boolean | `false` | Use page titles in tracking |
| `fullUrls` | boolean | `false` | Track full URLs |
| `customSettings` | object | - | Custom data attributes |

## Tracking Events

Track custom events using the global `sa_event` function:

```javascript
// Track a custom event
window.sa_event('button_click', { label: 'signup' });
```

## Verifying Installation

1. **Check Network Requests**
   - Open your browser's Developer Tools (F12)
   - Go to the Network tab
   - Look for requests to `/_sa/latest.js` and `/_sa/noscript.gif`
   - These requests should succeed even with ad-blockers enabled

2. **Verify Event Tracking**
   ```javascript
   // Test event tracking
   window.sa_event('test_event');
   ```

3. **Test Ad-blocker Bypass**
   - Enable an ad-blocker
   - Verify that analytics requests still work through the `/_sa` proxy
   - Check Network tab for successful requests

4. **Automated Events**
   - Click an outbound link
   - Download a tracked file type
   - Verify events appear in Simple Analytics dashboard

## Troubleshooting

### Common Issues

1. **Script Not Loading**
   - Check if middleware.ts is properly configured
   - Verify proxy paths in constants.ts
   - Ensure SimpleAnalytics component is wrapped around children

2. **Events Not Tracking**
   - Check if `enabled` is set to true
   - Verify the page isn't in `ignorePages`
   - Console for any JavaScript errors

3. **Ad-blocker Still Blocking**
   - Confirm requests go through `/_sa/*` paths
   - Check middleware.ts configuration
   - Verify proxy constants

### Debug Mode

Add `customSettings.debug: true` to enable debug mode:

```tsx
<SimpleAnalytics
  customSettings={{
    debug: true
  }}
>
  {children}
</SimpleAnalytics>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this in your own projects!