import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import styled from "styled-components";

import { BackIcon } from "@p2p-gifts/assets/icons";
import Button from "@p2p-gifts/components/Button";
import { Container } from "@p2p-gifts/components/Containers";
import GiftCardPreview, {
  CARD_STYLE_GROUPS,
  CARD_STYLE_ID_DEFAULT,
  getCardFormatConfig,
  parseCardStyle,
} from "@p2p-gifts/components/GiftCardPreview";
import Input from "@p2p-gifts/components/Input";
import { Label } from "@p2p-gifts/components/Label";
import Select from "@p2p-gifts/components/Select";
import {
  H3,
  WizardStepSummary,
  WizardStepTitle,
} from "@p2p-gifts/components/Texts";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import { downloadGiftCardImage } from "@p2p-gifts/lib/giftCardExport";
import { sizes as breakpoints } from "@p2p-gifts/styles/media";

const DESKTOP_MIN = breakpoints.lg + 1;

const PageLayout = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.cardMaxWidth};
  margin-inline: auto;

  @media (min-width: ${DESKTOP_MIN}px) {
    max-width: ${({ theme }) => theme.sizes.giftCardMaxWidth};
  }
`;

const PageTop = styled.header`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.sizes.x2l};
`;

const BackNavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.form};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? `0 2px 8px rgba(0, 0, 0, 0.4), ${theme.colors.cardShadow}`
      : `0 4px 14px rgba(15, 23, 42, 0.12), ${theme.colors.cardShadow}`};
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.mode === "dark"
        ? `0 4px 12px rgba(0, 0, 0, 0.5), ${theme.colors.cardShadow}`
        : `0 8px 24px rgba(15, 23, 42, 0.16), ${theme.colors.cardShadow}`};
    transform: scale(1.05);
  }

  img {
    display: block;
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const GiftCardContainer = styled(Container)`
  @media (min-width: ${DESKTOP_MIN}px) {
    max-width: none;
  }
`;

const ContentGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.x2l};

  @media (min-width: ${DESKTOP_MIN}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: ${({ theme }) => theme.sizes.x4l};
  }
`;

const PreviewColumn = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.lg};
  min-width: 0;

  @media (min-width: ${DESKTOP_MIN}px) {
    align-items: stretch;
  }
`;

const PreviewHeading = styled(H3)`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
`;

const SettingsColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.x2l};
`;

const SettingsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x3s};
  text-align: center;
  width: 100%;

  @media (min-width: ${DESKTOP_MIN}px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const SettingsStepTitle = styled(WizardStepTitle)`
  justify-content: center;

  @media (min-width: ${DESKTOP_MIN}px) {
    justify-content: flex-start;
  }
`;

const ThemeField = styled.div`
  width: 100%;
`;

const ThemeSelectWrap = styled.div`
  width: 100%;

  & > div {
    display: block;
    width: 100%;
  }

  select {
    width: 100%;
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: ${({ theme }) => theme.sizes.base};
    border-radius: ${({ theme }) => theme.radius.form};
  }
`;

const GiftNoteField = styled.div`
  width: 100%;
`;

const GiftNoteHint = styled.p`
  margin: ${({ theme }) => theme.sizes.x3s} 0 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

const GiftNoteInput = styled(Input)`
  min-height: 5rem;
  resize: vertical;
  margin-bottom: 0;
  line-height: 1.45;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.label`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.sizes.base};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.form};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.weights.regular};
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const FileHintRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.sizes.sm};
  margin: ${({ theme }) => theme.sizes.x3s} 0 0;
`;

const FileNameHint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  word-break: break-word;
  min-width: 0;
`;

const PresetBackgroundLink = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.base};
  width: 100%;
`;

const MAX_CUSTOM_IMAGE_BYTES = 8 * 1024 * 1024;
const PRESET_CUSTOM_BACKGROUNDS = {
  "red-gift-box": "/cards/red-gift-box.jpg",
};

const GenerateGiftCard = () => {
  const { setActiveStep, giftingLink } = useContext(StoreContext);
  const [cardStyle, setCardStyle] = useState(CARD_STYLE_ID_DEFAULT);
  const { format: cardFormat, theme } = parseCardStyle(cardStyle);
  const formatConfig = getCardFormatConfig(cardFormat);
  const [giftNote, setGiftNote] = useState("");
  const [customBackgroundImage, setCustomBackgroundImage] = useState("");
  const [customImageName, setCustomImageName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const cardExportRef = useRef(null);
  const backgroundFileInputRef = useRef(null);
  const CardComponent = formatConfig.Component;
  const isCustomFormat = formatConfig.supportsCustomImage;

  const goBackToFund = () => {
    setActiveStep(WIZARD_STEP.FUND);
  };

  const handleCustomImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_CUSTOM_IMAGE_BYTES) {
      toast("Image must be 8 MB or smaller.");
      event.target.value = "";
      return;
    }

    const input = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      setCustomBackgroundImage(String(reader.result));
      setCustomImageName(file.name);
      input.value = "";
    };
    reader.onerror = () => {
      toast("Could not read image. Please try again.");
      input.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handlePresetBackground = (presetId) => {
    const imageUrl = PRESET_CUSTOM_BACKGROUNDS[presetId];
    if (!imageUrl) return;

    if (backgroundFileInputRef.current) {
      backgroundFileInputRef.current.value = "";
    }

    setCustomBackgroundImage(imageUrl);
    setCustomImageName(`${presetId}.jpg`);
  };

  const handleDownloadImage = async () => {
    if (!cardExportRef.current || downloading) return;
    if (isCustomFormat && !customBackgroundImage) {
      toast("Upload a background image first.");
      return;
    }

    setDownloading(true);
    try {
      const filename = isCustomFormat
        ? "gift-card-custom.png"
        : `gift-card-${theme}.png`;
      await downloadGiftCardImage(cardExportRef.current, filename);
      toast("Gift card image saved.");
    } catch {
      toast("Could not save image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyGiftingLink = async () => {
    if (!giftingLink) {
      toast("Gifting link is not available yet.");
      return;
    }

    try {
      await copy(giftingLink);
      toast("Gifting link copied to clipboard.");
    } catch {
      toast("Could not copy link. Please try again.");
    }
  };

  return (
    <PageLayout>
      <PageTop>
        <BackNavButton type="button" onClick={goBackToFund} aria-label="Back">
          <img src={BackIcon} alt="" />
        </BackNavButton>
      </PageTop>
      <GiftCardContainer>
        <ContentGrid>
          <PreviewColumn>
            <PreviewHeading>Preview</PreviewHeading>
            <GiftCardPreview>
              {isCustomFormat ? (
                <CardComponent
                  ref={cardExportRef}
                  backgroundImage={customBackgroundImage}
                  note={giftNote}
                  giftingLink={giftingLink}
                />
              ) : (
                <CardComponent
                  ref={cardExportRef}
                  theme={theme}
                  note={giftNote}
                  giftingLink={giftingLink}
                />
              )}
            </GiftCardPreview>
          </PreviewColumn>

          <SettingsColumn>
            <SettingsHeader>
              <SettingsStepTitle step={3}>Generate Gift Card</SettingsStepTitle>
              <WizardStepSummary>
                {isCustomFormat
                  ? "Upload your image, add a note, and download your gift card"
                  : "Choose a theme and download your gift card"}
              </WizardStepSummary>
            </SettingsHeader>

            <ThemeField>
              <Label htmlFor="gift-card-style">Card Style</Label>
              <ThemeSelectWrap>
                <Select
                  id="gift-card-style"
                  value={cardStyle}
                  onChange={(e) => setCardStyle(e.target.value)}
                >
                  {CARD_STYLE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
              </ThemeSelectWrap>
            </ThemeField>

            {isCustomFormat ? (
              <ThemeField>
                <Label htmlFor="gift-card-background">Background Image</Label>
                <HiddenFileInput
                  ref={backgroundFileInputRef}
                  id="gift-card-background"
                  type="file"
                  accept="image/*"
                  onChange={handleCustomImageChange}
                />
                <FileUploadButton htmlFor="gift-card-background">
                  {customBackgroundImage
                    ? "Replace background image"
                    : "Upload background image"}
                </FileUploadButton>
                <FileHintRow>
                  <FileNameHint>
                    {customImageName || "PNG or JPG, up to 8 MB"}
                  </FileNameHint>
                  <PresetBackgroundLink
                    type="button"
                    onClick={() => handlePresetBackground("red-gift-box")}
                  >
                    red-gift-box
                  </PresetBackgroundLink>
                </FileHintRow>
              </ThemeField>
            ) : null}

            <GiftNoteField>
              <Label htmlFor="gift-note">Gift Note</Label>
              <GiftNoteInput
                id="gift-note"
                as="textarea"
                rows={3}
                placeholder="Add a message — **bold**, *italic*, lists"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
              <GiftNoteHint>
                Markdown: # headings, **bold**, - bullets, blank lines for
                spacing
              </GiftNoteHint>
            </GiftNoteField>

            <ActionButtons>
              <Button
                type="button"
                $size="block"
                disabled={
                  downloading || (isCustomFormat && !customBackgroundImage)
                }
                onClick={handleDownloadImage}
              >
                {downloading ? "Saving…" : "Download Image"}
              </Button>
              <Button
                type="button"
                $size="block"
                $variant="secondary"
                disabled={!giftingLink}
                onClick={handleCopyGiftingLink}
              >
                Copy Gifting Link
              </Button>
            </ActionButtons>
          </SettingsColumn>
        </ContentGrid>
      </GiftCardContainer>
    </PageLayout>
  );
};

export default GenerateGiftCard;
