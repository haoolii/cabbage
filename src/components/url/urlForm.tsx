"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { postRecordUrl } from "@/request/requests";

type Props = {
    onSuccess: (uniqueId: string) => void;
};

export const UrlForm: React.FC<Props> = ({ onSuccess }) => {
  const form = useForm<{
    content: string;
  }>({
    defaultValues: {
      content: "",
    },
    onSubmit: async ({ value }) => {
      const json = await postRecordUrl(value.content);
      onSuccess(json.data.uniqueId);
    },
  });

  const submit = () => {};

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col items-center gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="content"
          children={(field) => (
            <Input
              value={field.state.value}
              className="bg-primary-foreground text-black rounded-2xl max-w-xl"
              onChange={(e) => {
                field.handleChange(e.target.value);
              }}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
             <Button type="submit" disabled={!canSubmit} className="w-44 rounded-2xl">{isSubmitting ? "送出中..." : "送出"}</Button>
          )}
        />
      </form>
    </div>
  );
};
