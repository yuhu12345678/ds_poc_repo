import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function AppShell({ title, subtitle, children }: Props) {
  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
