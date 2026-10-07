import InfoPageShell from '../../components/site/InfoPageShell.jsx';

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy"
      title="Privacy should be understandable, not buried."
      intro="This notice explains the general privacy approach for the CrescentSphere public website. Individual CrescentSphere products may provide additional privacy information when their data practices differ."
      updatedLabel="Last updated: October 6, 2026"
    >
      <article className="legal-document">
        <section>
          <span>01</span><div><h2>Information you provide</h2><p>When you choose to contact CrescentSphere, request information, create an account in a product, or otherwise submit information, we may receive the details you provide. The exact fields depend on the interaction or product involved.</p></div>
        </section>
        <section>
          <span>02</span><div><h2>Website and technical information</h2><p>The public website may process ordinary technical information needed to deliver pages securely and reliably, such as request metadata, device or browser information, and security-related logs. If analytics or similar optional measurement tools are used, information about those tools and the choices available to visitors will be provided as appropriate.</p></div>
        </section>
        <section>
          <span>03</span><div><h2>How information is used</h2><p>Information may be used to provide requested services, maintain security, respond to enquiries, operate and improve CrescentSphere products, diagnose technical problems, and meet applicable legal obligations.</p></div>
        </section>
        <section>
          <span>04</span><div><h2>Product-specific data</h2><p>CS Mail, CS Mailer, CS Docs, CS Connect, CS Notes, and CS KeyLang serve different purposes. A product may therefore process different categories of information. Where a product needs additional privacy terms, those terms should be presented with that product and read together with this notice.</p></div>
        </section>
        <section>
          <span>05</span><div><h2>Service providers</h2><p>CrescentSphere may rely on infrastructure, hosting, security, communications, or other service providers to operate its services. Providers should receive only the information reasonably necessary for their role and remain subject to appropriate contractual or legal safeguards.</p></div>
        </section>
        <section>
          <span>06</span><div><h2>Retention and security</h2><p>Information should be retained only for as long as needed for the purpose for which it was collected, legitimate operational requirements, security, or legal obligations. CrescentSphere should use reasonable technical and organisational measures appropriate to the information and service involved.</p></div>
        </section>
        <section>
          <span>07</span><div><h2>Your choices and rights</h2><p>Depending on where you live and which service you use, applicable law may provide rights relating to access, correction, deletion, restriction, objection, portability, or withdrawal of consent. Product-specific controls may also be available within the relevant service.</p></div>
        </section>
        <section>
          <span>08</span><div><h2>Changes to this notice</h2><p>This notice may be updated as CrescentSphere products, infrastructure, or legal requirements change. The date at the top of the page identifies the latest published revision.</p></div>
        </section>
        <section>
          <span>09</span><div><h2>Contact</h2><p>Privacy questions or requests should be submitted through the official contact method published by CrescentSphere or the relevant product. Product-specific notices may provide a more specific contact channel.</p></div>
        </section>
      </article>

    </InfoPageShell>
  );
}
