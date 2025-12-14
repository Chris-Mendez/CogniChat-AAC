import React, { JSX, useMemo, useState } from "react";
import { View, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { scheduleOnRN } from "react-native-worklets";
import { HasKey } from "@/app/types/has-key";

interface DraggablePosition {
  x: number;
  y: number;
}

/**
 * @interface EditableDNDGridProps
 *
 * @property {T[]} items - The actual items, which are assumed to
 * be ordered by index.
 * @property {function} renderItem - Callback to render an item.
 * @property {function} onDeleteItem - Callback for when an item is
 * deleted, which can only happen when isEditMode is true.
 * @property {function} onSwapItems - Callback for when two items are
 * swapped, which can only happen when isEditMode is true.
 * @property {function} onItemPress - Callback for when an item is pressed,
 * which can only happen when isEditMode is false.
 * @property {number} itemHeight - The height of each item in pixels.
 * @property {number} itemWidth - The width of each item in pixels.
 * @property {boolean} isEditMode - False for items to only pressable,
 * true for items to be draggale and deletable.
 * @property {function} onGridLayout - Callback for when the
 * grid is rendered and the number of columns has been determined.
 */
interface EditableDNDGridProps<T extends HasKey> {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  onDeleteItem: (key: string) => void;
  onSwapItems: (indexFrom: number, indexTo: number) => void;
  onItemPress: (item: T) => void;
  itemWidth: number;
  itemHeight: number;
  isEditMode: boolean;
  onGridLayout: (numColumns: number) => void;
}

/**
 * The guiding philosophy behind this component is that we're given
 * an ordered array of items and a variably sized container that we
 * don't know the dimensions of until it's rendered. This component
 * tries to fill in the container with as many as those items as
 * possible. It uses absolute positioning and reanimated.
 */
function EditableDNDGrid<T extends HasKey>({
  items,
  renderItem,
  onDeleteItem,
  onSwapItems,
  onItemPress,
  itemWidth,
  itemHeight,
  isEditMode,
  onGridLayout,
}: EditableDNDGridProps<T>) {
  const [centeringOffset, setCenteringOffset] = useState(0);
  const [numColumns, setNumColumns] = useState(1);
  const [numRows, setNumRows] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  const positions = useMemo(() => {
    if (containerWidth === 0) return {};

    const rebuild: Record<string, DraggablePosition> = {};
    items.forEach((item, i) => {
      const col = i % numColumns;
      const row = Math.floor(i / numColumns);
      rebuild[item.key] = {
        x: col * itemWidth + centeringOffset,
        y: row * itemHeight,
      };
    });
    return rebuild;
  }, [
    items,
    numColumns,
    itemWidth,
    itemHeight,
    centeringOffset,
    containerWidth,
  ]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    if (width === 0) return;

    const cols = Math.max(1, Math.floor(width / itemWidth));
    const rows = Math.ceil(items.length / cols);
    const offset = (width - itemWidth * cols) / 2;

    setContainerWidth(width);
    setNumColumns(cols);
    setNumRows(rows);
    setCenteringOffset(offset);
    onGridLayout(cols);
  };

  const isLoading = containerWidth === 0;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            height: Math.max(numRows * itemHeight, itemHeight),
          }}
          scrollEnabled={true}
        >
          {items.map((item) => (
            <DraggableItem
              key={item.key}
              id={item.key}
              item={item}
              pos={positions[item.key]}
              width={itemWidth}
              height={itemHeight}
              editable={isEditMode}
              onDeleteItem={onDeleteItem}
              onSwapItems={onSwapItems}
              onPress={onItemPress}
              numColumns={numColumns}
              centeringOffset={centeringOffset}
              totalItems={items.length}
            >
              {renderItem(item)}
            </DraggableItem>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

interface DraggableItemProps<T> {
  id: string; // note: this is really just key
  item: T;
  pos: DraggablePosition;
  width: number;
  height: number;
  editable: boolean;
  onDeleteItem: (id: string) => void;
  onSwapItems: (from: number, to: number) => void;
  onPress: (item: T) => void;
  children: React.ReactNode;
  numColumns: number;
  centeringOffset: number;
  totalItems: number;
}

function DraggableItem<T>({
  id,
  item,
  pos,
  width,
  height,
  editable,
  onDeleteItem,
  onSwapItems,
  onPress,
  children,
  numColumns,
  centeringOffset,
  totalItems,
}: DraggableItemProps<T>) {
  const isGestureActive = useSharedValue(false);

  // animated position
  const x = useSharedValue(pos?.x || 0);
  const y = useSharedValue(pos?.y || 0);

  // real position
  const staticX = useSharedValue(pos?.x || 0);
  const staticY = useSharedValue(pos?.y || 0);

  useAnimatedReaction(
    () => pos,
    (currentPos) => {
      if (!currentPos) return;

      staticX.value = currentPos.x;
      staticY.value = currentPos.y;

      if (!isGestureActive.value) {
        x.value = withSpring(currentPos.x);
        y.value = withSpring(currentPos.y);
      }
    },
    [pos]
  );

  const getIndexAtPoint = (targetX: number, targetY: number) => {
    "worklet";
    const relativeX = targetX - centeringOffset + width / 2;
    const relativeY = targetY + height / 2;

    const col = Math.floor(relativeX / width);
    const row = Math.floor(relativeY / height);

    if (col < 0 || col >= numColumns || row < 0) return -1;

    const index = row * numColumns + col;
    return index;
  };

  const getPointAtIndex = (index: number) => {
    "worklet";
    const col = index % numColumns;
    const row = Math.floor(index / numColumns);
    return { x: col * width + centeringOffset, y: row * height };
  };

  const panGesture = Gesture.Pan()
    .enabled(editable)
    .activateAfterLongPress(50)
    .onStart(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      x.value = staticX.value + event.translationX;
      y.value = staticY.value + event.translationY;
    })
    .onEnd((event) => {
      isGestureActive.value = false;

      const currentX = staticX.value + event.translationX;
      const currentY = staticY.value + event.translationY;

      const oldIndex = getIndexAtPoint(staticX.value, staticY.value);
      const newIndex = getIndexAtPoint(currentX, currentY);

      if (newIndex !== -1 && newIndex !== oldIndex && newIndex < totalItems) {
        const dest = getPointAtIndex(newIndex);
        staticX.value = dest.x;
        staticY.value = dest.y;
        x.value = withSpring(dest.x);
        y.value = withSpring(dest.y);
        scheduleOnRN(onSwapItems, oldIndex, newIndex);
      } else {
        x.value = withSpring(staticX.value);
        y.value = withSpring(staticY.value);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: x.value,
      top: y.value,
      width: width,
      height: height,
      zIndex: isGestureActive.value ? 999 : 1,
      transform: [{ scale: withSpring(isGestureActive.value ? 1.1 : 1) }],
      opacity: isGestureActive.value ? 0.9 : 1,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={() => {
            if (!editable) onPress(item);
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.itemInner}>
            {children}
            {editable && (
              <Pressable
                onPress={() => onDeleteItem(id)}
                style={styles.deleteButton}
                hitSlop={10}
              >
                <FontAwesome name="close" size={12} color="white" />
              </Pressable>
            )}
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemInner: {
    flex: 1,
    backgroundColor: "green",
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255, 50, 50, 0.9)",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
});

export default EditableDNDGrid;
