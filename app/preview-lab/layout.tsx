import "@/styles/preview/preview-lab.css";
import type { ReactNode } from "react";

export default function PreviewLabRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="preview-lab-page">
          <main className="preview-lab-shell">{children}</main>
        </div>
      </body>
    </html>
  );
}
