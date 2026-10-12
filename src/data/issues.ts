/**
 * Troubleshooting guides shown in the app.
 * To add a new problem, add an entry to `ISSUES` — the home screen and the
 * guide screen pick it up automatically.
 */

import type { AndroidSymbol, SFSymbol } from 'expo-symbols';

export type LiveCheck = 'wifi' | 'performance';
export type DeviceTest = 'camera' | 'pen';

export type Step = {
  title: string;
  detail: string;
};

export type Issue = {
  id: string;
  title: string;
  subtitle: string;
  icon: { ios: SFSymbol; android: AndroidSymbol };
  color: string;
  /** Live status card shown above the steps. */
  check?: LiveCheck;
  /** Hands-on test screen the user can open from the guide. */
  test?: DeviceTest;
  /** Optional note shown at the top of the guide. */
  note?: string;
  steps: Step[];
};

export const ISSUES: Issue[] = [
  {
    id: 'wifi',
    title: 'Wi-Fi',
    subtitle: 'No internet, slow or keeps dropping',
    icon: { ios: 'wifi', android: 'wifi' },
    color: '#208AEF',
    check: 'wifi',
    steps: [
      {
        title: 'Turn Wi-Fi off and on',
        detail: 'Open Control Center (swipe down from the top-right corner) and tap the Wi-Fi icon off, wait 10 seconds, then tap it on again.',
      },
      {
        title: 'Toggle Airplane Mode',
        detail: 'In Control Center, turn Airplane Mode on, wait 10 seconds, then turn it off. This resets all wireless connections.',
      },
      {
        title: 'Check you are on the right network',
        detail: 'Go to Settings > Wi-Fi and make sure the network with the checkmark is the one you expect. Avoid networks marked "Weak Security" or "No Internet Connection".',
      },
      {
        title: 'Forget the network and rejoin',
        detail: 'Settings > Wi-Fi > tap the (i) next to your network > Forget This Network. Then select it again and re-enter the password.',
      },
      {
        title: 'Turn off VPN',
        detail: 'If you use a VPN, go to Settings > VPN (or Settings > General > VPN & Device Management) and switch it off to test.',
      },
      {
        title: 'Restart the router',
        detail: 'Unplug the Wi-Fi router for 30 seconds, plug it back in and wait 2 minutes for the lights to settle. Check if other devices can get online.',
      },
      {
        title: 'Restart the device',
        detail: 'Turn the device fully off and back on. See the "Frozen screen" guide for how to restart.',
      },
      {
        title: 'Reset Network Settings',
        detail: 'Settings > General > Transfer or Reset iPad/iPhone > Reset > Reset Network Settings. Note: this forgets all saved Wi-Fi passwords.',
      },
    ],
  },
  {
    id: 'frozen',
    title: 'Frozen screen',
    subtitle: 'Screen stuck, not responding to touch',
    icon: { ios: 'hand.tap', android: 'touch_app' },
    color: '#E5484D',
    note: 'If your screen is frozen right now you will not be able to use this app on it — open this guide on another device, or try a force restart first.',
    steps: [
      {
        title: 'Close the stuck app',
        detail: 'Swipe up from the bottom of the screen and pause in the middle (or double-click the Home button). Swipe the frozen app up and off the screen.',
      },
      {
        title: 'Force restart — iPad without Home button / iPhone 8 and later',
        detail: 'Press and quickly release the volume button nearest the top button, then the other volume button. Then press and hold the top (or side) button until the Apple logo appears.',
      },
      {
        title: 'Force restart — iPad with Home button',
        detail: 'Press and hold the top button and the Home button together until the Apple logo appears.',
      },
      {
        title: 'Charge the device',
        detail: 'Plug it in for at least 30 minutes. A completely drained battery can look like a frozen or black screen.',
      },
      {
        title: 'Clean the screen and remove the case',
        detail: 'Dirt, water or a badly fitted screen protector can stop touches from registering. Wipe the screen and try without the case.',
      },
      {
        title: 'Update the software',
        detail: 'Settings > General > Software Update. Install any available update.',
      },
    ],
  },
  {
    id: 'pen',
    title: 'Apple Pencil',
    subtitle: 'Not drawing, not pairing or skipping',
    icon: { ios: 'pencil.tip', android: 'edit' },
    color: '#8E4EC6',
    test: 'pen',
    steps: [
      {
        title: 'Test it on the drawing pad',
        detail: 'Use "Open test" above to draw and see whether the Pencil is detected at all.',
      },
      {
        title: 'Charge the Pencil',
        detail: 'Pencil (2nd gen / Pro): attach it to the magnetic side of the iPad. USB-C Pencil: plug it in with a cable. 1st gen: plug it into the iPad or the charging adapter. Check the battery in the Batteries widget.',
      },
      {
        title: 'Check Bluetooth is on',
        detail: 'Settings > Bluetooth must be on for the Pencil to pair.',
      },
      {
        title: 'Re-pair the Pencil',
        detail: 'Settings > Bluetooth > tap (i) next to Apple Pencil > Forget This Device. Then attach or plug in the Pencil again and tap Pair.',
      },
      {
        title: 'Tighten or replace the tip',
        detail: 'Twist the tip clockwise to make sure it is snug. A worn tip with metal showing should be replaced.',
      },
      {
        title: 'Check compatibility',
        detail: 'Not every Pencil works with every iPad. Search "Apple Pencil compatibility" on Apple\'s website for your iPad model.',
      },
      {
        title: 'Restart the iPad',
        detail: 'Turn the iPad off and on, then try the Pencil again.',
      },
    ],
  },
  {
    id: 'camera',
    title: 'Camera',
    subtitle: 'Black screen, blurry or won\'t open',
    icon: { ios: 'camera', android: 'photo_camera' },
    color: '#30A46C',
    test: 'camera',
    steps: [
      {
        title: 'Test both cameras',
        detail: 'Use "Open test" above to check the front and back cameras.',
      },
      {
        title: 'Clean the lens',
        detail: 'Wipe the camera lens with a soft, lint-free cloth. Remove any case that might cover the lens.',
      },
      {
        title: 'Close other camera apps',
        detail: 'Only one app can use the camera at a time. Close FaceTime, Zoom, Teams and similar apps.',
      },
      {
        title: 'Check camera restrictions',
        detail: 'Settings > Screen Time > Content & Privacy Restrictions > Allowed Apps & Features — make sure Camera is on. On managed (work/school) devices the camera may be disabled by your IT team.',
      },
      {
        title: 'Check app permission',
        detail: 'If only one app cannot use the camera: Settings > Privacy & Security > Camera, and turn it on for that app.',
      },
      {
        title: 'Restart and update',
        detail: 'Restart the device, then check Settings > General > Software Update.',
      },
    ],
  },
  {
    id: 'slow',
    title: 'Slowness',
    subtitle: 'Laggy, apps slow to open',
    icon: { ios: 'tortoise', android: 'speed' },
    color: '#F76B15',
    check: 'performance',
    steps: [
      {
        title: 'Check the live readings above',
        detail: 'Low Power Mode, low battery and nearly full storage are the most common causes of a slow device.',
      },
      {
        title: 'Turn off Low Power Mode',
        detail: 'Settings > Battery > Low Power Mode. It saves battery by slowing the device down.',
      },
      {
        title: 'Free up storage',
        detail: 'Settings > General > iPad/iPhone Storage. Aim to keep at least 10% free. Offload apps you don\'t use and delete large videos.',
      },
      {
        title: 'Close apps you are not using',
        detail: 'Swipe up and pause to see open apps, then swipe away the ones you don\'t need.',
      },
      {
        title: 'Restart the device',
        detail: 'A restart clears memory and stops stuck background tasks. Try this at least once a week.',
      },
      {
        title: 'Update the software',
        detail: 'Settings > General > Software Update.',
      },
      {
        title: 'Limit background activity',
        detail: 'Settings > General > Background App Refresh — turn it off for apps that don\'t need it.',
      },
    ],
  },
];

export function getIssue(id: string) {
  return ISSUES.find((issue) => issue.id === id);
}
