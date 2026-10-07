export default function KeyLangPreview() {
  return (
<div aria-label="CS KeyLang interface preview" className="product-ui keylang-ui keylang-v2 service-media-slot" data-keylang-preview="">
<header className="kl-appbar">
<div className="kl-brand"><cs-brand-logo aria-hidden="true" className="keylang-product-mark" label="" state="keylang"></cs-brand-logo><span><b>CS KeyLang</b><small>Practice workspace</small></span></div>
<nav aria-label="KeyLang preview sections" className="kl-mode-tabs">
<button className="is-active" data-keylang-mode="typing" type="button">Typing test</button>
<button data-keylang-mode="language" type="button">Language practice</button>
<button data-keylang-mode="progress" type="button">Progress</button>
</nav>
<div className="kl-profile" aria-label="Practice profile"><span>AM</span><i></i></div>
</header>
<div className="kl-view is-active" data-keylang-view="typing">
<div className="kl-typing-main">
<div className="kl-toolbar">
<div className="kl-segment" aria-label="Typing language"><button className="is-active" data-keylang-typing-lang="en" type="button">English</button><button data-keylang-typing-lang="ar" type="button"><span lang="ar" dir="rtl">العربية</span></button></div>
<div className="kl-test-options"><button className="is-active" type="button">60 sec</button><button type="button">30 sec</button><button type="button">2 min</button></div>
</div>
<section className="kl-test-card" data-keylang-test-card="">
<div className="kl-test-head"><span><small>TYPING TEST</small><strong data-keylang-test-title="">English · Everyday words</strong></span><button className="kl-reset" data-keylang-reset="" type="button">↻ Reset</button></div>
<div className="kl-live-stats">
<div><span>WPM</span><strong data-keylang-wpm="">47</strong><small>words / min</small></div>
<div><span>Accuracy</span><strong data-keylang-accuracy="">96%</strong><small>current</small></div>
<div><span>Time</span><strong data-keylang-time="">00:34</strong><small>remaining</small></div>
</div>
<div className="kl-prompt" data-keylang-prompt=""><span className="is-complete">Clear communication starts with confident typing.</span> <mark>Practice</mark> <span>at a steady pace and focus on accuracy before speed.</span></div>
<label className="kl-entry"><span>Type here to continue the test</span><textarea aria-label="Typing test input" data-keylang-input="" placeholder="Start typing…" rows={2}></textarea></label>
<div className="kl-test-footer"><div className="kl-progress"><i data-keylang-progress=""></i></div><span data-keylang-progress-label="">34 / 60 sec</span><button data-keylang-start="" type="button">Start test</button></div>
</section>
</div>
<aside className="kl-session-panel">
<div className="kl-side-head"><span><small>THIS WEEK</small><strong>Your typing at a glance</strong></span><button type="button" data-keylang-mode-link="progress">View progress</button></div>
<div className="kl-summary-grid"><div><span>Best speed</span><strong>54 <small>WPM</small></strong></div><div><span>Avg. accuracy</span><strong>95<small>%</small></strong></div></div>
<div className="kl-mini-chart" aria-label="Recent typing speeds"><span style={{ '--h': '46%' }}><i>39</i></span><span style={{ '--h': '58%' }}><i>43</i></span><span style={{ '--h': '66%' }}><i>47</i></span><span style={{ '--h': '61%' }}><i>45</i></span><span style={{ '--h': '79%' }}><i>52</i></span><span style={{ '--h': '72%' }}><i>49</i></span><span style={{ '--h': '86%' }}><i>54</i></span></div>
<div className="kl-practice-tip"><i>Aa</i><span><b>Accuracy first</b><small>Keep your rhythm steady. Speed becomes useful when mistakes stay low.</small></span></div>
<div className="kl-language-shortcut"><span><small>NEXT PRACTICE</small><b>English ↔ Arabic</b><em>Everyday phrases · 8 min</em></span><button data-keylang-mode-link="language" type="button">Practice →</button></div>
</aside>
</div>
<div className="kl-view" data-keylang-view="language" hidden>
<div className="kl-language-main">
<div className="kl-language-heading"><span><small>LANGUAGE PRACTICE</small><h4>Useful phrases, one at a time.</h4><p>Read the prompt, think of the equivalent phrase, then reveal the answer and decide whether to repeat it.</p></span><div className="kl-direction" aria-label="Practice direction"><button className="is-active" data-keylang-direction="en-ar" type="button">English → العربية</button><button data-keylang-direction="ar-en" type="button">العربية → English</button></div></div>
<section className="kl-phrase-workbench">
<div className="kl-phrase-meta"><span>EVERYDAY COMMUNICATION</span><strong data-keylang-phrase-count="">12 of 20</strong></div>
<div className="kl-source-phrase"><small data-keylang-source-label="">ENGLISH</small><p data-keylang-source="">Could you send me the details?</p><button type="button" aria-label="Play source phrase" data-prototype-action="Play KeyLang pronunciation audio">◉ Listen</button></div>
<div className="kl-reveal-divider"><span></span><button data-keylang-reveal="" type="button">Reveal answer</button><span></span></div>
<div className="kl-target-phrase" data-keylang-target-wrap="" aria-live="polite"><small data-keylang-target-label="" lang="ar" dir="rtl">العربية</small><p dir="rtl" lang="ar" data-keylang-target="">هل يمكنك إرسال التفاصيل لي؟</p><button type="button" aria-label="Play target phrase" data-prototype-action="Play KeyLang pronunciation audio">◉ <span lang="ar" dir="rtl">استمع</span></button></div>
<div className="kl-phrase-actions"><button data-keylang-repeat="" type="button">Practice again</button><button className="primary" data-keylang-next-phrase="" type="button">I know this · Next →</button></div>
</section>
</div>
<aside className="kl-language-rail">
<div className="kl-rail-progress"><span><small>SESSION</small><b>12 / 20 phrases</b></span><strong>60%</strong><div><i></i></div></div>
<div className="kl-topic-list"><small>PRACTICE TOPICS</small><button className="is-active" type="button"><span>Everyday communication</span><i>20</i></button><button type="button"><span>Work & meetings</span><i>16</i></button><button type="button"><span>Travel basics</span><i>18</i></button><button type="button"><span>Numbers & time</span><i>14</i></button></div>
<div className="kl-script-note"><strong>English + العربية</strong><p>Switch direction any time so recall works both ways.</p></div>
</aside>
</div>
<div className="kl-view" data-keylang-view="progress" hidden>
<div className="kl-progress-main">
<div className="kl-progress-heading"><span><small>PRACTICE PROGRESS</small><h4>Small sessions, visible improvement.</h4></span><div className="kl-range"><button className="is-active" type="button">7 days</button><button type="button">30 days</button></div></div>
<div className="kl-metric-row"><article><small>AVG. SPEED</small><strong>46 <span>WPM</span></strong><em>+5 this week</em></article><article><small>BEST SPEED</small><strong>54 <span>WPM</span></strong><em>English · 60 sec</em></article><article><small>AVG. ACCURACY</small><strong>95<span>%</span></strong><em>+2% this week</em></article><article><small>PRACTICE</small><strong>6 <span>days</span></strong><em>Current streak</em></article></div>
<section className="kl-history-card"><div className="kl-history-head"><span><small>TYPING SPEED</small><b>Recent sessions</b></span><em>WPM</em></div><div className="kl-history-chart"><div style={{ '--v': '52%' }}><i>39</i><small>Mon</small></div><div style={{ '--v': '61%' }}><i>43</i><small>Tue</small></div><div style={{ '--v': '70%' }}><i>47</i><small>Wed</small></div><div style={{ '--v': '66%' }}><i>45</i><small>Thu</small></div><div style={{ '--v': '82%' }}><i>52</i><small>Fri</small></div><div style={{ '--v': '76%' }}><i>49</i><small>Sat</small></div><div className="is-best" style={{ '--v': '88%' }}><i>54</i><small>Today</small></div></div></section>
</div>
<aside className="kl-history-rail"><div><small>RECENT PRACTICE</small><article><span><b>English typing</b><em>60 sec · Today</em></span><strong>54 WPM</strong></article><article><span><b>Arabic typing</b><em>60 sec · Yesterday</em></span><strong>41 WPM</strong></article><article><span><b>Everyday phrases</b><em>English → Arabic</em></span><strong>18 / 20</strong></article></div><div className="kl-goal"><span>WEEKLY GOAL</span><strong>6 of 7 days</strong><div><i></i></div><small>One more practice day to complete this week.</small></div></aside>
</div>
</div>
  );
}
