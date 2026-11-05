"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  File01Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type UploadStatus = "pending" | "uploading" | "done" | "error";

/** A file in the list: the chosen file, its upload progress and any error. */
type UploadFile = {
  id: string;
  name: string;
  /** Size in bytes. */
  size: number;
  status?: UploadStatus;
  /** 0 to 100, shown while `status` is `uploading`. */
  progress?: number;
  /** Shown instead of the size when `status` is `error`. */
  error?: string;
  /** The browser `File`, for files the user added. */
  file?: File;
};

type RejectReason = "type" | "size" | "count";

type FileValidation = {
  accepted: File[];
  rejected: { file: File; reason: RejectReason }[];
};

type ValidateOptions = {
  /** Same format as the `accept` attribute: `.pdf,image/*,application/pdf`. */
  accept?: string;
  /** Largest size in bytes. */
  maxSize?: number;
  /** Most files allowed in the list, counting the ones already in it. */
  maxFiles?: number;
  /** Files already in the list. */
  currentCount?: number;
};

/** True if the file matches an `accept` string (extensions, MIME types and `image/*`). */
function acceptsFile(file: Pick<File, "name" | "type">, accept?: string) {
  const tokens = (accept ?? "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

/** Splits chosen files into the ones the list accepts and the ones it rejects, with the reason. */
function validateFiles(files: File[], options: ValidateOptions = {}): FileValidation {
  const { accept, maxSize, maxFiles, currentCount = 0 } = options;
  const result: FileValidation = { accepted: [], rejected: [] };
  for (const file of files) {
    if (!acceptsFile(file, accept)) result.rejected.push({ file, reason: "type" });
    else if (maxSize !== undefined && file.size > maxSize)
      result.rejected.push({ file, reason: "size" });
    else if (maxFiles !== undefined && currentCount + result.accepted.length >= maxFiles)
      result.rejected.push({ file, reason: "count" });
    else result.accepted.push(file);
  }
  return result;
}

/** `1536` → `1.5 KB`. Sizes are technical values, so the digits are always Western. */
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value >= 10 ? Math.round(value) : Math.round(value * 10) / 10} ${units[unit]}`;
}

type FileUploadMessages = {
  /** Text of the drop zone while nothing is dragged over it. */
  drop: string;
  /** Text of the drop zone while files are dragged over it. */
  dropping: string;
  /** Names the remove button of one file. */
  remove: (name: string) => string;
  /** Status text of a finished file. */
  done: string;
  /** Status text while a file uploads. */
  uploading: string;
  /** Error text for a file that was rejected, by reason. */
  rejected: Record<RejectReason, string>;
};

const defaultMessages: FileUploadMessages = {
  drop: "Drag files here, or choose files",
  dropping: "Drop the files to add them",
  remove: (name) => `Remove ${name}`,
  done: "Uploaded",
  uploading: "Uploading",
  rejected: {
    type: "This file type is not accepted.",
    size: "This file is too large.",
    count: "Too many files.",
  },
};

let counter = 0;
const nextId = () => `upload-${Date.now().toString(36)}-${counter++}`;

type FileUploadProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> & {
  /** The files in the list (controlled). Update `status` and `progress` as uploads run. */
  files?: UploadFile[];
  /** The files the list starts with (uncontrolled). */
  defaultFiles?: UploadFile[];
  /** Called with the whole list whenever a file is added or removed. */
  onFilesChange?: (files: UploadFile[]) => void;
  /** Called with the files that passed validation, so you can start uploading them. */
  onFilesAdded?: (files: UploadFile[]) => void;
  /** Largest size per file, in bytes. */
  maxSize?: number;
  /** Most files in the list. `multiple` defaults to `true` when this is above 1. */
  maxFiles?: number;
  /** Shows the accepted formats and size under the drop zone. */
  hint?: React.ReactNode;
  /** Text for the drop zone, upload statuses and errors. Translate it on Arabic pages. */
  messages?: Partial<FileUploadMessages>;
};

/**
 * A drop zone and the list of chosen files. The drop zone is a real file input, so it works
 * with the keyboard (Tab, then Space or Enter) and with drag and drop. Files that fail
 * validation stay in the list with their error. Label it with a Field.
 */
function FileUpload({
  className,
  files: filesProp,
  defaultFiles = [],
  onFilesChange,
  onFilesAdded,
  accept,
  maxSize,
  maxFiles,
  multiple,
  hint,
  messages: messagesProp,
  disabled,
  ...props
}: FileUploadProps) {
  const messages = { ...defaultMessages, ...messagesProp };
  const allowMany = multiple ?? (maxFiles === undefined || maxFiles > 1);
  const [internal, setInternal] = React.useState(defaultFiles);
  const files = filesProp ?? internal;
  const [dragging, setDragging] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const hintId = React.useId();
  const depth = React.useRef(0);

  const commit = (next: UploadFile[]) => {
    if (filesProp === undefined) setInternal(next);
    onFilesChange?.(next);
  };

  const add = (chosen: File[]) => {
    if (chosen.length === 0 || disabled) return;
    const candidates = allowMany ? chosen : chosen.slice(0, 1);
    const { accepted, rejected } = validateFiles(candidates, {
      accept,
      maxSize,
      maxFiles: allowMany ? maxFiles : 1,
      currentCount: allowMany ? files.filter((f) => f.status !== "error").length : 0,
    });
    const added = accepted.map(
      (file): UploadFile => ({
        id: nextId(),
        name: file.name,
        size: file.size,
        status: "pending",
        file,
      }),
    );
    const failed = rejected.map(
      ({ file, reason }): UploadFile => ({
        id: nextId(),
        name: file.name,
        size: file.size,
        status: "error",
        error: messages.rejected[reason],
        file,
      }),
    );
    commit(allowMany ? [...files, ...added, ...failed] : [...added, ...failed]);
    if (added.length > 0) onFilesAdded?.(added);
    setAnnouncement(failed.map((f) => `${f.name}: ${f.error}`).join(" "));
  };

  const remove = (id: string) => {
    commit(files.filter((f) => f.id !== id));
    setAnnouncement("");
  };

  return (
    <div
      data-slot="file-upload"
      className={cn("flex w-full min-w-0 flex-col gap-2", className)}
      data-disabled={disabled ? "" : undefined}
    >
      {/* biome-ignore lint/a11y/noLabelWithoutControl: the file input is inside this label */}
      <label
        data-slot="file-upload-drop"
        data-drag-over={dragging ? "" : undefined}
        className="relative flex min-h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-field-border-default bg-field-background-default px-4 py-6 text-center text-sm text-text-default transition-colors hover:border-field-border-hovered hover:bg-background-neutral-50 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-solid has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-border-black data-drag-over:border-2 data-drag-over:border-solid data-drag-over:border-border-primary data-drag-over:bg-background-primary-50 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-border-disabled has-[input:disabled]:bg-field-background-default has-[input:disabled]:text-text-default-disabled has-[input:disabled]:hover:bg-field-background-default has-[[aria-invalid=true]]:border-field-border-error motion-reduce:transition-none"
        onDragEnter={(event) => {
          event.preventDefault();
          depth.current++;
          if (!disabled) setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => {
          depth.current = Math.max(0, depth.current - 1);
          if (depth.current === 0) setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          depth.current = 0;
          setDragging(false);
          add([...event.dataTransfer.files]);
        }}
      >
        <FieldPrimitive.Control
          render={<input type="file" />}
          className="sr-only"
          accept={accept}
          multiple={allowMany}
          disabled={disabled}
          aria-describedby={hint ? hintId : undefined}
          onChange={(event) => {
            add([...(event.currentTarget.files ?? [])]);
            // Clear the input so choosing the same file again fires change.
            event.currentTarget.value = "";
          }}
          {...(props as Record<string, unknown>)}
        />
        <HugeiconsIcon icon={Upload04Icon} aria-hidden className="size-8 text-icon-primary [:has(input:disabled)>&]:text-icon-default-disabled" />
        <span className="font-medium">{dragging ? messages.dropping : messages.drop}</span>
      </label>
      {hint ? (
        <p id={hintId} className="m-0 text-sm text-field-text-helper">
          {hint}
        </p>
      ) : null}
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
      {files.length > 0 ? (
        <ul data-slot="file-upload-list" className="m-0 flex list-none flex-col gap-2 p-0">
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              messages={messages}
              onRemove={() => remove(file.id)}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FileRow({
  file,
  messages,
  onRemove,
}: {
  file: UploadFile;
  messages: FileUploadMessages;
  onRemove: () => void;
}) {
  const status = file.status ?? "done";
  const progress = Math.min(100, Math.max(0, file.progress ?? 0));
  return (
    <li data-slot="file-upload-item" data-status={status} className="flex items-center gap-3 rounded-sm border border-border-neutral-primary bg-background-card p-3 data-[status=error]:border-field-border-error">
      <HugeiconsIcon
        icon={status === "error" ? AlertCircleIcon : File01Icon}
        aria-hidden
        className="size-6 shrink-0 text-icon-default-500 in-data-[status=error]:text-icon-error"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* The name keeps its own direction: Arabic names read right to left, "report.pdf" left to right. */}
        <p className="m-0 truncate text-start text-sm font-medium text-text-default" dir="auto" title={file.name}>
          <bdi>{file.name}</bdi>
        </p>
        {status === "error" ? (
          <p className="m-0 flex items-center gap-2 text-xs text-field-text-helper text-text-error">{file.error ?? messages.rejected.type}</p>
        ) : status === "uploading" ? (
          <div className="flex items-center gap-2">
            <div
              role="progressbar"
              aria-label={`${messages.uploading}: ${file.name}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="h-2 flex-1 overflow-hidden rounded-full bg-background-neutral-200"
            >
              <div className="h-full rounded-full bg-icon-primary transition-[inline-size] motion-reduce:transition-none" style={{ inlineSize: `${progress}%` }} />
            </div>
            <span dir="ltr" className="m-0 flex items-center gap-2 text-xs text-field-text-helper">
              {progress}%
            </span>
          </div>
        ) : (
          <p className="m-0 flex items-center gap-2 text-xs text-field-text-helper">
            <span dir="ltr">{formatBytes(file.size)}</span>
            {status === "done" ? (
              <span className="inline-flex items-center gap-1 text-text-success [&_svg]:size-4 [&_svg]:text-icon-success">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} aria-hidden />
                {messages.done}
              </span>
            ) : null}
          </p>
        )}
      </div>
      <button
        type="button"
        data-slot="file-upload-remove"
        aria-label={messages.remove(file.name)}
        className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm text-icon-default transition-colors [&_svg]:size-5 hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black"
        onClick={onRemove}
      >
        <HugeiconsIcon icon={Delete02Icon} aria-hidden />
      </button>
    </li>
  );
}

export type { FileUploadMessages, FileUploadProps, FileValidation, RejectReason, UploadFile };
export { acceptsFile, FileUpload, formatBytes, validateFiles };
