import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { User, Camera, X, UserPen } from "lucide-react";

const defaultSampleUser = {
  username: "CUSTOMER",
  email: "customer@koda.com",
  phone: "+1 234 567 890",
  role: "customer",
};

const EditUserModal = ({ isOpen = false, onClose, user = defaultSampleUser }) => {
  if (!isOpen) return null;

  const currentUser = { ...defaultSampleUser, ...user };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg rounded-2xl border border-border-main bg-card-bg shadow-xl overflow-hidden">
        {/* Header with Warm Tint */}
        <div className="flex items-center justify-between border-b border-border-main/60 bg-active-bg/50 p-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-xs">
              <UserPen className="size-5" />
            </div>
            <div>
              <h2
                id="edit-user-modal-title"
                className="text-base sm:text-lg font-bold tracking-tight text-text-primary"
              >
                Edit User
              </h2>
              <p className="text-xs text-text-secondary">
                Update account information and profile details
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-card-bg hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={(e) => e.preventDefault()} className="p-4 sm:p-6 space-y-4">
          {/* Avatar / Profile Image Section */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-input-bg/40 border border-border-main/50">
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-input-bg border border-border-main text-text-secondary">
              <User className="size-7" />
              <button
                type="button"
                aria-label="Change avatar"
                className="absolute -bottom-1 -end-1 flex size-6 items-center justify-center rounded-full bg-brand-active text-bg-main shadow-xs hover:bg-brand-hover transition-colors cursor-pointer"
              >
                <Camera size={12} />
              </button>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                Profile Picture
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                PNG, JPG or WEBP up to 2MB
              </p>
            </div>
          </div>

          {/* Username Field */}
          <Input
            id="edit-user-username"
            label="USERNAME"
            defaultValue={currentUser.username}
            placeholder="e.g. john_doe"
            className="h-11 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
          />

          {/* Email Field */}
          <Input
            id="edit-user-email"
            type="email"
            label="EMAIL"
            defaultValue={currentUser.email}
            placeholder="e.g. john@email.com"
            className="h-11 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
          />

          {/* Phone Field */}
          <Input
            id="edit-user-phone"
            type="tel"
            label="PHONE"
            defaultValue={currentUser.phone}
            placeholder="e.g. +1 234 567 890"
            className="h-11 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
          />

          {/* Subtle Horizontal Divider */}
          <div className="pt-2">
            <div className="h-px w-full bg-border-main/60" />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              shine={false}
              className="h-10 rounded-xl border border-border-main bg-card-bg px-4 text-sm font-semibold text-text-secondary hover:bg-input-bg transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-xl bg-brand-active px-5 text-sm font-bold text-bg-main hover:bg-brand-hover shadow-sm"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
