export default function MailPreview() {
  return (
<div aria-label="CS Mail business inbox interface preview" className="product-ui mail-ui mail-ui-v2 service-media-slot">
<div className="mail-windowbar">
<div className="mail-window-brand"><span className="mail-window-dots" aria-hidden="true"><i></i><i></i><i></i></span><b>CS Mail</b><small>hello@northstar.co</small></div>
<div className="mail-window-search">⌕ <span>Search messages, people, or attachments</span><kbd>⌘ K</kbd></div>
<div className="mail-window-actions"><button aria-label="Help" type="button">?</button><button aria-label="Notifications" type="button">◌</button><i className="avatar av-blue">AS</i></div>
</div>
<div className="mail-app mail-app-v2">
<aside className="mail-sidebar mail-sidebar-v2">
<div className="mail-account-mark"><b className="mail-product-mark"><cs-brand-logo aria-hidden="true" label="" state="mail"></cs-brand-logo></b><span><strong>Northstar</strong><small>Business mail</small></span></div>
<button className="mail-compose" data-prototype-action="Compose email" type="button"><span>＋</span> Compose</button>
<nav aria-label="Mailbox folders" className="mail-primary-nav">
<button className="is-selected" type="button"><span>▣</span> Inbox <em>12</em></button>
<button type="button"><span>☆</span> Starred</button>
<button type="button"><span>↗</span> Sent</button>
<button type="button"><span>◫</span> Drafts <em>3</em></button>
</nav>
<small>FOLDERS</small>
<nav aria-label="Custom folders" className="mail-folder-nav">
<button type="button"><i className="folder-dot blue"></i> Customers <em>7</em></button>
<button type="button"><i className="folder-dot violet"></i> Projects</button>
<button type="button"><i className="folder-dot amber"></i> Suppliers</button>
</nav>
<div className="mail-storage"><span><b></b></span><small>2.8 GB of 15 GB used</small></div>
</aside>
<section className="mail-messages mail-messages-v2" aria-label="Inbox messages">
<div className="mail-list-head"><span><strong>Inbox</strong><small>12 unread</small></span><div><button type="button">↻</button><button type="button">•••</button></div></div>
<div className="mail-search mail-search-v2">⌕ <span>Search this inbox</span><button type="button">Filter</button></div>
<div className="mail-filter-tabs"><button className="is-active" type="button">All</button><button type="button">Unread</button><button type="button">Starred</button></div>
<button className="mail-message mail-message-v2 is-selected" type="button"><i className="avatar av-purple">NL</i><span><b>Nora Labs <em>Customer</em></b><strong>October invoice — billing address</strong><small>Could you update the billing address before the invoice is finalized?</small></span><time>10:42</time></button>
<button className="mail-message mail-message-v2 is-unread" type="button"><i className="avatar av-blue">AS</i><span><b>Alex Stone</b><strong>Product onboarding</strong><small>Thanks — the team has access now. One question about the setup...</small></span><time>09:18</time></button>
<button className="mail-message mail-message-v2 is-unread" type="button"><i className="avatar av-gold">MC</i><span><b>Meridian Co.</b><strong>Order #2418</strong><small>Can we update the delivery date before dispatch?</small></span><time>08:56</time></button>
<button className="mail-message mail-message-v2" type="button"><i className="avatar av-green">FR</i><span><b>Farah Rahman</b><strong>Meeting notes and next steps</strong><small>Sharing the notes from yesterday and the items we agreed to...</small></span><time>Mon</time></button>
<button className="mail-message mail-message-v2" type="button"><i className="avatar av-slate">OF</i><span><b>Orion Freight</b><strong>Shipment confirmation</strong><small>Your October shipment has been scheduled for collection.</small></span><time>Mon</time></button>
</section>
<section className="mail-detail mail-detail-v2" aria-label="Selected email">
<div className="mail-thread-toolbar"><span><button aria-label="Back" type="button">←</button><button aria-label="Archive" type="button">▱</button><button aria-label="Delete" type="button">⌫</button></span><span><button type="button">Reply</button><button aria-label="More actions" type="button">•••</button></span></div>
<div className="mail-detail-head mail-detail-head-v2"><span><small>INBOX / CUSTOMERS</small><b>October invoice — billing address</b></span><em>Customer</em></div>
<div className="sender-line sender-line-v2"><i className="avatar av-purple">NL</i><span><b>Nora Labs</b><small>billing@noralabs.co · to hello@northstar.co</small></span><time>10:42 AM</time></div>
<div className="mail-body-copy"><p>Hi Alex,</p><p>Could you update our billing address before the October invoice is finalized? I’ve attached the updated details for your records.</p><p>Everything else on the invoice looks correct. Thanks for taking care of it.</p><p>Best,<br /><strong>Nora</strong></p></div>
<div className="mail-attachment"><span className="mail-file-icon">PDF</span><span><b>billing-details.pdf</b><small>428 KB · PDF document</small></span><button type="button">Download ↓</button></div>
<div className="mail-quick-reply"><i className="avatar av-blue">AS</i><button data-prototype-action="Reply to email" type="button">Reply to Nora Labs…</button><span>↗</span></div>
</section>
</div>
</div>
  );
}
