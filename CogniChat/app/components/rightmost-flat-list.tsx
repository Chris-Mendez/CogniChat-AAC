import React, { JSX, useRef } from "react";
import { FlatListProps, FlatList } from "react-native";

/**
 * @interface RightmostFlatListProps
 */
type RightmostFlatListProps<T> = FlatListProps<T> & {};

/**
 * A component for rendering a horizontal FlatList but which
 * also snaps the FlatList to the very right if the size of the
 * content grows. Useful for text inputs, for example.
 *
 * @param {RightmostFlatListProps} props {@link RightmostFlatListProps}
 * @returns {JSX.Element} A modified ScrollView component.
 */
const RightmostFlatList = <T,>({
  ...props
}: RightmostFlatListProps<T>): JSX.Element => {
  // useRef instead of useState to prevent re-renders
  const flatListRef = useRef<FlatList<T> | null>(null);
  const lastWidth = useRef<number>(0);

  const handleContentSizeChange = (contentWidth: number) => {
    if (contentWidth > lastWidth.current) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
    lastWidth.current = contentWidth;
  };

  return (
    <FlatList
      {...props}
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};

export default RightmostFlatList;
