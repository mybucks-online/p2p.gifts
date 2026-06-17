const SPACER_LINE = "\u00a0";
const NBSP = "\u00a0";

function spacesToNbsp(text) {
  return text.replace(/ /g, NBSP).replace(/\t/g, NBSP);
}

/** Markdown syntax needs one real space/tab after markers; extra gap becomes nbsp. */
function preserveMarkdownGap(gap) {
  if (!gap) return " ";
  return gap[0] + spacesToNbsp(gap.slice(1));
}

/** Keep leading padding and extra gaps between words visible after Markdown render. */
function preserveLineWhitespace(line) {
  const heading = line.match(/^(\s{0,3})(#{1,6})([ \t]*)(.*)$/);
  if (heading) {
    const [, indent, hashes, gap, content] = heading;
    return indent + hashes + preserveMarkdownGap(gap) + spacesToNbsp(content);
  }

  const unorderedList = line.match(/^(\s{0,3})([-*+])([ \t]+)(.*)$/);
  if (unorderedList) {
    const [, indent, marker, gap, content] = unorderedList;
    return indent + marker + preserveMarkdownGap(gap) + spacesToNbsp(content);
  }

  const orderedList = line.match(/^(\s{0,3})(\d+\.)([ \t]+)(.*)$/);
  if (orderedList) {
    const [, indent, marker, gap, content] = orderedList;
    return indent + marker + preserveMarkdownGap(gap) + spacesToNbsp(content);
  }

  const blockquote = line.match(/^(>{1,})([ \t]*)(.*)$/);
  if (blockquote) {
    const [, markers, gap, content] = blockquote;
    return markers + preserveMarkdownGap(gap) + spacesToNbsp(content);
  }

  return spacesToNbsp(line);
}

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
    blocks.push(current.join("\n"));
    current = [];
  };

  for (const line of lines) {
    if (line.trim() === "") {
      flush();
      blocks.push(SPACER_LINE);
    } else {
      current.push(preserveLineWhitespace(line));
    }
  }
  flush();

  return blocks.join("\n\n");
}
