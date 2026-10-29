import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Button from "./ui/Button";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const rawName = user?.name || user?.username || user?.email || "";
  const displayName = rawName.trim() || "Guest";

  const avatarUrl =
    user?.avatar || `${FALLBACK_AVATAR}${encodeURIComponent(displayName)}`;

  const handleNavigate = () => {
    navigate("/adminProfile");
  };

  return (
    <Button
      type="button"
      shine={false}
      onClick={handleNavigate}
      aria-label={`View profile for ${displayName}`}
      className="hidden md:inline-flex h-10 items-center gap-2.5 px-3 rounded-xl border border-border-main bg-bg-main text-left font-normal cursor-pointer transition-colors hover:border-brand-active/50"
    >
      {/* Avatar Image */}
      <div className="w-7 h-7 rounded-full overflow-hidden border border-brand-active/30 flex items-center justify-center bg-card-bg shadow-xs shrink-0">
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

      {/* User Info */}
      <div className="flex flex-col pr-1 text-left">
        <span className="text-xs font-bold text-text-primary tracking-wide uppercase leading-none truncate max-w-[120px]">
          {displayName}
        </span>
        <span className="text-[10px] font-medium text-text-secondary leading-tight mt-1 capitalize">
          {user?.role ? user.role : "Guest"}
        </span>
      </div>
    </Button>
  );
}
