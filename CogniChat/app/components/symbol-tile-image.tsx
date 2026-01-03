import React, { JSX } from "react";
import { ImageRef } from "../types/symbol-tile-data";
import { Image, ImageProps } from "expo-image";
import { useAACUserImagesStore } from "../contexts/aac-user-images-provider";

/**
 * @type SymbolTileImageProps
 */
type SymbolTileImageProps = {
  image: ImageRef;
} & Omit<ImageProps, "source">;

/**
 * A component for rendering the image of a symbol tile.
 *
 * @param {SymbolTileImageProps} props - {@link SymbolTileImageProps}
 * @returns {JSX.Element} A React Native component.
 */
export const SymbolTileImage: React.FC<SymbolTileImageProps> = ({
  image,
  ...imageProps
}: SymbolTileImageProps): JSX.Element => {
  const { images } = useAACUserImagesStore();
  switch (image.kind) {
    case "bundled":
      return <Image source={image.source} {...imageProps} />;
    case "stored":
      return (
        <Image source={{ uri: images[image.hash].localUri }} {...imageProps} />
      );
  }
};

export default SymbolTileImage;
