<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep this portfolio frontend-only, using page anchors for its single-page sections; no persistence is needed.
- Keep all portfolio styling and semantic visual tokens in src/styles.css to maintain one consistent design system.
- Contact actions must not claim a message was sent without a configured destination; use a clearly labeled copyable consultation brief until real contact information is supplied.
