import React, { JSX, useRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

/**
 * @interface RightmostScrollViewProps
 *
 * @property {React.ReactNode} children - Child components.
 */
type RightmostScrollViewProps = ScrollViewProps & {
  children: React.ReactNode;
};

/**
 * A component for rendering a horizontal ScrollView component but
 * also snaps the ScrollView to the very right if there is enough
 * content within the ScrollView. Useful for text inputs, for example.
 *
 * @param {RightmostScrollViewProps} props {@link RightmostScrollViewProps}
 * @returns {JSX.Element} A modified ScrollView component.
 */
const RightmostScrollView = ({
  children,
  ...props
}: RightmostScrollViewProps): JSX.Element => {
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default RightmostScrollView;
