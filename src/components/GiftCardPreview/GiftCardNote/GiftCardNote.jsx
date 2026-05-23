import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import styled, { css } from "styled-components";

import { prepareGiftNoteMarkdown } from "@p2p-gifts/lib/giftNoteMarkdown";

const NOTE_ALLOWED_ELEMENTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "blockquote",
  "del",
];

const markdownComponents = {
  a: ({ children }) => <span>{children}</span>,
  img: () => null,
  pre: ({ children }) => <p>{children}</p>,
};

const noteTypography = css`
  width: 100%;
  margin: ${({ theme }) => theme.sizes.sm} 0 0;
  padding: 0;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.weights.regular};
  line-height: 1.45;
  word-break: break-word;
  opacity: 0.95;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  blockquote {
    margin: 0 0 0.35em;
    font-weight: ${({ theme }) => theme.weights.bold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.x3l};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.x2l};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  p {
    font-weight: ${({ theme }) => theme.weights.regular};
    line-height: 1.45;
  }

  h1:last-child,
  h2:last-child,
  h3:last-child,
  h4:last-child,
  h5:last-child,
  h6:last-child,
  p:last-child,
  ul:last-child,
  ol:last-child,
  blockquote:last-child {
    margin-bottom: 0;
  }

  ul,
  ol {
    padding-left: 1.15em;
  }

  blockquote {
    padding-left: 0.65em;
    border-left: 2px solid currentColor;
    opacity: 0.9;
  }

  strong {
    font-weight: ${({ theme }) => theme.weights.bold};
  }

  em {
    font-style: italic;
  }

  br {
    display: block;
    margin-bottom: 0.35em;
  }
`;

const NoteRoot = styled.div`
  ${noteTypography}

  ${({ $shadow }) =>
    $shadow &&
    css`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      li,
      strong,
      em,
      blockquote {
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.55);
      }
    `}
`;

const Placeholder = styled.span`
  opacity: 0.45;
`;

/** Gift note with safe, card-friendly Markdown (bold, italic, lists, line breaks) */
export default function GiftCardNote({ note = "", shadow = false }) {
  const trimmedNote = note.trim();

  if (!trimmedNote) {
    return (
      <NoteRoot $shadow={shadow} aria-hidden>
        <Placeholder>Your gift note</Placeholder>
      </NoteRoot>
    );
  }

  return (
    <NoteRoot $shadow={shadow}>
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        allowedElements={NOTE_ALLOWED_ELEMENTS}
        unwrapDisallowed
        components={markdownComponents}
      >
        {prepareGiftNoteMarkdown(note)}
      </ReactMarkdown>
    </NoteRoot>
  );
}
