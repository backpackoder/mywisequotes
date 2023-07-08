type AuthorWrapperProps = {
  children: React.ReactNode;
};

export function AuthorWrapper({ children }: AuthorWrapperProps) {
  return <section className="flex flex-col items-center gap-4">{children}</section>;
}
