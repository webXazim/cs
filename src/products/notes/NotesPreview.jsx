export default function NotesPreview() {
  return (
<div aria-label="CS Notes interface preview" className="product-ui notes-ui csn-product-ui service-media-slot" data-notes-preview="">
<aside className="csn-nav">
<div className="csn-brand"><span><cs-brand-logo aria-hidden="true" label="" state="notes"></cs-brand-logo></span><b>CS Notes</b></div>
<button className="csn-new" type="button" data-notes-new=""><i>＋</i><span>New note</span></button>
<nav aria-label="CS Notes folders">
<small>NOTES</small>
<button className="is-active" type="button" data-notes-folder="all"><i>▤</i><span>All notes</span><em>18</em></button>
<button type="button" data-notes-folder="pinned"><i>☆</i><span>Pinned</span><em>4</em></button>
<button type="button" data-notes-folder="archive"><i>□</i><span>Archive</span></button>
<small>COLLECTIONS</small>
<button type="button" data-notes-folder="projects"><i className="csn-dot csn-amber"></i><span>Projects</span><em>7</em></button>
<button type="button" data-notes-folder="personal"><i className="csn-dot csn-blue"></i><span>Personal</span><em>5</em></button>
<button type="button" data-notes-folder="reference"><i className="csn-dot csn-green"></i><span>Reference</span><em>6</em></button>
</nav>
<div className="csn-nav-footer"><span>Private workspace</span><small>Your notes stay inside your account.</small></div>
</aside>
<section className="csn-list-panel">
<header className="csn-list-head"><div><small>NOTES</small><strong data-notes-list-title="">All notes</strong></div><button type="button" aria-label="Sort notes">⇅</button></header>
<label className="csn-search"><span>⌕</span><input aria-label="Search notes" data-notes-search="" placeholder="Search notes" type="search" /></label>
<div className="csn-list" data-notes-list="">
<button className="csn-note is-active" data-notes-category="projects pinned" data-notes-target="launch" type="button"><span><b>Website launch checklist</b><time>10:24</time></span><p>Final review, open questions, and launch-day checks.</p><footer><em className="csn-folder-tag csn-amber-tag">Projects</em><i>☆</i></footer></button>
<button className="csn-note" data-notes-category="projects" data-notes-target="meeting" type="button"><span><b>Meeting follow-up</b><time>Yesterday</time></span><p>Decisions from the planning call and next actions.</p><footer><em className="csn-folder-tag csn-amber-tag">Projects</em></footer></button>
<button className="csn-note" data-notes-category="reference pinned" data-notes-target="renewals" type="button"><span><b>Renewal dates</b><time>Oct 2</time></span><p>Annual services, renewal windows, and reminders.</p><footer><em className="csn-folder-tag csn-green-tag">Reference</em><i>☆</i></footer></button>
<button className="csn-note" data-notes-category="personal" data-notes-target="ideas" type="button"><span><b>Ideas worth revisiting</b><time>Sep 29</time></span><p>Small ideas to explore when there is time.</p><footer><em className="csn-folder-tag csn-blue-tag">Personal</em></footer></button>
<button className="csn-note" data-notes-category="personal pinned" data-notes-target="travel" type="button"><span><b>Travel checklist</b><time>Sep 27</time></span><p>Documents, essentials, and things to confirm.</p><footer><em className="csn-folder-tag csn-blue-tag">Personal</em><i>☆</i></footer></button>
</div>
<div className="csn-empty" data-notes-empty="" hidden><span>⌕</span><strong>No notes found</strong><small>Try another search or collection.</small></div>
</section>
<section className="csn-editor-shell">
<header className="csn-editor-head"><div className="csn-path"><span data-notes-folder-label="">Projects</span><i>/</i><b data-notes-short-title="">Website launch</b></div><div className="csn-head-actions"><button className="csn-private" type="button" aria-label="Note privacy"><i>⌁</i><span>Private</span></button><button className="csn-pin is-active" data-notes-pin="" type="button" aria-label="Pin note">☆</button><button type="button" aria-label="More actions">•••</button></div></header>
<div className="csn-formatbar" aria-label="Formatting toolbar"><button type="button"><b>B</b></button><button type="button"><i>I</i></button><span></span><button type="button">H1</button><button type="button">☷</button><button type="button">☑</button><button type="button">↗</button></div>
<div className="csn-editor-scroll">
<article className="csn-document" data-notes-document="">
<div className="csn-doc-meta"><span data-notes-kicker="">PROJECT NOTE</span><time data-notes-date="">Edited today · 10:24</time></div>
<h4 data-notes-title="">Website launch checklist</h4>
<p className="csn-lead" data-notes-lead="">Everything that still needs a final look before the site goes live.</p>
<div className="csn-body" data-notes-body="">
<p>The final launch pass should stay focused on the details that affect visitors first.</p>
<h5>Before publishing</h5>
<label className="csn-check is-done"><i>✓</i><span>Review final page copy</span></label>
<label className="csn-check is-done"><i>✓</i><span>Check navigation on mobile</span></label>
<label className="csn-check"><i></i><span>Confirm contact form destination</span></label>
<label className="csn-check"><i></i><span>Run one final accessibility pass</span></label>
<div className="csn-callout"><span>REMEMBER</span><p>Keep the launch window quiet. Make non-essential improvements after the first production check.</p></div>
</div>
</article>
</div>
<footer className="csn-editor-status"><span>Saved just now</span><div><i></i><span>Private note</span></div></footer>
</section>
<aside className="csn-inspector">
<div className="csn-inspector-head"><strong>Note details</strong><button type="button">×</button></div>
<section><small>PRIVACY</small><div className="csn-detail-row"><i>⌁</i><span><b>Private</b><em>Only your account</em></span></div></section>
<section><small>COLLECTION</small><button className="csn-collection-card" type="button"><i className="csn-dot csn-amber"></i><span><b data-notes-side-folder="">Projects</b><em>Change collection</em></span><strong>›</strong></button></section>
<section><small>DETAILS</small><dl><div><dt>Created</dt><dd data-notes-created="">Sep 28</dd></div><div><dt>Words</dt><dd data-notes-words="">74</dd></div><div><dt>State</dt><dd>Saved</dd></div></dl></section>
<section className="csn-tags"><small>TAGS</small><div data-notes-tags=""><span>launch</span><span>checklist</span></div></section>
</aside>
</div>
  );
}
