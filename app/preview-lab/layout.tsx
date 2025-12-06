import { PreviewLabShell } from "@/components/preview-lab/PreviewLabShell";

export default function PreviewLabRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PreviewLabShell>{children}</PreviewLabShell>
      </body>
    </html>
  );
}
