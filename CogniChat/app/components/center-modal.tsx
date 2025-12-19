import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const CLOSE_DELAY_MS = 600;

/**
 * @interface CenterModalProps
 *
 * @property {boolean} visible - Should this modal be displayed?
 * @property {function} onClose - Callback handler for when the user taps
 * outside the modal boundary.
 * @property {React.ReactNode} children - Child components.
 */
interface CenterModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const CenterModal: React.FC<CenterModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [canClose, setCanClose] = useState(false);
  const [isMounted, setIsMounted] = useState(visible);
  const closeTimeoutRef = useRef<number>(null);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      setCanClose(false);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      closeTimeoutRef.current = setTimeout(() => {
        setCanClose(true);
      }, CLOSE_DELAY_MS);
    } else {
      setCanClose(false);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsMounted(false);
      });
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [visible]);

  const handleOverlayPress = () => {
    if (!canClose) return;
    onClose?.();
  };

  if (!isMounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleOverlayPress}
        />

        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default CenterModal;
