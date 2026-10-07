export default function MailerPreview() {
  return (
<div aria-label="CS Mailer developer delivery interface preview" className="product-ui developer-ui mailer-ui-v2 service-media-slot">
<div className="mailer-windowbar">
<div className="mailer-window-brand"><span className="mailer-window-dots" aria-hidden="true"><i></i><i></i><i></i></span><cs-brand-logo aria-hidden="true" className="mailer-product-mark" label="" state="mailer"></cs-brand-logo><span><b>CS Mailer</b><small>Northstar production</small></span></div>
<div className="mailer-environment"><i></i><span>Production</span><small>API healthy</small></div>
<div className="mailer-window-actions"><button data-prototype-action="Open CS Mailer documentation" type="button">Docs</button><button className="mailer-send-test" data-prototype-action="Send a CS Mailer test email" type="button">Send test</button></div>
</div>
<div className="mailer-app">
<aside className="mailer-sidebar">
<div className="mailer-sidebar-label">WORKSPACE</div>
<nav aria-label="CS Mailer sections" className="mailer-primary-nav">
<button className="is-active" type="button"><span>⌂</span> Overview</button>
<button type="button"><span>↯</span> Activity <em>18</em></button>
<button type="button"><span>▤</span> Templates</button>
</nav>
<div className="mailer-sidebar-label mailer-sidebar-label-space">CONFIGURE</div>
<nav aria-label="CS Mailer configuration" className="mailer-primary-nav">
<button type="button"><span>◇</span> Domains</button>
<button type="button"><span>⌘</span> API keys</button>
<button type="button"><span>⇄</span> SMTP</button>
</nav>
<div className="mailer-usage"><span><small>MONTHLY USAGE</small><b>18,420 / 50,000</b></span><div><i></i></div><small>37% of plan used</small></div>
</aside>
<section className="mailer-main" aria-label="CS Mailer overview">
<div className="mailer-main-head"><div><small>DELIVERY OVERVIEW</small><strong>Application email, at a glance.</strong></div><div><button type="button">Last 24 hours⌄</button><button data-prototype-action="Create a CS Mailer API key" type="button">+ API key</button></div></div>
<div className="mailer-metrics">
<article><span>Sent</span><strong>1,284</strong><small>today</small></article>
<article><span>Delivered</span><strong>98.7%</strong><small>1,267 messages</small></article>
<article><span>Bounced</span><strong>7</strong><small>0.5%</small></article>
<article><span>Median API</span><strong>236<em>ms</em></strong><small>request time</small></article>
</div>
<div className="mailer-workspace-grid">
<section className="mailer-code-card">
<div className="mailer-card-head"><span><small>SEND WITH API</small><b>Node.js</b></span><button data-prototype-action="Copy CS Mailer API example" type="button">Copy</button></div>
<pre><code><span className="mailer-token-purple">await</span> cs.mailer.send(&#123;
  <span className="mailer-token-blue">from</span>: <span className="mailer-token-green">"billing@northstar.co"</span>,
  <span className="mailer-token-blue">to</span>: customer.email,
  <span className="mailer-token-blue">subject</span>: <span className="mailer-token-green">"Your receipt is ready"</span>,
  <span className="mailer-token-blue">template</span>: <span className="mailer-token-green">"receipt"</span>
&#125;);</code></pre>
<div className="mailer-code-result"><span><i></i> Accepted for delivery</span><code>message_id: msg_71Q4A2</code></div>
</section>
<aside className="mailer-health-card">
<div className="mailer-card-head"><span><small>SENDING SETUP</small><b>northstar.co</b></span><button type="button">•••</button></div>
<div className="mailer-health-item"><span><i className="is-good"></i><b>Domain</b><small>Verified</small></span><em>Ready</em></div>
<div className="mailer-health-item"><span><i className="is-good"></i><b>API</b><small>Production key</small></span><em>Active</em></div>
<div className="mailer-health-item"><span><i className="is-good"></i><b>SMTP</b><small>smtp.csmailer</small></span><em>Ready</em></div>
<div className="mailer-health-note"><small>SENDING FROM</small><strong>billing@northstar.co</strong><span>Configured for production sends.</span></div>
</aside>
</div>
<section className="mailer-activity-card">
<div className="mailer-activity-head"><span><small>RECENT ACTIVITY</small><b>Latest delivery events</b></span><button type="button">View all activity →</button></div>
<div className="mailer-activity-table">
<div className="mailer-event mailer-event-head"><span>Recipient</span><span>Message</span><span>Status</span><span>Time</span></div>
<div className="mailer-event"><span><b>nora@noralabs.co</b><small>msg_71Q4A2</small></span><span>Receipt #1042</span><span><em className="mailer-status delivered"><i></i>Delivered</em></span><time>10:42:18</time></div>
<div className="mailer-event"><span><b>alex@meridian.co</b><small>msg_71Q39F</small></span><span>Verify your email</span><span><em className="mailer-status delivered"><i></i>Delivered</em></span><time>10:41:53</time></div>
<div className="mailer-event"><span><b>ops@orionfreight.co</b><small>msg_71Q2D1</small></span><span>Password reset</span><span><em className="mailer-status deferred"><i></i>Deferred</em></span><time>10:39:07</time></div>
</div>
</section>
</section>
</div>
</div>
  );
}
