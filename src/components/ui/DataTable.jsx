
const DataTable = ({
    columns,
    data,
    keyField,
    onRowClick,
    emptyState,
    containerClassName = "",
    tableClassName = "",
    headerClassName = "",
    rowClassName = "",
}) => {
    if (!Array.isArray(columns)) {
        throw new TypeError("DataTable: columns must be an array.");
    }

    if (!Array.isArray(data)) {
        throw new TypeError("DataTable: data must be an array.");
    }

    if (typeof keyField !== "string" || !keyField.trim()) {
        throw new Error(
            "DataTable: keyField is required and must be a non-empty string."
        );
    }

    const isInteractive = typeof onRowClick === "function";

    const getAlignmentClass = (align) => {
        switch (align) {
            case "center":
                return "text-center";
            case "right":
                return "text-right";
            case "left":
            default:
                return "text-left";
        }
    };

    const getWidthStyle = (width) => {
        if (width === undefined || width === null || width === "") {
            return undefined;
        }

        return {
            width: typeof width === "number" ? `${width}px` : width,
        };
    };

    const getRowKey = (row, index) => {
        const value = row?.[keyField];

        if (value === undefined || value === null || value === "") {
            throw new Error(
                `DataTable: missing "${keyField}" for row at index ${index}.`
            );
        }

        return String(value);
    };

    const handleRowClick = (event, row) => {
        if (!isInteractive) return;

        const interactiveTarget = event.target.closest(
            "button, a, input, select, textarea, [data-interactive='true'], dialog, [role='button'], [role='checkbox'], [role='switch']"
        );

        if (interactiveTarget && interactiveTarget !== event.currentTarget) {
            return;
        }

        onRowClick(row);
    };

    const handleKeyDown = (event, row) => {
        if (!isInteractive) return;

        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        const interactiveTarget = event.target.closest(
            "button, a, input, select, textarea, [data-interactive='true'], dialog, [role='button'], [role='checkbox'], [role='switch']"
        );

        if (interactiveTarget && interactiveTarget !== event.currentTarget) {
            return;
        }

        event.preventDefault();
        onRowClick(row);
    };

    const hasData = data.length > 0;

    // Validate keys before rendering so missing or duplicate keys
    // cannot silently fall back to unstable array indices.
    const rowKeys = new Set();

    if (hasData) {
        data.forEach((row, index) => {
            const rowKey = getRowKey(row, index);

            if (rowKeys.has(rowKey)) {
                throw new Error(
                    `DataTable: duplicate "${keyField}" value "${rowKey}".`
                );
            }

            rowKeys.add(rowKey);
        });
    }

    return (
        <div
            className={`w-full overflow-hidden rounded-2xl border border-border-main bg-card-bg shadow-sm ${containerClassName}`.trim()}
        >
            <div className="w-full overflow-x-auto">
                <table
                    className={`w-full min-w-[700px] border-collapse text-left ${tableClassName}`.trim()}
                >
                    <thead className="border-b border-border-main bg-input-bg text-text-secondary">
                        <tr className={headerClassName}>
                            {columns.map((column) => {
                                const alignClass = getAlignmentClass(column.align);

                                return (
                                    <th
                                        key={column.key}
                                        scope="col"
                                        style={getWidthStyle(column.width)}
                                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary ${alignClass} ${
                                            column.headerClassName || ""
                                        }`.trim()}
                                    >
                                        {column.header}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    {hasData ? (
                        <tbody className="divide-y divide-border-main">
                            {data.map((row, rowIndex) => {
                                const rowKey = getRowKey(row, rowIndex);

                                const customRowClass =
                                    typeof rowClassName === "function"
                                        ? rowClassName(row, rowIndex)
                                        : rowClassName;

                                const rowInteractiveClass = isInteractive
                                    ? "cursor-pointer transition-colors hover:bg-active-bg/50 focus:outline-none focus-visible:bg-active-bg/50 focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-inset"
                                    : "transition-colors hover:bg-input-bg/40";

                                return (
                                    <tr
                                        key={rowKey}
                                        tabIndex={isInteractive ? 0 : undefined}
                                        role={isInteractive ? "button" : undefined}
                                        onClick={(event) =>
                                            handleRowClick(event, row)
                                        }
                                        onKeyDown={(event) =>
                                            handleKeyDown(event, row)
                                        }
                                        className={`${rowInteractiveClass} ${customRowClass || ""}`.trim()}
                                    >
                                        {columns.map((column) => {
                                            const cellValue = row?.[column.key];

                                            const renderedContent = column.render
                                                ? column.render(
                                                      cellValue,
                                                      row,
                                                      rowIndex
                                                  )
                                                : cellValue ?? null;

                                            return (
                                                <td
                                                    key={column.key}
                                                    style={getWidthStyle(
                                                        column.width
                                                    )}
                                                    className={`px-6 py-4 text-sm text-text-primary ${getAlignmentClass(
                                                        column.align
                                                    )} ${
                                                        column.className || ""
                                                    }`.trim()}
                                                >
                                                    {renderedContent}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={columns.length || 1}
                                    className="px-6 py-12 text-center text-text-secondary"
                                >
                                    {emptyState ?? (
                                        <div className="flex flex-col items-center justify-center gap-1.5 py-4">
                                            <p className="text-sm font-semibold text-text-primary">
                                                No records found
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                There are no items matching the criteria.
                                            </p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default DataTable;
