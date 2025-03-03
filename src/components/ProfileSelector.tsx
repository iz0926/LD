import React from 'react';
import { UserCircle2 } from 'lucide-react';
import type { Profile } from '../App';

interface ProfileSelectorProps {
  profiles: Profile[];
  currentProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  currentProfile,
  onSelectProfile,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {currentProfile && (
        <div className="flex items-center space-x-2">
          <UserCircle2 
            className="h-6 w-6"
            style={{ color: currentProfile.color }}
          />
          <span className="font-medium" style={{ color: currentProfile.color }}>
            {currentProfile.name}
          </span>
        </div>
      )}
      <select
        value={currentProfile?.id || ''}
        onChange={(e) => {
          const profile = profiles.find(p => p.id === e.target.value);
          if (profile) onSelectProfile(profile);
        }}
        className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Profile</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfileSelector;