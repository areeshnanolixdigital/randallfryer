"use client";

import { cn } from "@/utils/cn";

const baseField =
  "block w-full rounded-soft border border-ink/20 bg-bone/80 px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-ink-mute transition-colors duration-300 focus:border-ink focus:bg-bone focus:outline-none focus:ring-2 focus:ring-ink/20";

export function FormLabel({ htmlFor, children, optional = false, required = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80"
    >
      <span>{children}{required && <span className="text-signal"> *</span>}</span>
      {optional && (
        <span className="font-mono text-[9px] tracking-[0.22em] text-ink-mute">
          Optional
        </span>
      )}
    </label>
  );
}

export function FormField({
  id,
  name,
  label,
  type = "text",
  required = false,
  optional = false,
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={baseField}
        {...props}
      />
    </div>
  );
}

export function FormSelect({
  id,
  name,
  label,
  required = false,
  optional = false,
  options = [],
  defaultValue = "",
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className={cn(baseField, "appearance-none pr-12 cursor-pointer")}
          {...props}
        >
          <option value="" disabled hidden>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function FormTextarea({
  id,
  name,
  label,
  rows = 5,
  required = false,
  optional = false,
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={cn(baseField, "resize-y")}
        {...props}
      />
    </div>
  );
}

export function FormCheckbox({ id, name, label, defaultChecked = false }) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/80"
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-[5px] border border-ink/30 bg-bone transition-all duration-300 peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink/20"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="scale-0 text-bone transition-transform duration-300 peer-checked:scale-100 group-has-[input:checked]:scale-100"
        >
          <path
            d="M1 5l3 3 5-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}

export function FormFieldset({ legend, hint, children, className }) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      {legend && (
        <legend className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80">
          {legend}
        </legend>
      )}
      {hint && (
        <p className="-mt-1 text-sm leading-relaxed text-ink/65">{hint}</p>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}
