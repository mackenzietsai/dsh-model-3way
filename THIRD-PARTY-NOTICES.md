# Third-Party Notices

This project adapts substantial portions of the following MIT-licensed work.
The original copyright notices and permission notices are reproduced below as
required by the MIT license.

## dsh-model-provider

- Source: https://github.com/pc439527/dsh-model-provider
- License: MIT (declared in the repository README and package.json)
- What was adapted: the `conversation.input.model` slot registration wiring
  (priority −1 shadowing, per-session `inject(sessionId)` props provider),
  the pane-based selector architecture, the interaction design (current
  provider pinned first, Esc pane-back, outside-click close, default-effort
  carrying in selections), and CSS rules adapted from `src/model-provider.css`
  (class prefixes renamed `dshmp-` → `dshm3-`).

```
MIT License

Copyright (c) 2026 pc439527

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## dsh-model-search

- Source: https://github.com/a1073097082/dsh-model-search
- License: MIT
- What was referenced: the minimal client-plugin package layout
  (`package.json` with `dsh.bundle.patch` + `dsh.client` declarations, the
  `window.__ModuleLoader__.load` client bundle wrapper, and the
  `cordis.patch.yml` bundle row).

```
MIT License

Copyright (c) 2026 a1073097082

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
