type EditorItemWrapperProps = {
  children: React.ReactNode;
};

export function EditorItemWrapper({ children }: EditorItemWrapperProps) {
  return (
    <div className="flex flex-col items-center gap-4 max-w-xs p-2 border-2 rounded-lg">
      {children}
    </div>
  );
}
