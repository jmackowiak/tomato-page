import type { CopyKey } from './content';

export const uiKeys = [
  'motionOn', 'motionOff', 'motionReduced', 'motionDevice', 'motionDisable', 'motionEnable',
  'soundUnavailable', 'soundLoading', 'soundOn', 'soundOff', 'soundDisable', 'soundEnable',
  'soundEnableTitle', 'soundFailure', 'soundReady',
] as const satisfies readonly CopyKey[];

type UiCopy = Record<typeof uiKeys[number], string>;

// Only the current language's control labels are included in the page.
export function readUi(): UiCopy {
  return JSON.parse(document.body.dataset.ui!) as UiCopy;
}
