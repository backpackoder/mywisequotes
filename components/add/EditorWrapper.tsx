type EditorWrapperProps = {
  LanguageComponent: React.ReactNode;
  children: React.ReactNode;
};

export function EditorWrapper({ LanguageComponent, children }: EditorWrapperProps) {
  return (
    <article className="flex flex-col gap-4 border-4">
      <h2 className="text-2xl">Editor</h2>

      {LanguageComponent}
      <div className="flex flex-wrap justify-center gap-8">{children}</div>
    </article>
  );
}
