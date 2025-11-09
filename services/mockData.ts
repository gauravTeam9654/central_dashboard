import { 
    Device, 
    DeviceStatus, 
    DeviceType, 
    TrafficDataPoint, 
    FortigateFirewall, 
    CiscoAP, 
    MerakiSwitch, 
    MerakiAP, 
    MerakiCamera 
} from '../types';

const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomMAC = () => 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)));
const randomSerial = () => 'SN' + Math.random().toString(36).substring(2, 10).toUpperCase();

const generateTrafficHistory = (): TrafficDataPoint[] => {
    const data: TrafficDataPoint[] = [];
    for (let i = 9; i >= 0; i--) {
        data.push({
            time: `${i * 5}m ago`,
            upload: parseFloat((Math.random() * 100).toFixed(2)),
            download: parseFloat((Math.random() * 500).toFixed(2)),
        });
    }
    return data;
};

/* --------------------- FORTIGATE FIREWALL --------------------- */
const generateFortigate = (id: string): FortigateFirewall => ({
    id,
    category: 'fortigate_firewall',
    name: `HQ-FW-${randomInt(1, 5)}`,
    type: DeviceType.FORTIGATE_FIREWALL,
    status: randomElement([DeviceStatus.ONLINE, DeviceStatus.OFFLINE, DeviceStatus.WARNING]),
    model: randomElement(['FortiGate 60F', 'FortiGate 100F', 'FortiGate 200F']),
    ipAddress: `10.1.1.${randomInt(1, 254)}`,
    macAddress: randomMAC(),
    serialNumber: randomSerial(),
    configStatus: randomElement(['In Sync', 'Out of Sync']),
    haStatus: randomElement(['Standalone', 'Active-Passive']),
    firmwareVersion: `v7.${randomInt(0, 4)}.${randomInt(1, 9)}`,
    policyPackageStatus: randomElement(['In Sync', 'Never Installed']),
    fortiGuardLicense: randomElement(['Valid', 'Expired']),
    cpuUsage: randomInt(5, 90),
    memoryUsage: randomInt(10, 80),
    trafficHistory: generateTrafficHistory(),
    Hostname: `fortigate-fw-${randomInt(1,5)}`
});

/* --------------------- CISCO ACCESS POINT --------------------- */
const generateCiscoAP = (id: string): CiscoAP => ({
    id,
    category: 'cisco_wireless',
    name: `AP-${String.fromCharCode(65 + randomInt(0, 4))}${randomInt(10, 99)}`,
    type: DeviceType.CISCO_AP,
    status: randomElement([DeviceStatus.ONLINE, DeviceStatus.OFFLINE]),
    model: randomElement(['Catalyst 9120AXI', 'Catalyst 9130AXI', 'Aironet 2802I']),
    ipAddress: `192.168.${randomInt(10, 20)}.${randomInt(1, 254)}`,
    macAddress: randomMAC(),
    ethernetMacAddress: randomMAC(),
    serialNumber: randomSerial(),
    adminStatus: randomElement(['Enabled', 'Disabled']),
    operationStatus: 'Up',
    upTime: `${randomInt(1, 30)}d ${randomInt(0, 23)}h ${randomInt(0, 59)}m`,
    policyTag: 'default-policy',
    siteTag: `site-${String.fromCharCode(65 + randomInt(0, 4))}`,
    rfTag: 'default-rf',
    cpuUsage: randomInt(5, 60),
    memoryUsage: randomInt(10, 70),
    trafficHistory: generateTrafficHistory(),
});

/* --------------------- MERAKI SWITCH --------------------- */
const generateMerakiSwitch = (id: string): MerakiSwitch => ({
    id,
    category: 'meraki_switch',
    name: `MS-Lobby-${randomInt(1, 3)}`,
    type: DeviceType.MERAKI_SWITCH,
    status: randomElement([DeviceStatus.CONNECTED, DeviceStatus.DISCONNECTED]),
    model: randomElement(['MS225-48LP', 'MS350-24P', 'MS120-8FP']),
    macAddress: randomMAC(),
    serialNumber: randomSerial(),
    publicIp: `${randomInt(20, 200)}.${randomInt(20, 200)}.${randomInt(20, 200)}.${randomInt(20, 200)}`,
    // cloud_ID : `Q2LW-9BT6-BW9D`,
    localIp: `192.168.0.${randomInt(2, 254)}`,
    cloudId: `meraki-cloud-${randomInt(1000, 9999)}`,
    connectivity: new Date(Date.now() - randomInt(1000, 3600000)).toISOString(),
});

/* --------------------- MERAKI AP --------------------- */
const generateMerakiAP = (id: string): MerakiAP => ({
    id,
    category: 'meraki_ap',
    name: `MR-Floor${randomInt(1, 5)}-${randomInt(1, 10)}`,
    type: DeviceType.MERAKI_AP,
    status: randomElement([DeviceStatus.CONNECTED, DeviceStatus.DISCONNECTED]),
    model: randomElement(['MR56', 'MR46', 'MR36']),
    macAddress: randomMAC(),
    serialNumber: randomSerial(),
    localIp: `192.168.${randomInt(1, 5)}.${randomInt(2, 254)}`,
    connectivity: new Date(Date.now() - randomInt(1000, 3600000)).toISOString(),
});

/* --------------------- MERAKI CAMERA --------------------- */
const generateMerakiCamera = (id: string): MerakiCamera => ({
    id,
    category: 'meraki_camera',
    name: `MV-Entrance-${randomInt(1, 2)}`,
    type: DeviceType.MERAKI_CAMERA,
    status: randomElement([DeviceStatus.CONNECTED, DeviceStatus.DISCONNECTED]),
    model: randomElement(['MV12', 'MV22', 'MV72']),
    macAddress: randomMAC(),
    serialNumber: randomSerial(),
});

/* -------------------- GENERATOR LIST -------------------- */
const generators = [
    generateFortigate,
    generateCiscoAP,
    generateMerakiSwitch,
    generateMerakiAP,
    generateMerakiCamera,
];

/* -------------------- EXPORT FUNCTION -------------------- */
export const generateMockDevices = (count: number): Device[] => {
    const devices: Device[] = [];
    for (let i = 0; i < count; i++) {
        const randomGenerator = randomElement(generators);
        devices.push(randomGenerator(`dev-${i + 1}`));
    }
    return devices;
};
