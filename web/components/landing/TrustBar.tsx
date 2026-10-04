const items = ["Settled on Monad", "Verified by Chainlink CRE", "Indexed by Envio", "Passkeys by Mera", "Paid in USDC", "Open source"];

/** Built-with bar (a logo row in spirit; plain wordmarks so we don't misuse anyone's logo files). */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-surface/60 py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4">
        <span className="eyebrow">Built with</span>
        {items.map((t) => (
          <span key={t} className="font-display text-sm font-semibold text-fg/60">{t}</span>
        ))}
      </div>
    </section>
  );
}
