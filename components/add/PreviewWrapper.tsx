export function PreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="border-4">
      <h2 className="text-2xl">Preview</h2>
      {children}
    </article>
  );
}
