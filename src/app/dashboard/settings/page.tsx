"use client";
import SecuritySection from '@/components/dashboard/settings/security-section';
import PersonalProfileSection from '@/components/dashboard/settings/personal-context/personal-profile-sections';

export default function ProfileSettings() {

    return (
        <div className="p-11 space-y-6">
            <PersonalProfileSection />

            <SecuritySection />
        </div>
    );
}