export default function ConnectPreview() {
  return (
<div aria-label="CS Connect messenger preview" className="product-ui connect-product-ui service-media-slot" data-connect-preview="">
<aside className="csc-rail" aria-label="Messenger navigation">
<div className="csc-rail-logo"><cs-brand-logo aria-hidden="true" label="" state="connect"></cs-brand-logo></div>
<button className="is-active" type="button" aria-label="Conversations">◫</button><button type="button" aria-label="People">◎</button><button type="button" aria-label="Files">⌁</button>
<span></span><button type="button" aria-label="New conversation">＋</button><div className="csc-avatar">YK<i></i></div>
</aside>
<aside className="csc-conversations">
<div className="csc-list-head"><div><strong>Messages</strong><small>CS Connect</small></div><button type="button" aria-label="Start conversation">＋</button></div>
<label className="csc-search"><span aria-hidden="true">⌕</span><input aria-label="Search conversations" placeholder="Search conversations" type="search" /></label>
<div className="csc-filter" aria-label="Conversation filter"><button className="is-active" data-connect-filter="all" type="button">All</button><button data-connect-filter="channels" type="button">Groups</button><button data-connect-filter="direct" type="button">Direct</button></div>
<div className="csc-group" data-connect-group="channels"><div className="csc-group-label"><span>GROUPS</span><button type="button">＋</button></div>
<button className="csc-conversation" data-connect-kind="channels" data-connect-target="general" type="button"><i className="csc-channel-icon">#</i><span><b>general</b><small>Omar: Morning everyone</small></span><time>9:12</time></button>
<button className="csc-conversation is-active" data-connect-kind="channels" data-connect-target="launch" type="button"><i className="csc-channel-icon csc-violet">#</i><span><b>launch</b><small>Aisha: Checklist is ready</small></span><time>10:29</time><em>3</em></button>
<button className="csc-conversation" data-connect-kind="channels" data-connect-target="operations" type="button"><i className="csc-channel-icon">#</i><span><b>operations</b><small>Lina shared a file</small></span><time>11:04</time></button>
</div>
<div className="csc-group" data-connect-group="direct"><div className="csc-group-label"><span>DIRECT MESSAGES</span><button type="button">＋</button></div>
<button className="csc-conversation" data-connect-kind="direct" data-connect-target="aisha" type="button"><i className="csc-person-avatar csc-blue">AK<u></u></i><span><b>Aisha Khan</b><small>Can you review this?</small></span><time>11:18</time></button>
<button className="csc-conversation" data-connect-kind="direct" data-connect-target="omar" type="button"><i className="csc-person-avatar csc-warm">OR<u></u></i><span><b>Omar Reed</b><small>Sounds good, thanks.</small></span><time>Tue</time></button>
</div>
</aside>
<section className="csc-chat">
<header className="csc-chat-head"><div className="csc-chat-title"><i data-connect-head-icon="">#</i><span><strong data-connect-title="">launch</strong><small data-connect-subtitle="">8 members · Group conversation</small></span></div><div className="csc-head-actions"><button type="button" aria-label="Search conversation">⌕</button><button type="button" aria-label="Conversation details">•••</button></div></header>
<div className="csc-thread-wrap">
<div className="csc-thread" data-connect-thread="launch">
<div className="csc-date"><span>Today</span></div>
<article className="csc-message"><i className="csc-person-avatar csc-warm">OR</i><div><div className="csc-message-meta"><b>Omar Reed</b><time>10:18</time></div><p>Before the afternoon review, can everyone check the launch list and flag anything still blocked?</p><div className="csc-reactions"><span>👍 4</span><span>✓ 2</span></div></div></article>
<article className="csc-message"><i className="csc-person-avatar csc-blue">AK</i><div><div className="csc-message-meta"><b>Aisha Khan</b><time>10:24</time></div><p>I finished the final copy check. The updated checklist is attached here so we all have the same version.</p><div className="csc-file"><i>PDF</i><span><b>launch-checklist.pdf</b><small>428 KB · Shared in #launch</small></span><button type="button" aria-label="Download file">↓</button></div></div></article>
<div className="csc-pinned-inline"><i>⌁</i><span><small>PINNED</small><b>Final review at 14:00</b></span><em>3 replies</em></div>
<article className="csc-message"><i className="csc-person-avatar csc-green">LM</i><div><div className="csc-message-meta"><b>Lina Malik</b><time>10:29</time></div><p>Everything on operations is clear from my side. I added one note for the handoff after launch.</p><button className="csc-reply-link" type="button">View 2 replies →</button></div></article>
</div>
<div className="csc-thread" data-connect-thread="general" hidden>
<div className="csc-date"><span>Today</span></div><article className="csc-message"><i className="csc-person-avatar csc-warm">OR</i><div><div className="csc-message-meta"><b>Omar Reed</b><time>9:12</time></div><p>Morning everyone. Please add anything the wider team needs to know here before noon.</p><div className="csc-reactions"><span>👋 6</span></div></div></article><article className="csc-message"><i className="csc-person-avatar csc-blue">AK</i><div><div className="csc-message-meta"><b>Aisha Khan</b><time>9:19</time></div><p>I’ll share the updated schedule after the launch review.</p></div></article>
</div>
<div className="csc-thread" data-connect-thread="operations" hidden>
<div className="csc-date"><span>Today</span></div><article className="csc-message"><i className="csc-person-avatar csc-green">LM</i><div><div className="csc-message-meta"><b>Lina Malik</b><time>11:04</time></div><p>I uploaded the revised operations handoff. Please use this copy for today’s review.</p><div className="csc-file"><i>DOC</i><span><b>operations-handoff.docx</b><small>186 KB · Shared in #operations</small></span><button type="button" aria-label="Download file">↓</button></div></div></article>
</div>
<div className="csc-thread" data-connect-thread="aisha" hidden>
<div className="csc-date"><span>Today</span></div><article className="csc-message csc-own"><i className="csc-person-avatar csc-dark">YK</i><div><div className="csc-message-meta"><b>You</b><time>11:11</time></div><p>I’ve updated the launch copy. Can you review the last section when you have a moment?</p></div></article><article className="csc-message"><i className="csc-person-avatar csc-blue">AK</i><div><div className="csc-message-meta"><b>Aisha Khan</b><time>11:18</time></div><p>Yes. Send me the latest version and I’ll check it before lunch.</p></div></article>
</div>
<div className="csc-thread" data-connect-thread="omar" hidden>
<div className="csc-date"><span>Tuesday</span></div><article className="csc-message"><i className="csc-person-avatar csc-warm">OR</i><div><div className="csc-message-meta"><b>Omar Reed</b><time>16:41</time></div><p>The meeting time works for me. I’ll add the final agenda points.</p></div></article><article className="csc-message csc-own"><i className="csc-person-avatar csc-dark">YK</i><div><div className="csc-message-meta"><b>You</b><time>16:43</time></div><p>Sounds good, thanks.</p></div></article>
</div>
</div>
<form className="csc-composer" data-connect-composer=""><button type="button" aria-label="Attach file">＋</button><label><span className="sr-only">Message</span><input data-connect-input="" placeholder="Message #launch" autoComplete="off" /></label><div><button type="button" aria-label="Add reaction">☺</button><button className="csc-send" aria-label="Send message" type="submit">➤</button></div></form>
</section>
<aside className="csc-details">
<div className="csc-detail-head"><span>Conversation details</span><button type="button">×</button></div>
<div className="csc-detail-identity"><i data-connect-detail-icon="">#</i><strong data-connect-detail-title="">launch</strong><small data-connect-detail-subtitle="">8 members</small></div>
<div className="csc-detail-actions"><button type="button"><i>🔔</i><span>Notifications</span></button><button type="button"><i>⌕</i><span>Search</span></button></div>
<section className="csc-detail-section"><div><b>Members</b><button type="button">View all</button></div><div className="csc-member-stack"><i className="csc-person-avatar csc-blue">AK</i><i className="csc-person-avatar csc-warm">OR</i><i className="csc-person-avatar csc-green">LM</i><i className="csc-person-avatar csc-purple">+5</i></div></section>
<section className="csc-detail-section"><div><b>Pinned message</b><button type="button">1</button></div><article className="csc-detail-card"><small>TODAY · 10:24</small><strong>Final review at 14:00</strong><span>Checklist and handoff review before launch.</span></article></section>
<section className="csc-detail-section"><div><b>Shared files</b><button type="button">3 files</button></div><article className="csc-file-row"><i>PDF</i><span><b>launch-checklist.pdf</b><small>428 KB</small></span></article><article className="csc-file-row"><i>IMG</i><span><b>hero-preview.png</b><small>1.2 MB</small></span></article></section>
</aside>
</div>
  );
}
