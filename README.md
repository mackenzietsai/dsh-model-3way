# dsh-model-3way

Three-entry model selector for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) composer seat.

```
Root menu
├─ Provider    opencode-go   ›
├─ Model       V4 Flash      ›
└─ Effort      High          ›
```

- **Provider / Model / Effort are sibling entries** in the root menu, each showing its current value — no flattened provider × model list.
- **Picking a provider prefers the same-named model** in the target provider (one-click price-tier switching when several providers mirror the same catalog); otherwise falls back to the provider's first model.
- Inline search on the provider pane (by name/id) and the model pane (current provider only); current provider pinned first and marked `· current`; failed providers render as retry rows.
- Effort entry appears only when the current model declares reasoning levels; the trigger shows `Model · Provider` and appends `· Effort` only for a non-default effort.
- Esc walks back pane by pane; clicking outside closes.
- Pure client plugin: shadows the single `conversation.input.model` slot at priority −1 through the official Slot system — no DOM hacks, no changes to model routing, credentials, or session state. The harness seat is restored verbatim when the plugin is removed.

## Install

```sh
dsh plugin --profile web add github:mackenzietsai/dsh-model-3way
```

Restart `dsh --profile web` after installing.

## License

MIT
