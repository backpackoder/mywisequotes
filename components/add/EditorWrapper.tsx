type EditorWrapperProps = {
  children: React.ReactNode;
};

export function EditorWrapper({ children }: EditorWrapperProps) {
  return (
    <article className="border-4">
      <h2 className="text-2xl">Editor</h2>

      <div className="flex flex-wrap justify-center gap-8">{children}</div>
    </article>
  );
}
