import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  onPress: () => void;
  mode?: 'fill' | 'outline';
  backgroundColor?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
};
export default function Button(props: Props) {
  let {
    title,
    onPress,
    backgroundColor,
    titleColor,
    containerStyle,
    titleStyle,
    mode,
  } = props;

  const BUTTON_COLOR = backgroundColor || COLORS.PRIMARY;
  const TITLE_COLOR = titleColor || 'white';
  const OUTLINE_STYLE: ViewStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: backgroundColor,
    borderRadius: 12,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: BUTTON_COLOR },
        mode === 'outline' ? OUTLINE_STYLE : null,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.title,
          { color: TITLE_COLOR },
          mode === 'outline' ? { color: backgroundColor } : null,
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
