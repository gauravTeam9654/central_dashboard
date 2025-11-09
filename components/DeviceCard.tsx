import React from 'react';
import type { Device, FortigateFirewall, CiscoAP, MerakiSwitch, MerakiAP, MerakiCamera, GenericRouter } from '../types';
import { DeviceStatus, DeviceType } from '../types';
import { TrafficChart } from './TrafficChart';
import { StatusIndicator } from './StatusIndicator';
import { FortigateIcon, CiscoIcon, MerakiIcon, RouterIcon, CameraIcon, ServerIcon, WifiIcon, SwitchIcon } from './Icons';

const DeviceTypeIcon: React.FC<{ type: DeviceType }> = ({ type }) => {
    const iconClass = "h-7 w-7 text-gray-400";
    switch (type) {
        case DeviceType.FORTIGATE_FIREWALL:
            return <FortigateIcon className={iconClass} />;
        case DeviceType.CISCO_AP:
            return <CiscoIcon className={iconClass} />;
        case DeviceType.MERAKI_SWITCH:
            return <MerakiIcon className={iconClass} />;
        case DeviceType.MERAKI_AP:
            return <MerakiIcon className={iconClass} />;
        case DeviceType.MERAKI_CAMERA:
            return <CameraIcon className={iconClass} />;
        case DeviceType.ROUTER:
            return <RouterIcon className={iconClass} />;
        default:
            return <ServerIcon className={iconClass}/>;
    }
};

const ResourceBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div>
        <div className="flex justify-between text-xs text-gray-400">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value?: string | React.ReactNode; mono?: boolean }> = ({ label, value, mono = false }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className={`${mono ? 'font-mono' : ''} text-white text-right`}>{value || 'N/A'}</span>
    </div>
);

const DeviceSpecificDetails: React.FC<{ device: Device }> = ({ device }) => {
    const renderDetails = () => {
        switch (device.type) {
            case DeviceType.FORTIGATE_FIREWALL:
                const fw = device as FortigateFirewall;
                return <>
                    <DetailItem label="Firmware" value={fw.firmwareVersion} />
                    <DetailItem label="Config Status" value={fw.configStatus} />
                    <DetailItem label="HA Status" value={fw.haStatus} />
                    <DetailItem label="Host Name" value={fw.Hostname} />

                </>;
            case DeviceType.CISCO_AP:
                const ap = device as CiscoAP;
                return <>
                    <DetailItem label="Admin Status" value={ap.adminStatus} />
                    <DetailItem label="Uptime" value={ap.upTime} />
                    <DetailItem label="Site Tag" value={ap.siteTag} />
                    <DetailItem label="Policy Tag" value={ap.policyTag} />
                    {/* <DetailItem label="" value={ap.policyTag} /> */}


                </>;
            case DeviceType.MERAKI_SWITCH:
                 const sw = device as MerakiSwitch;
                 return <>
                    <DetailItem label="Public IP" value={sw.publicIp} mono/>
                    <DetailItem label="Local IP" value={sw.localIp} mono/>
                    <DetailItem label="Cloud IP" value={sw.cloudId} mono/>
                 </>
            case DeviceType.MERAKI_AP:
                 const map = device as MerakiAP;
                 return <>
                    <DetailItem label="Local IP" value={map.localIp} mono/>
                 </>
            case DeviceType.MERAKI_CAMERA:
                 return <DetailItem label="Vendor" value="Meraki" />;
            case DeviceType.ROUTER:
                 return <DetailItem label="Vendor" value="Generic" />;
            default:
                return null;
        }
    }
    
    return (
        <div className="text-sm space-y-2 border-t border-gray-700 pt-4 mt-4">
           {renderDetails()}
        </div>
    );
};

export const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
    const hasResources = 'cpuUsage' in device && 'memoryUsage' in device;
    const hasTraffic = 'trafficHistory' in device && device.trafficHistory.length > 0;

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <DeviceTypeIcon type={device.type} />
                        <div>
                            <p className="font-bold text-white leading-tight">{device.name}</p>
                            <p className="text-xs text-gray-500">{device.model}</p>
                        </div>
                    </div>
                    <StatusIndicator status={device.status} />
                </div>
            </div>

            <div className="px-5 pb-5 flex-grow">
                 <div className="text-sm space-y-2">
                    {device.ipAddress && <DetailItem label="IP Address" value={device.ipAddress} mono />}
                    <DetailItem label="MAC Address" value={device.macAddress} mono />
                    <DetailItem label="Serial" value={device.serialNumber} mono />
                    {/* <DetailItem label="EtherNet MAC" value={device.ethernetMacAddress} mono /> */}
                 </div>

                 <DeviceSpecificDetails device={device} />

                 {hasResources && (
                    <div className="space-y-3 pt-4 mt-4 border-t border-gray-700">
                        <ResourceBar label="CPU Usage" value={(device as GenericRouter).cpuUsage} />
                        <ResourceBar label="Memory Usage" value={(device as GenericRouter).memoryUsage} />
                    </div>
                 )}
            </div>

            {hasTraffic && (
                <div className="h-28 w-full mt-auto">
                    <TrafficChart data={(device as GenericRouter).trafficHistory} />
                </div>
            )}
        </div>
    );
};