/**
 * Troubleshooting guides shown in the app.
 * To add a new problem, add an entry to `ISSUES` — the home screen and the
 * guide screen pick it up automatically.
 */

import type { AndroidSymbol, SFSymbol } from 'expo-symbols';

export type LiveCheck = 'wifi' | 'performance' | 'battery';
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
  {
    id: 'bluetooth',
    title: 'Bluetooth & AirPods',
    subtitle: 'Won\'t connect, drops out or audio cuts',
    icon: { ios: 'airpodspro', android: 'bluetooth' },
    color: '#0091FF',
    steps: [
      {
        title: 'Check Bluetooth is on',
        detail: 'Open Control Center and make sure the Bluetooth icon is blue. If it is white, tap it on.',
      },
      {
        title: 'Charge the accessory',
        detail: 'Put AirPods in their case and charge for 15 minutes. For other headphones, keyboards or speakers, charge or replace the batteries.',
      },
      {
        title: 'Bring it closer',
        detail: 'Keep the accessory within a few metres of your device, away from microwaves, Wi-Fi routers and thick walls.',
      },
      {
        title: 'Turn Bluetooth off and on',
        detail: 'Settings > Bluetooth — switch it off, wait 10 seconds, then switch it on again.',
      },
      {
        title: 'Forget the device and pair again',
        detail: 'Settings > Bluetooth > tap (i) next to the accessory > Forget This Device. Then put the accessory in pairing mode (AirPods: open the case near your device and hold the button on the back) and connect again.',
      },
      {
        title: 'Disconnect it from other devices',
        detail: 'Headphones often reconnect to a nearby Mac, iPad or phone. Turn Bluetooth off on other devices while you test.',
      },
      {
        title: 'Restart the device',
        detail: 'Turn your iPhone or iPad off and on, then try connecting again.',
      },
      {
        title: 'Reset the accessory',
        detail: 'AirPods: put them in the case, open the lid and hold the setup button for about 15 seconds until the light flashes amber, then white. For other accessories, check the maker\'s reset instructions.',
      },
    ],
  },
  {
    id: 'battery',
    title: 'Battery & charging',
    subtitle: 'Drains fast, won\'t charge or charges slowly',
    icon: { ios: 'battery.50percent', android: 'battery_charging_full' },
    color: '#46A758',
    check: 'battery',
    steps: [
      {
        title: 'Check the live readings above',
        detail: 'Plug in your charger and watch the status change to "Charging". If it never does, the cable, adapter or port is the likely problem.',
      },
      {
        title: 'Try another cable and adapter',
        detail: 'Cables wear out, especially near the ends. Use an Apple or MFi-certified cable and a wall adapter rather than a computer USB port.',
      },
      {
        title: 'Clean the charging port',
        detail: 'Lint often builds up in the port. Look inside with a torch and gently remove debris with a wooden toothpick. Never use metal or liquid.',
      },
      {
        title: 'Check what is using battery',
        detail: 'Settings > Battery shows which apps used the most battery. Close or limit apps that use a lot in the background.',
      },
      {
        title: 'Check battery health',
        detail: 'iPhone: Settings > Battery > Battery Health & Charging. Below 80% maximum capacity means the battery is worn and may need replacing.',
      },
      {
        title: 'Reduce battery use',
        detail: 'Lower screen brightness, turn on Low Power Mode when needed, and turn off Background App Refresh for apps that don\'t need it.',
      },
      {
        title: 'Avoid heat',
        detail: 'Charging pauses when the device is hot. Remove thick cases while charging and keep it out of direct sunlight.',
      },
      {
        title: 'Restart and update',
        detail: 'Restart the device, then check Settings > General > Software Update.',
      },
    ],
  },
  {
    id: 'sound',
    title: 'Sound & speaker',
    subtitle: 'No sound, low volume or muffled calls',
    icon: { ios: 'speaker.wave.2', android: 'volume_up' },
    color: '#D6409F',
    steps: [
      {
        title: 'Turn up the volume',
        detail: 'Press the volume up button, or drag the volume slider in Control Center. Make sure you are adjusting media volume, not just the ringer.',
      },
      {
        title: 'Check Silent Mode',
        detail: 'iPhone: check the Ring/Silent switch or Action button. iPad: open Control Center and make sure the bell icon is not crossed out.',
      },
      {
        title: 'Disconnect Bluetooth audio',
        detail: 'Sound may be going to headphones or a speaker. Open Control Center, tap the AirPlay icon on the music card and choose iPhone or iPad.',
      },
      {
        title: 'Turn off Do Not Disturb / Focus',
        detail: 'Open Control Center and tap Focus to turn it off. Focus modes silence calls and notifications.',
      },
      {
        title: 'Clean the speaker and microphone',
        detail: 'Gently brush the speaker and microphone holes with a soft, dry brush. Remove any case or screen protector that covers them.',
      },
      {
        title: 'Test the microphone',
        detail: 'Record a short Voice Memo, then play it back. If you can\'t hear yourself, the microphone or speaker may be faulty.',
      },
      {
        title: 'Restart and update',
        detail: 'Restart the device, then check Settings > General > Software Update.',
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps & App Store',
    subtitle: 'Apps crash or won\'t download or update',
    icon: { ios: 'app.badge', android: 'apps' },
    color: '#3E63DD',
    check: 'performance',
    steps: [
      {
        title: 'Close and reopen the app',
        detail: 'Swipe up from the bottom and pause, then swipe the app away. Open it again.',
      },
      {
        title: 'Update the app',
        detail: 'Open the App Store, tap your profile picture and pull down to refresh. Tap Update next to the app.',
      },
      {
        title: 'Check storage',
        detail: 'Apps can\'t download or update when storage is full. See the live reading above and free up space in Settings > General > Storage.',
      },
      {
        title: 'Check your internet',
        detail: 'Downloads need a working connection. Use the Wi-Fi guide if pages won\'t load.',
      },
      {
        title: 'Pause and resume a stuck download',
        detail: 'Press and hold the app icon on the Home Screen and choose Pause Download, then Resume Download.',
      },
      {
        title: 'Sign out of the App Store and back in',
        detail: 'App Store > profile picture > scroll down > Sign Out. Then sign in again with your Apple Account.',
      },
      {
        title: 'Delete and reinstall the app',
        detail: 'Press and hold the app > Remove App > Delete App, then download it again. Note: this may remove data that the app does not back up.',
      },
      {
        title: 'Check restrictions',
        detail: 'Settings > Screen Time > Content & Privacy Restrictions > iTunes & App Store Purchases — make sure installing apps is allowed. Work or school devices may block downloads.',
      },
    ],
  },
];

export function getIssue(id: string) {
  return ISSUES.find((issue) => issue.id === id);
}
