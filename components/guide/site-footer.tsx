export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground md:px-10">
        <p className="font-mono text-foreground">
          SECURE<span className="mx-1 text-primary">/</span>VIBE
        </p>
        <p className="max-w-xl leading-6">
          An educational reference. It does not replace a professional security
          review. Test only systems you own or are authorized to assess.
        </p>
      </div>
    </footer>
  )
}
