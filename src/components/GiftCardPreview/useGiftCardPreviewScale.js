import { useEffect, useState } from "react";

import { getGiftCardCanonicalWidthPx } from "@p2p-gifts/components/GiftCardPreview/constants";

export function useGiftCardPreviewScale(frameRef) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => {
      const width = frame.getBoundingClientRect().width;
      const canonical = getGiftCardCanonicalWidthPx();
      setScale(canonical > 0 ? Math.min(1, width / canonical) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [frameRef]);

  return scale;
}
