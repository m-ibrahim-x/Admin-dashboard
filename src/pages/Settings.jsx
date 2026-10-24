import SettingsProfile from "../components/pages/Settings/SettingsProfile";
import SettingsPreferences from "../components/pages/Settings/SettingsPreferences";
import SettingsSecurity from "../components/pages/Settings/SettingsSecurity";

const Settings = () => {
  return (
    <div className="space-y-4 p-5">
      <SettingsProfile />
      <SettingsPreferences />
      <SettingsSecurity />
    </div>
  );
};

export default Settings;
