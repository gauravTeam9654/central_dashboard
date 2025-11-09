import React, { useState } from 'react';
import type { Device } from '../types';
import { DeviceStatus } from '../types';
import { SummaryWidget } from './SummaryWidget';
import { DeviceCard } from './DeviceCard';

const TABS = [
    { key: 'fortigate_firewall', label: 'Fortigate Firewall' },
    { key: 'cisco_wireless', label: 'Cisco Wireless' },
  { key: 'meraki_switch', label: 'Meraki Switches' },
  { key: 'meraki_camera', label: 'Meraki Cameras' },
  { key: 'meraki_ap', label: 'Meraki Access Points' },
];

export const Dashboard: React.FC<{ allDevices: Device[] }> = ({ allDevices }) => {

  const [activeTab, setActiveTab] = useState('fortigate_firewall');

  const devices = allDevices.filter(d => d.category === activeTab);

  const onlineCount = devices.filter(d => d.status === DeviceStatus.ONLINE).length;
  const offlineCount = devices.filter(d => d.status === DeviceStatus.OFFLINE).length;
  const warningCount = devices.filter(d => d.status === DeviceStatus.WARNING).length;

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-700 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryWidget title="Total Devices" value={devices.length} />
        <SummaryWidget title="Online" value={onlineCount} />
        <SummaryWidget title="Offline" value={offlineCount} />
        <SummaryWidget title="Warnings" value={warningCount} />
      </div>

      {/* Device List */}
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {devices.map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-300">No Devices Found</h3>
          <p className="text-gray-500 mt-2">This category has no entries.</p>
        </div>
      )}
    </div>
  );
};
