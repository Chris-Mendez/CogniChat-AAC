import React, { JSX, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import {
  SymbolTileCategoryKey,
  SymbolTileCategoryProperties,
} from "@/app/types/symbol-tile-categories";
import { useAACSymbolTilesStore } from "@/app/contexts/aac-symbol-tiles-provider";
import createUniqueKey from "@/app/utils/create-unique-key";
import { Picker } from "@react-native-picker/picker";
import { enumValuesOf } from "@/app/utils/enum-iterator";
import { Ionicons } from "@expo/vector-icons";
import { PICKER_NO_SELECTION } from "@/app/constants/picker-no-selection";
import { SymbolTileData, ImageRef } from "../types/symbol-tile-data";
import * as ImagePicker from "expo-image-picker";
import { useAACUserImagesStore } from "../contexts/aac-user-images-provider";

interface TileCustomizerProps {
  tile?: SymbolTileData;
}

export const TileCustomizer: React.FC<TileCustomizerProps> = ({
  tile,
}: TileCustomizerProps): JSX.Element => {
  const { allTabs, addSymbolTileToTab, addSymbolTile } =
    useAACSymbolTilesStore();
  const { linkImage } = useAACUserImagesStore();

  const [tileTextLabel, setTileTextLabel] = useState<string>("");
  const [tileCategory, setTileCategory] = useState<SymbolTileCategoryKey>(
    SymbolTileCategoryKey.other
  );
  const [tileTab, setTileTab] = useState<string>(PICKER_NO_SELECTION);
  const [tileImgUri, setTileImgUri] = useState<string>("");
  const [tileVocalization, setTileVocalization] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const onCreateTile = async () => {
    // validate inputs
    if (tileTab === PICKER_NO_SELECTION) {
      setIsError(true);
      setStatus("Must select a tab");
      return;
    }
    if (!tileTextLabel && !tileVocalization) {
      setIsError(true);
      setStatus("Must provide vocalization or text label");
      return;
    }

    // image
    let imageLabel: ImageRef | undefined = undefined;
    if (tileImgUri) {
      let hash;
      try {
        hash = await linkImage(tileImgUri);
      } catch (e) {
        setIsError(true);
        setStatus("Internal Error");
        console.log(e);
        return;
      }
      imageLabel = {
        kind: "stored",
        hash: hash,
      };
    }

    // create tile
    const key = createUniqueKey();
    addSymbolTile({
      key: key,
      textLabel: tileTextLabel,
      imageLabel: imageLabel,
      vocalization: tileVocalization || tileTextLabel,
      category: Number(tileCategory),
    });
    addSymbolTileToTab(tileTab, key);

    // clean up
    setIsError(false);
    setTileTextLabel("");
    setStatus("Custom button added");
    setTileImgUri("");
    setTileTab(PICKER_NO_SELECTION);
  };

  const onPickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!res.canceled) setTileImgUri(res.assets[0].uri);
  };

  return (
    <>
      <TextInput
        value={tileTextLabel}
        onChangeText={setTileTextLabel}
        placeholder="Enter word or phrase..."
      />
      <Picker selectedValue={tileCategory} onValueChange={setTileCategory}>
        {enumValuesOf(SymbolTileCategoryKey).map((enumKey) => (
          <Picker.Item
            label={SymbolTileCategoryProperties[enumKey].singular}
            value={enumKey}
            key={enumKey}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={tileTab ?? PICKER_NO_SELECTION}
        onValueChange={setTileTab}
      >
        <Picker.Item
          label="Select a tab..."
          value={PICKER_NO_SELECTION}
          enabled={false}
        />
        {Object.values(allTabs).map((tab) => (
          <Picker.Item key={tab.key} label={tab.name} value={tab.key} />
        ))}
      </Picker>

      {/* Currently not supported for Web */}
      {Platform.OS !== "web" && (
        <TouchableOpacity onPress={onPickImage}>
          <Text>Select an image</Text>
          {tileImgUri && (
            <Image
              source={{ uri: tileImgUri }}
              style={styles.previewImg}
            ></Image>
          )}
        </TouchableOpacity>
      )}
      <TextInput
        value={tileVocalization}
        onChangeText={setTileVocalization}
        placeholder="Enter word or phrase..."
      />

      <TouchableOpacity onPress={onCreateTile} style={styles.create}>
        <Ionicons name="add" size={22} color="white" />
        <Text>Add custom button</Text>
      </TouchableOpacity>
      {status?.length > 0 && (
        <Text style={isError ? styles.error : styles.success}>{status}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: { color: "red" },
  success: { color: "green" },
  create: {
    flexDirection: "row",
    backgroundColor: "#7ab0f7ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  previewImg: {
    width: 100,
    height: 100,
  },
});

export default TileCustomizer;
