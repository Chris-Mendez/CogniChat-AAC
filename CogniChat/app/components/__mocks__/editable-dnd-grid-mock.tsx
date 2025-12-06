import React, { JSX, useState } from "react";
import { Text, View } from "react-native";
import EditableDNDGrid from "@/app/components/editable-dnd-grid";
import { HasKey } from "@/app/types/has-key";
import uuid from "react-native-uuid";

interface TestItem extends HasKey {}

export const EditableDNDGridMock = () => {
  const default_items: TestItem[] = [];
  for (let i = 0; i < 100; i++) {
    default_items.push({ key: uuid.v4() });
  }

  const [items, setItems] = useState(default_items);

  const doRenderItem = (item: TestItem): JSX.Element => {
    return <Text>{item.key}</Text>;
  };

  const doDeleteItem = (key: string) => {
    const copy = [...items];
    setItems(copy.filter((item) => item.key !== key));
  };

  const doSwapItems = (indexFrom: number, indexTo: number) => {
    let copy = [...items];
    let temp = copy[indexFrom];
    copy[indexFrom] = copy[indexTo];
    copy[indexTo] = temp;
    setItems(copy);
  };

  const doPressItem = (item: TestItem) => {
    console.log("Pressed item " + item.key);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <EditableDNDGrid<TestItem>
          items={items}
          renderItem={doRenderItem}
          onDeleteItem={doDeleteItem}
          onSwapItems={doSwapItems}
          onItemPress={doPressItem}
          itemWidth={120}
          itemHeight={120}
          isEditMode={true}
        />
      </View>
    </>
  );
};

export default EditableDNDGridMock;
