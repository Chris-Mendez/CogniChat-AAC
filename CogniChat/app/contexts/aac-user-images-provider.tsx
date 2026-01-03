import React, { createContext, useContext, useEffect, useState } from "react";
import { UserImageData } from "../types/user-image-data";
import { File, Directory, Paths } from "expo-file-system";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";

const AAC_USER_IMAGES_DIR = "aacuserimages";

type ImageRegistry = Record<string, UserImageData>;

type AACUserImagesContextType = {
  /**
   * Getter and setter for the images.
   */
  images: ImageRegistry;
  setImages: React.Dispatch<React.SetStateAction<ImageRegistry>>;

  /**
   * Adds an image to the user image store (or just increments
   * the reference counter if the image already exists).
   * @param tmpUri The (temporary) location of the image.
   * @returns The hash of the image, used for retrieving the
   * image later for rendering.
   */
  link: (tmpUri: string) => Promise<string>;

  /**
   * Removes an image from the user image store (if
   * there are no more references to it, otherwise justs
   * decrements the reference counter).
   * @param hash The hash of the image to remove.
   * @returns Callback when the operation is completed.
   */
  unlink: (hash: string) => Promise<void>;
};

/**
 * Context for managing user images. Currently does not
 * support the Web platform, due to many restrictions.
 */
const AACUserImagesContext = createContext<
  AACUserImagesContextType | undefined
>(undefined);

export const AACUserImagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [registry, setRegistry] = useState<ImageRegistry>({});

  useEffect(() => {
    async function prepareDir() {
      if (Platform.OS !== "web") {
        try {
          // TEMPORARY
          // For development purposes, delete the entire
          // folder to clean out the images, since the
          // registry itself and counters aren't persisted.
          const dir = new Directory(Paths.document, AAC_USER_IMAGES_DIR);
          if (dir.exists) {
            dir.delete();
          }
          dir.create();
        } catch (e) {}
      }
    }
    prepareDir();
  }, []);

  const link = async (tmpUri: string): Promise<string> => {
    let hash: string;

    // Compute hash of the image. This is used to prevent
    // duplicates and to uniquely identfy the image.
    const tmpFile = new File(tmpUri);
    const tmpFileContent = await tmpFile.base64();
    hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      tmpFileContent
    );

    // Does the image already exist? If so, just increment
    // the local reference counter.
    if (registry[hash]) {
      setRegistry((prev) => ({
        ...prev,
        [hash]: { ...prev[hash], refCount: prev[hash].refCount + 1 },
      }));
      return hash;
    }

    // Otherwise, the image is new, so copy it into
    // the application directory to store it.
    const destFileDir = new Directory(Paths.document, AAC_USER_IMAGES_DIR);
    const destFile = new File(destFileDir, hash);
    tmpFile.copy(destFile);
    const newEntry: UserImageData = {
      hash,
      localUri: destFile.uri,
      refCount: 1,
    };
    setRegistry((prev) => ({
      ...prev,
      [hash]: newEntry,
    }));
    return hash;
  };

  const unlink = async (hash: string): Promise<void> => {
    const record = registry[hash];
    if (!record) return;

    // Is the reference counter of the image
    // more than 1? If so, just decrement the counter.
    if (record.refCount > 1) {
      setRegistry((prev) => ({
        ...prev,
        [hash]: { ...prev[hash], refCount: prev[hash].refCount - 1 },
      }));
      return;
    }

    // Otherwise, delete the image permanently.
    const fileToDel = new File(record.localUri);
    fileToDel.delete();
    setRegistry((prev) => {
      const { [hash]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AACUserImagesContext.Provider
      value={{ images: registry, setImages: setRegistry, link, unlink }}
    >
      {children}
    </AACUserImagesContext.Provider>
  );
};

export const useAACUserImagesStore = () => {
  const context = useContext(AACUserImagesContext);
  if (!context) throw new Error();
  return context;
};
