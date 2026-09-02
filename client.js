/**
 * dsh-model-3way — client half.
 *
 * Shadows the composer model seat ("conversation.input.model", single slot,
 * priority -1) with a three-entry selector:
 *
 *   Root menu
 *   ├─ Provider   opencode-go   ›
 *   ├─ Model      V4 Flash      ›
 *   └─ Effort     High          ›
 *
 * Picking a provider prefers the same-named model in the target provider
 * (one-click price-tier switching when several providers mirror the same
 * catalog); otherwise falls back to the provider's first model. Provider and
 * model panes each carry an inline search; the current provider is pinned
 * first and marked; failed providers render as retry rows; Esc walks back
 * pane by pane. The harness seat is restored verbatim when this registration
 * goes away. No changes to model routing, credentials, or session state.
 */
window.__ModuleLoader__.load({
  id: 'dsh-model-3way',
  factory: (require) => {
    const module = { exports: {} }
    const React = require('react')

    const CSS = [
      '.dshm3-root{min-width:0;position:relative}',
      '.dshm3-trigger{min-width:0;max-width:min(360px,45cqw);height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:500;line-height:20px;display:flex}',
      '.dshm3-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshm3-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}',
      '.dshm3-trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}',
      '.dshm3-triggerLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}',
      '.dshm3-triggerProvider{color:var(--dsw-alias-label-caption);white-space:nowrap;flex:none}',
      '.dshm3-triggerEffort{color:var(--dsw-alias-label-caption);flex:none}',
      '.dshm3-chevron{color:var(--dsw-alias-label-caption);flex:none;font-size:10px;line-height:1}',
      '.dshm3-menu{z-index:20;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-specific-menu);width:max-content;min-width:min(280px,100vw - 32px);max-width:min(420px,100vw - 32px);max-height:min(360px,100vh - 96px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);border-radius:12px;flex-direction:column;padding:4px;display:flex;position:absolute;bottom:calc(100% + 8px);right:0;overflow:hidden}',
      '.dshm3-status,.dshm3-empty{color:var(--dsw-alias-label-tertiary);padding:10px;font-size:13px;line-height:20px}',
      '.dshm3-error{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);border-radius:8px;gap:8px;margin-bottom:4px;padding:7px 8px;font-size:12px;line-height:18px;display:flex;align-items:center;justify-content:space-between}',
      '.dshm3-retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;padding:0;font-weight:600;flex:none}',
      '.dshm3-back{box-sizing:border-box;width:auto;min-width:100%;height:36px;color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;align-items:center;gap:6px;padding:0 8px;font-size:13px;line-height:20px;display:flex;flex:none}',
      '.dshm3-back:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshm3-backChevron{font-size:12px}',
      '.dshm3-backLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}',
      '.dshm3-subhead{color:var(--dsw-alias-label-tertiary);flex:none;padding:0 10px 2px;font-size:12px;line-height:18px}',
      '.dshm3-search{box-sizing:border-box;width:auto;min-width:100%;height:30px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l3);border-radius:10px;outline:none;padding:0 10px;font:inherit;font-size:13px;line-height:18px;flex:none;margin:2px 0 4px}',
      '.dshm3-search:focus{border-color:var(--dsw-alias-state-business-primary)}',
      '.dshm3-search::placeholder{color:var(--dsw-alias-label-tertiary)}',
      '.dshm3-list{flex:1 1 auto;min-height:0;overflow-y:auto}',
      '.dshm3-option{box-sizing:border-box;width:auto;min-width:100%;min-height:38px;color:inherit;text-align:left;cursor:pointer;background:0 0;border:none;border-radius:10px;outline:none;align-items:center;gap:8px;padding:6px 8px;display:flex}',
      '.dshm3-option:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshm3-optionCopy{flex-direction:column;flex:1;min-width:0;display:flex}',
      '.dshm3-name{color:inherit;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}',
      '.dshm3-desc{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;overflow:hidden}',
      '.dshm3-meta{color:var(--dsw-alias-label-tertiary);font-size:12px;flex:none}',
      '.dshm3-check{color:var(--dsw-alias-label-primary);flex:0 0 18px}',
      '.dshm3-cell{box-sizing:border-box;width:auto;min-width:100%;height:40px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;align-items:center;gap:8px;padding:0 10px;font-size:14px;line-height:22px;display:flex}',
      '.dshm3-cell:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dshm3-cellLabel{white-space:nowrap;flex:none}',
      '.dshm3-cellValue{text-overflow:ellipsis;white-space:nowrap;text-align:right;min-width:0;color:var(--dsw-alias-label-tertiary);flex:auto;overflow:hidden}',
      '.dshm3-cellChevron{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px}',
      '.dshm3-current{color:var(--dsw-alias-state-business-primary);font-weight:500;flex:none;font-size:12px}',
      '.dshm3-failed{color:var(--dsw-alias-state-warn-label)}'
    ].join('\n')

    const T = {
      selectModel: 'Select model',
      menuAria: 'Provider, model and effort',
      labelProvider: 'Provider',
      labelModel: 'Model',
      labelEffort: 'Effort',
      back: 'Back',
      subProvider: 'Select provider',
      subModelCount: (n) => String(n) + ' models',
      searchProviders: 'Search providers',
      searchModels: 'Search models',
      statusLoading: 'Refreshing model list…',
      errorAction: (m) => 'Model action failed: ' + m,
      errorUnknown: 'unknown error',
      retry: 'Retry',
      reload: 'Reload',
      current: 'current',
      failedPrefix: ' failed to load',
      emptyModels: 'No models available.',
      emptyProviders: 'No matching providers.',
      emptySearch: 'No matching models.',
      emptyEfforts: 'The current model offers no reasoning levels.',
      providerDefault: 'Default',
      modelsUnit: (n) => String(n) + ' models'
    }

    function effortNameOf(reasoning, effortId) {
      for (let i = 0; i < reasoning.efforts.length; i++) {
        if (reasoning.efforts[i].id === effortId) return reasoning.efforts[i].name
      }
      return effortId
    }

    function ModelSeat(props) {
      const available = props.available !== false
      const locked = props.locked === true
      const directory = props.directory
      const load = props.load
      const select = props.select

      const [snap, setSnap] = React.useState(() => {
        try { return directory ? directory.getSnapshot() : null } catch (e) { return null }
      })
      const [open, setOpen] = React.useState(false)
      const [pane, setPane] = React.useState('root')
      const [browseProvider, setBrowseProvider] = React.useState(null)
      const [errorText, setErrorText] = React.useState(null)
      const [rootNode, setRootNode] = React.useState(null)
      const [provQuery, setProvQuery] = React.useState('')
      const [modelQuery, setModelQuery] = React.useState('')

      React.useEffect(() => {
        if (!directory) return undefined
        return directory.subscribe(() => {
          try { setSnap(directory.getSnapshot()) } catch (e) { /* store gone */ }
        })
      }, [directory])

      React.useEffect(() => {
        if (available && load) { try { load() } catch (e) { /* not ready */ } }
      }, [available, load])

      if (!available || !directory) return null

      const groups = (snap && snap.groups) || []
      const failures = (snap && snap.failures) || []
      const current = snap ? snap.current : null
      const status = snap ? snap.status : 'idle'

      let currentGroup = null, currentModel = null
      if (current) {
        for (let gi = 0; gi < groups.length; gi++) {
          if (groups[gi].id === current.provider) { currentGroup = groups[gi]; break }
        }
        if (currentGroup) {
          for (let mi = 0; mi < currentGroup.models.length; mi++) {
            if (currentGroup.models[mi].id === current.model) { currentModel = currentGroup.models[mi]; break }
          }
        }
      }
      const reasoning = currentModel ? currentModel.reasoning : null
      const effectiveEffort = current
        ? (current.reasoningEffort !== undefined ? current.reasoningEffort : (reasoning ? reasoning.defaultEffort : undefined))
        : undefined
      const effortIsCustom = reasoning != null && effectiveEffort !== undefined && effectiveEffort !== reasoning.defaultEffort
      const effortName = (reasoning && effectiveEffort !== undefined) ? effortNameOf(reasoning, effectiveEffort) : effectiveEffort
      const modelLabel = currentModel ? (currentModel.name || currentModel.id) : (current ? current.model : T.selectModel)
      const providerLabel = currentGroup ? (currentGroup.name || currentGroup.id) : (current ? current.provider : null)

      function closeMenu() { setOpen(false); setPane('root'); setErrorText(null) }
      function showMenu() { setOpen(true); setPane('root'); setErrorText(null); try { if (load) load() } catch (e) { /* not ready */ } }

      function sameSel(a, b) {
        if (!a || !b) return false
        const ae = a.reasoningEffort === undefined ? null : a.reasoningEffort
        const be = b.reasoningEffort === undefined ? null : b.reasoningEffort
        return a.provider === b.provider && a.model === b.model && ae === be
      }
      function currentEffSel() {
        if (!current) return null
        const s = { provider: current.provider, model: current.model }
        if (effectiveEffort !== undefined) s.reasoningEffort = effectiveEffort
        return s
      }
      function choose(sel) {
        if (sameSel(sel, currentEffSel())) { closeMenu(); return }
        setErrorText(null)
        const p = select(sel)
        if (!p || !p.then) { closeMenu(); return }
        p.then((ok) => {
          if (ok) { closeMenu(); return }
          let s2 = null
          try { s2 = directory.getSnapshot() } catch (e) { /* store gone */ }
          setErrorText(T.errorAction((s2 && s2.error) ? s2.error : T.errorUnknown))
        }, () => { setErrorText(T.errorAction(T.errorUnknown)) })
      }
      function pickProvider(group) {
        if (current && current.provider === group.id) {
          setBrowseProvider(group.id); setModelQuery(''); setPane('model'); return
        }
        let target = null
        if (current) {
          for (let i = 0; i < group.models.length; i++) {
            if (group.models[i].id === current.model) { target = group.models[i]; break }
          }
        }
        if (!target && group.models.length > 0) target = group.models[0]
        if (!target) { setBrowseProvider(group.id); setModelQuery(''); setPane('model'); return }
        const sel = { provider: group.id, model: target.id }
        if (target.reasoning && target.reasoning.defaultEffort !== undefined) sel.reasoningEffort = target.reasoning.defaultEffort
        choose(sel)
      }
      function pickModel(group, model) {
        const sel = { provider: group.id, model: model.id }
        if (model.reasoning && model.reasoning.defaultEffort !== undefined) sel.reasoningEffort = model.reasoning.defaultEffort
        choose(sel)
      }
      function chooseEffort(effort) {
        if (!current) return
        const sel = { provider: current.provider, model: current.model }
        if (effort !== undefined) sel.reasoningEffort = effort
        choose(sel)
      }

      function onKeyDown(e) {
        if (e.key === 'Escape') {
          try { e.stopPropagation() } catch (e2) { /* fine */ }
          if (pane !== 'root') setPane('root')
          else if (open) setOpen(false)
        }
      }
      function onBlur(e) {
        if (!open) return
        const rt = e.relatedTarget
        if (rt && rootNode && typeof rt === 'object') {
          try { if (rootNode.contains(rt)) return } catch (e2) { /* fine */ }
        }
        closeMenu()
      }

      let browseGroup = null
      if (pane === 'model') {
        const pid = browseProvider || (current ? current.provider : (groups.length > 0 ? groups[0].id : null))
        if (pid) {
          for (let i2 = 0; i2 < groups.length; i2++) {
            if (groups[i2].id === pid) { browseGroup = groups[i2]; break }
          }
        }
      }

      const menuChildren = []

      if (errorText !== null) {
        menuChildren.push(React.createElement('div', { key: 'err', className: 'dshm3-error' },
          React.createElement('span', null, errorText),
          React.createElement('button', { type: 'button', className: 'dshm3-retry', onClick: () => { setErrorText(null); try { if (load) load() } catch (e) { /* not ready */ } } }, T.retry)))
      }

      if (pane === 'root') {
        menuChildren.push(React.createElement('button', {
          key: 'c-prov', type: 'button', className: 'dshm3-cell',
          onClick: () => { setProvQuery(''); setPane('provider') }
        },
          React.createElement('span', { className: 'dshm3-cellLabel' }, T.labelProvider),
          React.createElement('span', { className: 'dshm3-cellValue' }, providerLabel || '—'),
          React.createElement('span', { className: 'dshm3-cellChevron' }, '›')))
        menuChildren.push(React.createElement('button', {
          key: 'c-model', type: 'button', className: 'dshm3-cell',
          onClick: () => { setModelQuery(''); setBrowseProvider(current ? current.provider : null); setPane('model') }
        },
          React.createElement('span', { className: 'dshm3-cellLabel' }, T.labelModel),
          React.createElement('span', { className: 'dshm3-cellValue' }, modelLabel),
          React.createElement('span', { className: 'dshm3-cellChevron' }, '›')))
        if (reasoning) {
          menuChildren.push(React.createElement('button', {
            key: 'c-effort', type: 'button', className: 'dshm3-cell',
            onClick: () => { setPane('effort') }
          },
            React.createElement('span', { className: 'dshm3-cellLabel' }, T.labelEffort),
            React.createElement('span', { className: 'dshm3-cellValue' }, effortName != null ? effortName : T.providerDefault),
            React.createElement('span', { className: 'dshm3-cellChevron' }, '›')))
        }
      }

      if (pane === 'provider') {
        const provList = groups.slice()
        if (current && current.provider) {
          const cp = current.provider
          provList.sort((a, b) => (a.id === cp ? -1 : (b.id === cp ? 1 : 0)))
        }
        const q = provQuery.trim().toLowerCase()
        const provRows = []
        for (let pi = 0; pi < provList.length; pi++) {
          const g = provList[pi]
          const hay = ((g.name || '') + ' ' + (g.id || '')).toLowerCase()
          if (q !== '' && hay.indexOf(q) === -1) continue
          const isCurP = current && current.provider === g.id
          provRows.push(React.createElement('button', {
            key: 'p:' + g.id, type: 'button', className: 'dshm3-option',
            onClick: ((grp) => () => pickProvider(grp))(g)
          },
            React.createElement('span', { className: 'dshm3-optionCopy' },
              React.createElement('span', { className: 'dshm3-name' }, g.name || g.id)),
            React.createElement('span', { className: 'dshm3-meta' }, T.modelsUnit(g.models.length) + (isCurP ? ' · ' + T.current : ''))))
        }
        for (let fi = 0; fi < failures.length; fi++) {
          const f = failures[fi]
          provRows.push(React.createElement('button', {
            key: 'f:' + f.id, type: 'button', className: 'dshm3-option dshm3-failed',
            onClick: () => { try { if (load) load() } catch (e) { /* not ready */ } }
          },
            React.createElement('span', { className: 'dshm3-optionCopy' },
              React.createElement('span', { className: 'dshm3-name' }, '⚠ ' + (f.name || f.id) + T.failedPrefix)),
            React.createElement('span', { className: 'dshm3-meta' }, T.reload)))
        }
        menuChildren.push(React.createElement('button', { key: 'back', type: 'button', className: 'dshm3-back', onClick: () => { setPane('root') } },
          React.createElement('span', { className: 'dshm3-backChevron' }, '‹'),
          React.createElement('span', { className: 'dshm3-backLabel' }, T.back)))
        menuChildren.push(React.createElement('div', { key: 'sub', className: 'dshm3-subhead' }, T.subProvider))
        menuChildren.push(React.createElement('input', {
          key: 'sq', type: 'search', className: 'dshm3-search', placeholder: T.searchProviders,
          value: provQuery, onChange: (e) => setProvQuery(e.target.value)
        }))
        menuChildren.push(React.createElement('div', { key: 'list', className: 'dshm3-list' },
          status === 'loading' ? React.createElement('div', { className: 'dshm3-status' }, T.statusLoading) : null,
          provRows.length === 0 && status !== 'loading' ? React.createElement('div', { className: 'dshm3-empty' }, groups.length === 0 ? T.emptyModels : T.emptyProviders) : null,
          provRows))
      }

      if (pane === 'model') {
        menuChildren.push(React.createElement('button', { key: 'back', type: 'button', className: 'dshm3-back', onClick: () => { setPane('root') } },
          React.createElement('span', { className: 'dshm3-backChevron' }, '‹'),
          React.createElement('span', { className: 'dshm3-backLabel' }, browseGroup ? (browseGroup.name || browseGroup.id) : T.labelModel)))
        if (browseGroup) {
          const mq = modelQuery.trim().toLowerCase()
          const modelRows = []
          const mlist = browseGroup.models || []
          for (let mj = 0; mj < mlist.length; mj++) {
            const m = mlist[mj]
            if (mq !== '') {
              const mhay = ((m.name || '') + ' ' + (m.id || '') + ' ' + (m.description || '')).toLowerCase()
              if (mhay.indexOf(mq) === -1) continue
            }
            const isCurM = current && current.provider === browseGroup.id && current.model === m.id
            modelRows.push(React.createElement('button', {
              key: 'm:' + m.id, type: 'button', className: 'dshm3-option',
              onClick: ((grp, mdl) => () => pickModel(grp, mdl))(browseGroup, m)
            },
              React.createElement('span', { className: 'dshm3-optionCopy' },
                React.createElement('span', { className: 'dshm3-name' }, m.name || m.id),
                m.description ? React.createElement('span', { className: 'dshm3-desc' }, m.description) : null),
              isCurM ? React.createElement('span', { className: 'dshm3-check' }, '✓') : null))
          }
          menuChildren.push(React.createElement('div', { key: 'sub', className: 'dshm3-subhead' }, T.subModelCount(mlist.length)))
          menuChildren.push(React.createElement('input', {
            key: 'sq', type: 'search', className: 'dshm3-search', placeholder: T.searchModels,
            value: modelQuery, onChange: (e) => setModelQuery(e.target.value)
          }))
          menuChildren.push(React.createElement('div', { key: 'list', className: 'dshm3-list' },
            status === 'loading' ? React.createElement('div', { className: 'dshm3-status' }, T.statusLoading) : null,
            modelRows.length === 0 && status !== 'loading' ? React.createElement('div', { className: 'dshm3-empty' }, T.emptySearch) : null,
            modelRows))
        } else {
          menuChildren.push(React.createElement('div', { key: 'empty', className: 'dshm3-empty' }, T.emptyModels))
        }
      }

      if (pane === 'effort') {
        const effRows = []
        if (reasoning) {
          if (reasoning.defaultEffort === undefined) {
            effRows.push(React.createElement('button', {
              key: 'e:default', type: 'button', className: 'dshm3-option',
              onClick: () => { chooseEffort(undefined) }
            },
              React.createElement('span', { className: 'dshm3-optionCopy' }, React.createElement('span', { className: 'dshm3-name' }, T.providerDefault)),
              effectiveEffort === undefined ? React.createElement('span', { className: 'dshm3-check' }, '✓') : null))
          }
          const effs = reasoning.efforts || []
          for (let ek = 0; ek < effs.length; ek++) {
            ((lv) => {
              const isCurE = effectiveEffort === lv.id
              effRows.push(React.createElement('button', {
                key: 'e:' + lv.id, type: 'button', className: 'dshm3-option',
                onClick: () => { chooseEffort(lv.id) }
              },
                React.createElement('span', { className: 'dshm3-optionCopy' },
                  React.createElement('span', { className: 'dshm3-name' }, lv.name || lv.id),
                  lv.description ? React.createElement('span', { className: 'dshm3-desc' }, lv.description) : null),
                isCurE ? React.createElement('span', { className: 'dshm3-check' }, '✓') : null))
            })(effs[ek])
          }
        }
        menuChildren.push(React.createElement('button', { key: 'back', type: 'button', className: 'dshm3-back', onClick: () => { setPane('root') } },
          React.createElement('span', { className: 'dshm3-backChevron' }, '‹'),
          React.createElement('span', { className: 'dshm3-backLabel' }, T.back)))
        menuChildren.push(React.createElement('div', { key: 'list', className: 'dshm3-list' },
          effRows.length === 0 ? React.createElement('div', { className: 'dshm3-empty' }, T.emptyEfforts) : effRows))
      }

      const menu = open
        ? React.createElement('div', { className: 'dshm3-menu', role: 'menu', 'aria-label': T.menuAria }, menuChildren)
        : null

      return React.createElement('div', { className: 'dshm3-root', ref: setRootNode, onKeyDown: onKeyDown, onBlur: onBlur },
        React.createElement('button', {
          type: 'button', className: 'dshm3-trigger', 'aria-haspopup': 'menu', 'aria-expanded': String(open),
          disabled: locked, title: modelLabel,
          onClick: () => { if (open) closeMenu(); else showMenu() }
        },
          React.createElement('span', { className: 'dshm3-triggerLabel' }, modelLabel),
          providerLabel ? React.createElement('span', { className: 'dshm3-triggerProvider' }, '· ' + providerLabel) : null,
          (effortIsCustom && effortName) ? React.createElement('span', { className: 'dshm3-triggerEffort' }, '· ' + effortName) : null,
          React.createElement('span', { className: 'dshm3-chevron' }, '▾')),
        menu)
    }

    const inject = ['slots', 'modelDirectories', 'sessions']

    function apply(ctx) {
      ctx.effect(() => {
        const styleEl = document.createElement('style')
        styleEl.textContent = CSS
        document.head.appendChild(styleEl)

        const disposeSeat = ctx.slots.inject('conversation.input.model', () => ctx.slots.register({
          name: 'conversation.input.model',
          priority: -1,
          registrant: 'dsh-model-3way',
          inject: (sessionId) => {
            let available = true
            try { available = ctx.sessions.subagentAddress(sessionId) === undefined } catch (e) { /* keep default */ }
            let directory = null
            try { directory = ctx.modelDirectories.directoryFor(sessionId) } catch (e) { /* keep null */ }
            return {
              available,
              directory: directory ? directory.store : null,
              load: () => {
                if (available && directory) {
                  try { const p = directory.load(); if (p && p.catch) p.catch(() => {}) } catch (e) { /* not ready */ }
                }
              },
              select: (selection) => {
                if (!available || !directory) return Promise.resolve(false)
                try {
                  const p = directory.select(selection)
                  if (p && p.then) return p.then(() => true, () => false)
                } catch (e) { /* fall through */ }
                return Promise.resolve(false)
              }
            }
          }
        }, ModelSeat))

        return () => {
          try { if (typeof disposeSeat === 'function') disposeSeat() } catch (e) { /* fine */ }
          try { styleEl.remove() } catch (e) { /* fine */ }
        }
      })
    }

    module.exports = { apply, inject }
    return module.exports
  }
})
