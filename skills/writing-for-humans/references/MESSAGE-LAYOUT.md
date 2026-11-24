# Message and catch-up layout

Read this reference when writing, editing, or reviewing a **chat message** (Teams, Slack), an **email**, or a **catch-up after time away**.

## Message layout

People read chat messages and emails in a narrow pane, often on a phone, and scan before they read. Lay out every chat message or email, in any mode, in this order:

1. the greeting on its own line, in the same message as the ask, addressed to the person who acts, then an empty line;
2. the ask as one bold sentence alone on its line;
3. directly under the ask, in the same block, each short context line (such as timing or what changed) on its own line, with no blank line between the ask and these lines (scoped to short metadata lines under an ask; keep reasoning paragraphs separate);
4. when three or more separate, parallel facts support the ask, such as one per system or per step, a list with one fact per item, each item opening with a bold label naming its subject;
5. any remaining need, deadline, or reassurance in its own short paragraph (one to three sentences per paragraph);
6. for email only, a subject naming the topic and action at the top, and the sign-off on its own line after a blank line at the bottom.

A chat message, such as one in Teams or Slack, ends on the ask, the deadline, or the last fact. It has no sign-off, signature, trailing mention, name, or closing pleasantry: the client already shows who sent it, and any `@mention` belongs inline in the greeting. Keep the sign-off in email, and add a signature block only when the user's own template has one.

Never run the ask and its context together in one sentence or line, and never let the sign-off touch the paragraph above it. Bold only the ask and the list-item labels, in the target's own syntax: `<strong>` in HTML, `**text**` in Markdown, and `*text*` in Slack. Plain-text email has no bold, so leave the ask unmarked on its own line and end each list label with a colon.

The ask and the context lines under it form one block:

- **HTML:** put them in one `<p>` with the ask in `<strong>` and `<br>` before each context line.
- **Markdown:** end the ask and every context line but the last with a hard line break (two trailing spaces or `\`).
- **Plain text:** put each on its own single newline (`\n`).
- With no context lines, the ask is a paragraph of its own.

Email clients, Teams, and Slack often collapse space between paragraphs, so write the two empty lines this layout names explicitly: after the greeting, and before an email's sign-off. In HTML email or Teams, put `<p>&nbsp;</p>` at each; in Slack or plain-text email, use two newlines. Add no `<p>&nbsp;</p>` anywhere else.

## Mentions

When the target supports mentions, put the mention **inline inside the greeting** (for example, `<p>Hi <at id="0">Priya</at>,</p>` in Teams or `Hi <@U04ABCD1234>,` in Slack) in both 1:1 and group chats so the person who acts is notified. Never leave the greeting as plain text and place or append a mention at the bottom of the message. Slack needs only its markup. In Teams and Outlook, markup alone notifies no one, so each form needs its matching metadata:

- **Teams message sent through Graph:** `<at id="0">First Name</at>` inline in the greeting of an HTML body (use the person's first name when unambiguous; otherwise the supplied display name), plus a `mentions` entry with `id` `0`, `mentionText` equal to the exact text inside `<at>`, and `mentioned.user` holding the person's Entra object ID, full `displayName`, and `userIdentityType` `aadUser`.
- **Teams Adaptive Card (bot or incoming webhook):** `<at>First Name</at>` inline in the greeting of the card text, plus an `msteams.entities` item of type `mention` whose `text` repeats that exact `<at>` string and whose `mentioned` holds the UPN or Entra object ID and full name.
- **Teams MCP or wrapper tools:** bind the mention to the inline `<at id="0">First Name</at>` tag in the greeting. If a tool's `mentions` parameter appends mentions to the end of the body instead of binding inline, do not pass that parameter — write the plain first name in the greeting and tell the user the tool cannot place inline mentions.
- **Slack:** `<@USER_ID>` inline in the greeting.
- **Outlook email:** a mention is message metadata, not body markup. Write `@Display Name` as plain text and tell the author to retype it in Outlook by typing `@` and picking the person, which also adds them to `To`. Never use a `mailto` anchor as a mention; it is only a link.

Use only the name, ID, or address the author or a lookup tool supplied; when none is available, write the plain first name in the greeting and note that a mention needs the ID.

## Catch-up after time away

Use this shape when catching someone up after they were away:

1. **Opening line:** name what waits on the reader right now, or state that nothing does.
2. **Item-by-item status:** one line per thing they asked for, stating what came of it and whether it is `done`, `running`, `failed`, or `not checked` — never a bare count or a bare link in place of an item.
3. **Pending decisions:** for each open decision, state your recommendation plus the concrete facts, evidence, and risk needed to decide from the message alone.
