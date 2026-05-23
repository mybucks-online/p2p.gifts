const SPACER_LINE = "\u00a0";

/**
 * Turn blank lines into visible spacing for react-markdown.
 * Each empty line becomes a spacer paragraph; content blocks stay valid for headings/lists.
 */
export function prepareGiftNoteMarkdown(note) {
  if (!note) return note;

  const lines = note.split("\n");
  const blocks = [];
  let current = [];

  const flush = () => {
    if (current.length === 0) return;
    blocks.push(
      current
        .map((line) => (line.trim() === "" ? SPACER_LINE : line))
        .join("\n"),
    );
    current = [];
  };

  for (const line of lines) {
    if (line.trim() === "") {
      flush();
      blocks.push(SPACER_LINE);
    } else {
      current.push(line);
    }
  }
  flush();

  return blocks.join("\n\n");
}
