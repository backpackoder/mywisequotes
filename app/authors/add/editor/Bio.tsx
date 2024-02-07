// Types
import { EditorProps } from "../types";

export function Bio({ translations, state, dispatch }: EditorProps) {
  const { language, bio } = state;

  const bioIndexFinder = translations?.findIndex((translation) => translation.code === language);

  function handleBio(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.bio && bioIndexFinder !== undefined && bioIndexFinder > -1) {
      const updatedBios = [...state.bio];
      updatedBios[bioIndexFinder] = {
        ...updatedBios[bioIndexFinder],
        bio: e.target.value,
      };

      dispatch({
        type: "SET_BIOS",
        payload: updatedBios,
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s bio in{" "}
          <span className="font-semibold">
            {translations[bioIndexFinder].englishName.toLowerCase()}
          </span>{" "}
          here:
        </label>

        <textarea
          name="content"
          rows={10}
          placeholder="Albert Einstein was a German-born theoretical physicist who developed the theory of relativity,
          one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science.
          He is best known to the general public for his mass–energy equivalence formula E = mc2, which has been dubbed the
          world's most famous equation....."
          value={bio?.[bioIndexFinder]?.bio ?? ""}
          maxLength={5000}
          className="p-2 min-w-[50vw] max-w-full border border-black rounded-xl"
          onChange={(e) => handleBio(e)}
        ></textarea>
      </div>
    </div>
  );
}
