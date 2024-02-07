import { EditorProps } from "../types";

export function Name({ translations, state, dispatch }: EditorProps) {
  const { language, names } = state;

  const nameIndexFinder = translations?.findIndex((translation) => translation.code === language);

  function handleName(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.names && nameIndexFinder !== undefined && nameIndexFinder > -1) {
      const updatedNames = [...state.names];
      updatedNames[nameIndexFinder] = {
        ...updatedNames[nameIndexFinder],
        name: e.target.value,
      };

      dispatch({
        type: "SET_NAMES",
        payload: updatedNames,
      });
    }
  }

  return state.language !== "en" && (nameIndexFinder || nameIndexFinder === 0) ? (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center h-full gap-2">
        <label htmlFor="content">
          Write the author{"'"}s name in{" "}
          <span className="font-semibold">
            {translations[nameIndexFinder].englishName.toLowerCase()}
          </span>{" "}
          here
          <br />
          (if different from english):
        </label>

        <textarea
          name="content"
          cols={30}
          rows={1}
          placeholder="Albert Einstein"
          value={names?.[nameIndexFinder].name}
          maxLength={200}
          className="p-2 border border-black rounded-xl"
          onChange={(e) => handleName(e)}
        ></textarea>
      </div>
    </div>
  ) : null;
}
