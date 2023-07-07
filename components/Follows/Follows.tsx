// Utils
import { getFollows } from "@/utils/getFollows";

type FollowsProps = {
  id: string;
};

export function Follows({ id }: FollowsProps) {
  const { followers, following } = getFollows(id);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-2 px-2 border-2 rounded-xl">
      <p>Followers: {followers}</p>
      <p>Following: {following}</p>
    </div>
  );
}
