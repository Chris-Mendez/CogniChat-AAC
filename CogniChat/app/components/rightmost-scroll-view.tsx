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
 * A component for rendering a horizontal ScrollView but which
 * also snaps the ScrollView to the very right if the size of the
 * content grows. Useful for text inputs, for example.
 *
 * @param {RightmostScrollViewProps} props {@link RightmostScrollViewProps}
 * @returns {JSX.Element} A modified ScrollView component.
 */
const RightmostScrollView = ({
  children,
  ...props
}: RightmostScrollViewProps): JSX.Element => {
  // useRef instead of useState to prevent re-renders
  const scrollRef = useRef<ScrollView | null>(null);
  const lastWidth = useRef<number>(0);

  const handleContentSizeChange = (contentWidth: number) => {
    if (contentWidth > lastWidth.current) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
    lastWidth.current = contentWidth;
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={handleContentSizeChange}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default RightmostScrollView;
