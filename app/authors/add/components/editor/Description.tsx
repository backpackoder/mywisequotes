// Types
import { EditorProps } from "../../types";

export function Description({ translations, state, dispatch }: EditorProps) {
  const { descriptions } = state;

  const descriptionIndexFinder = state.descriptions?.findIndex(
    (name) => name.code === state.language
  );

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.descriptions && descriptionIndexFinder !== undefined && descriptionIndexFinder > -1) {
      const updatedDescriptions = [...state.descriptions];
      updatedDescriptions[descriptionIndexFinder] = {
        ...updatedDescriptions[descriptionIndexFinder],
        description: e.target.value,
      };

      dispatch({
        type: "SET_DESCRIPTIONS",
        payload: updatedDescriptions,
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s description in{" "}
          <span className="font-semibold">
            {translations[descriptionIndexFinder]?.englishName.toLowerCase()}
          </span>{" "}
          here:
        </label>

        <textarea
          name="content"
          cols={30}
          rows={2}
          placeholder="Ancient Greek philosopher"
          value={descriptions?.[descriptionIndexFinder]?.description ?? ""}
          maxLength={100}
          className="p-2 border border-black rounded-xl"
          onChange={(e) => handleDescription(e)}
        ></textarea>
      </div>
    </div>
  );
}
