## 5. Forms — React Hook Form + Shadcn + Zod

### Install

```bash
npm install react-hook-form @hookform/resolvers zod
npx shadcn@latest add form input label button
```

### Architecture

The recommended pattern for Shadcn + React Hook Form in v4 uses:
- `useForm` for form state.
- `Controller` for every field (works with controlled Shadcn components).
- `<Field>` / `<FieldLabel>` / `<FieldError>` for accessible markup.
- Zod schema for validation (type-safe, colocated with the component).

### Step 1 — Reusable `<FormField>` component

This wrapper eliminates the repetitive `Controller` + `Field` + `FieldError` boilerplate that appears in every form field.

```tsx
// src/components/form/form-field.tsx
"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
  render: (props: {
    field: Parameters<
      Parameters<typeof Controller<TFieldValues, TName>>[0]["render"]
    >[0]["field"];
    fieldState: Parameters<
      Parameters<typeof Controller<TFieldValues, TName>>[0]["render"]
    >[0]["fieldState"];
  }) => React.ReactNode;
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  render,
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          )}
          {render({ field, fieldState })}
          {description && !fieldState.invalid && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
```

### Step 2 — A complete reusable form example

```tsx
// src/components/forms/profile-form.tsx
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/form/form-field";

/* ─── 1. Schema — colocated with the form ─────────────────────────────────── */
const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters.")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores."),
  bio: z
    .string()
    .max(160, "Bio must be at most 160 characters.")
    .optional(),
  role: z.enum(["developer", "designer", "manager"], {
    required_error: "Please select a role.",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/* ─── 2. Props ────────────────────────────────────────────────────────────── */
interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormValues>;
  onSuccess?: (data: ProfileFormValues) => void;
}

/* ─── 3. Component ────────────────────────────────────────────────────────── */
export function ProfileForm({ defaultValues, onSuccess }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      bio: "",
      ...defaultValues,
    },
    /*
      "onBlur" is a good default for production forms:
      - Validates after the user leaves a field (less disruptive than onChange).
      - Re-validates on change after the first error (fast feedback on fix).
    */
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Replace with your API call
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Profile updated successfully.");
      onSuccess?.(data);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your public profile information.</CardDescription>
      </CardHeader>

      <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <FieldGroup>
            {/* ── Text Input ─────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="username"
              label="Username"
              description="Your public display name."
              required
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id={field.name}
                  placeholder="john_doe"
                  autoComplete="username"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />

            {/* ── Textarea ───────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="bio"
              label="Bio"
              description="Tell the world about yourself."
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="I'm a software engineer..."
                  className="resize-none min-h-[100px]"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />

            {/* ── Select ─────────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="role"
              label="Role"
              required
              render={({ field, fieldState }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" form="profile-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

### Validation modes reference

| Mode        | When it validates                | Best for                          |
| ----------- | -------------------------------- | --------------------------------- |
| `onSubmit`  | On submit only (default)         | Short / simple forms              |
| `onBlur`    | When user leaves a field         | Most production forms ✅           |
| `onChange`  | On every keystroke               | Password strength meters          |
| `onTouched` | First blur, then on every change | Long multi-step forms             |
| `all`       | Both blur and change             | High-stakes forms (payment, auth) |

### Server Actions integration

If submitting to a Next.js Server Action, add `action` alongside `onSubmit`:

```tsx
// src/app/actions/profile.ts
"use server";
import { profileSchema } from "@/lib/schemas/profile";

export async function updateProfile(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  // ... database update
  return { success: true };
}
```

```tsx
// In the form component
import { updateProfile } from "@/app/actions/profile";

async function onSubmit(data: ProfileFormValues) {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => formData.append(k, v ?? ""));
  const result = await updateProfile(formData);
  if (result.error) {
    // Set server errors back into RHF
    Object.entries(result.error).forEach(([field, messages]) => {
      form.setError(field as keyof ProfileFormValues, {
        message: messages?.[0],
      });
    });
  }
}
```

---
