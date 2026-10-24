import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Authcontext";
import Button from "../../ui/Button";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=";

export default function SettingsProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const rawName = user?.name || user?.username || user?.email || "";
  const displayName = rawName.trim() || "ADMIN";
  const displayEmail = user?.email || "admin@koda.com";
  const avatarUrl =
    user?.avatar || `${FALLBACK_AVATAR}${encodeURIComponent(displayName)}`;

  const handleEditProfile = () => {
    navigate("/adminProfile");
  };

  return (
    <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 lg:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-5 sm:mb-6">
        Profile Information
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* User Info (derived from AuthContext, matching Header UserProfile) */}
        <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
          {/* Avatar Circle */}
          <div className="size-12 sm:size-14 rounded-full overflow-hidden border border-border-main flex items-center justify-center bg-card-bg shadow-xs shrink-0">
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${FALLBACK_AVATAR}${encodeURIComponent(displayName)}`;
              }}
            />
          </div>

          {/* User Name & Email */}
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold uppercase tracking-wide text-text-primary">
              {displayName}
            </span>
            <span className="truncate text-xs sm:text-[13px] font-medium text-text-secondary mt-0.5">
              {displayEmail}
            </span>
          </div>
        </div>

        {/* Edit Profile Action Button using shared Button component */}
        <Button
          onClick={handleEditProfile}
          className="rounded-xl border border-border-main bg-active-bg px-4 py-2 text-xs sm:text-sm font-semibold text-brand-active hover:bg-brand-active hover:text-bg-main shadow-xs self-start sm:self-center"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
