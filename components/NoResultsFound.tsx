export function NoResultsFound({ type }: { type: string }) {
  return <p className="text-center">{`No ${type} found`}</p>;
}
