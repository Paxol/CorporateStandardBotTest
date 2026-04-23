import type { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  headerOutlet?: React.ReactNode;
}>;

export function Layout(props: LayoutProps) {
  return (
    <div className="min-h-dvh bg-muted/30">
      <div className="flex h-dvh flex-col">
        <header className="border-b border-border/70 bg-background/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl gap-1 justify-between">
            <h1 className="text-xl font-medium tracking-tight">Corporate Standards Bot</h1>
            {props.headerOutlet}
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          {props.children}
        </main>
      </div>
    </div>
  )
}