import { useMemo } from "react";
import DataTable from "../../ui/DataTable";
import Button from "../../ui/Button";
import { User, CheckCircle2, XCircle, Pencil, Shield, Trash2 } from "lucide-react";



const UsersTable = ({ users , setSelectedUser, handleDeleteUser, handleChangeRole }) => {
  const columns = useMemo(
    () => [
      {
        key: "user",
        header: "User",
        render: (_, row) => (
          <div className="flex items-center gap-3">
            <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-input-bg border border-border-main text-text-secondary">
              <User className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-text-primary text-sm tracking-tight truncate">
                {row.username}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {row.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        header: "Role",
        render: (role) => {
          const isRoleAdmin = String(role).toLowerCase() === "admin";
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${
                isRoleAdmin
                  ? "border-brand-active/20 bg-active-bg text-brand-active"
                  : "border-border-main bg-input-bg/70 text-text-secondary"
              }`}
            >
              {role}
            </span>
          );
        },
      },
      {
        key: "isVerified",
        header: "Verified",
        render: (isVerified) =>
          isVerified ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-status-success">
              <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
              <span>Verified</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-status-danger">
              <XCircle className="size-4 shrink-0" aria-hidden="true" />
              <span>No</span>
            </span>
          ),
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        render: (_, row) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              shine={false}
              aria-label={`Edit ${row.username}`}
              title="Edit user"
              onClick={() => setSelectedUser(row)}
              className="size-8 p-0 rounded-lg border border-status-info/20 bg-status-info/10 text-status-info hover:bg-status-info/20 shadow-none"
            >
              <Pencil size={14} />
            </Button>
            <Button
              type="button"
              shine={false}
              aria-label={`Change role for ${row.username}`}
              title="Change role"
              onClick={() => handleChangeRole(row)}
              className="size-8 p-0 rounded-lg border border-status-success/20 bg-status-success/10 text-status-success hover:bg-status-success/20 shadow-none"
            >
              <Shield size={14} />
            </Button>
            <Button
              type="button"
              shine={false}
              aria-label={`Delete ${row.username}`}
              title="Delete user"
              onClick={() => handleDeleteUser(row._id)}
              className="size-8 p-0 rounded-lg border border-status-danger/20 bg-status-danger/10 text-status-danger hover:bg-status-danger/20 shadow-none"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full p-5">
      <DataTable
        columns={columns}
        data={users}
        keyField="_id"
      />
    </div>
  );
};

export default UsersTable;
