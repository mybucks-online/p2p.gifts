import Placeholder from "@tiptap/extension-placeholder";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";

const EditorRoot = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.form};
  background: ${({ theme }) => theme.colors.card};
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x3s};
  padding: ${({ theme }) => theme.sizes.x3s};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.shellBg};
`;

const ToolbarButton = styled.button`
  min-width: 2.25rem;
  min-height: 2.25rem;
  padding: 0 ${({ theme }) => theme.sizes.x3s};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.card};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textInverse : theme.colors.textStrong};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.weights.highlight};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToolbarSelect = styled.select`
  min-height: 2.25rem;
  max-width: 7rem;
  padding: 0 ${({ theme }) => theme.sizes.x3s};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ColorPalette = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.x3s};
`;

const ColorSwatch = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: 50%;
  background: ${({ $auto, $color }) =>
    $auto
      ? "linear-gradient(135deg, transparent 45%, #dc2626 46%, #dc2626 54%, transparent 55%), #ffffff"
      : $color};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled(EditorContent)`
  .tiptap {
    min-height: 5rem;
    padding: ${({ theme }) => theme.sizes.base};
    color: ${({ theme }) => theme.colors.textStrong};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 1.45;
    outline: none;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .tiptap p {
    margin: 0;
  }

  .tiptap p + p {
    margin-top: 0.35em;
  }

  .tiptap strong {
    font-weight: ${({ theme }) => theme.weights.bold};
  }

  .tiptap em {
    font-style: italic;
  }

  .tiptap p.is-editor-empty:first-child::before {
    float: left;
    height: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    content: attr(data-placeholder);
    pointer-events: none;
  }
`;

const FONT_FAMILIES = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Inter", "Inter"],
];

const FONT_SIZES = [
  ["12px", "Small text"],
  ["16px", "Normal text"],
  ["32px", "Heading 1"],
  ["26px", "Heading 2"],
  ["23px", "Heading 3"],
  ["20px", "Heading 4"],
  ["18px", "Heading 5"],
];

const COLORS = [
  ["auto", "Auto"],
  ["#ffffff", "White"],
  ["#0f172a", "Slate"],
  ["#dc2626", "Red"],
  ["#ea580c", "Orange"],
  ["#d97706", "Amber"],
  ["#eab308", "Yellow"],
  ["#16a34a", "Green"],
  ["#2563eb", "Blue"],
  ["#9333ea", "Purple"],
  ["#db2777", "Pink"],
];

export default function GiftNoteEditor({ onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        bulletList: false,
        codeBlock: false,
        heading: false,
        horizontalRule: false,
        link: false,
        orderedList: false,
      }),
      TextStyleKit,
      Placeholder.configure({
        placeholder: "Write a personal gift note",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        "aria-label": "Gift note",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  if (!editor) return null;

  const textStyle = editor.getAttributes("textStyle");
  const activeColor = textStyle.color || "auto";
  const activeFontFamily = textStyle.fontFamily || "Inter";
  const activeFontSize = textStyle.fontSize || "16px";

  const runFormattingCommand = (command) => {
    const { from, to } = editor.state.selection;
    const range =
      from === to && editor.state.selection.$from.parent.isTextblock
        ? {
            from: editor.state.selection.$from.start(
              editor.state.selection.$from.depth,
            ),
            to: editor.state.selection.$from.end(
              editor.state.selection.$from.depth,
            ),
          }
        : { from, to };

    command(editor.chain().focus().setTextSelection(range)).run();
  };

  return (
    <EditorRoot>
      <Toolbar aria-label="Gift note formatting">
        <ToolbarSelect
          aria-label="Font family"
          value={activeFontFamily}
          onChange={(event) =>
            runFormattingCommand((chain) =>
              chain.setFontFamily(event.target.value),
            )
          }
        >
          {FONT_FAMILIES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </ToolbarSelect>
        <ToolbarSelect
          aria-label="Font size"
          value={activeFontSize}
          onChange={(event) =>
            runFormattingCommand((chain) =>
              chain.setFontSize(event.target.value),
            )
          }
        >
          {FONT_SIZES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </ToolbarSelect>
        <ToolbarButton
          type="button"
          $active={editor.isActive("bold")}
          aria-label="Bold"
          aria-pressed={editor.isActive("bold")}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => runFormattingCommand((chain) => chain.toggleBold())}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          type="button"
          $active={editor.isActive("italic")}
          aria-label="Italic"
          aria-pressed={editor.isActive("italic")}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => runFormattingCommand((chain) => chain.toggleItalic())}
        >
          <em>I</em>
        </ToolbarButton>
        <ColorPalette role="group" aria-label="Text color palette">
          {COLORS.map(([color, label]) => (
            <ColorSwatch
              key={color}
              type="button"
              $active={activeColor === color}
              $color={color === "auto" ? "transparent" : color}
              $auto={color === "auto"}
              aria-label={label}
              aria-pressed={activeColor === color}
              title={label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                runFormattingCommand((chain) =>
                  color === "auto" ? chain.unsetColor() : chain.setColor(color),
                );
              }}
            />
          ))}
        </ColorPalette>
      </Toolbar>
      <Content editor={editor} />
    </EditorRoot>
  );
}
