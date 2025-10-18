// hooks/useSafeAreaPadding.ts
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PaddingType = 'all' | 'top' | 'bottom' | 'horizontal' | 'vertical' | 'topBottom';

interface UseSafeAreaPaddingOptions {
  type?: PaddingType;
  extraTop?: number;
  extraBottom?: number;
  extraHorizontal?: number;
}

export function useSafeArea({
  type = 'all',
  extraTop = 0,
  extraBottom = 0,
  extraHorizontal = 0,
}: UseSafeAreaPaddingOptions = {}): ViewStyle {
  const insets = useSafeAreaInsets();

  const paddingStyle: ViewStyle = {};

  switch (type) {
    case 'all':
      paddingStyle.paddingTop = insets.top + extraTop;
      paddingStyle.paddingBottom = insets.bottom + extraBottom;
      paddingStyle.paddingLeft = insets.left + extraHorizontal;
      paddingStyle.paddingRight = insets.right + extraHorizontal;
      break;

    case 'top':
      paddingStyle.paddingTop = insets.top + extraTop;
      break;

    case 'bottom':
      paddingStyle.paddingBottom = insets.bottom + extraBottom;
      break;

    case 'topBottom':
      paddingStyle.paddingTop = insets.top + extraTop;
      paddingStyle.paddingBottom = insets.bottom + extraBottom;
      break;

    case 'horizontal':
      paddingStyle.paddingLeft = insets.left + extraHorizontal;
      paddingStyle.paddingRight = insets.right + extraHorizontal;
      break;

    case 'vertical':
      paddingStyle.paddingTop = insets.top + extraTop;
      paddingStyle.paddingBottom = insets.bottom + extraBottom;
      break;

    default:
      break;
  }

  return paddingStyle;
}