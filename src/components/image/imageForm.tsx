"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { postAssetUpload, postRecordImage } from "@/request/requests";
import { useState } from "react";
import { ImageShow } from "./imageShow";
import { v4 as  uuid } from 'uuid';

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".gif"];

type FileWrapper = {
    file: File;
    id: string;
}

type Props = {
  onSuccess?: (files: File[], uniqueId: string) => void;
};

export const ImageForm: React.FC<Props> = ({ onSuccess = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<{
    files: FileWrapper[];
    passwordRequired: boolean;
    password: string;
    prompt: string;
    expireIn: number;
  }>({
    defaultValues: {
      files: [],
      passwordRequired: false,
      password: "",
      prompt: "",
      expireIn: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        const uploadJson = await postAssetUpload(value.files.map(f => f.file));
        const postRecordJson = await postRecordImage({
          assetIds: uploadJson.data.assets,
          prompt: value.prompt,
          passwordRequired: value.passwordRequired,
          password: value.passwordRequired ? value.password : "",
          expireIn: value.expireIn,
        });
        onSuccess(value.files.map(f => f.file), postRecordJson.data.uniqueId);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  const passwordRequired = useStore(
    form.store,
    (state) => state.values.passwordRequired
  );

  const files = useStore(form.store, (state) => state.values.files);

  const onRemove = (id: string) => {
    form.setFieldValue(
        "files",
        files.filter((f) => f.id !== id)
      );
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className={`grid ${files.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 pb-8`}>
          {files.map((file) => (
            <div key={file.id}>
              <ImageShow
                file={file.file}
                onRemove={() => {
                    onRemove(file.id);
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-full max-w-xl flex flex-col gap-6  items-center">
          <div className="flex flex-col gap-4 w-full">
            <form.Field
              name="files"
              validators={{
                onChange: ({ value }) =>
                  value.length === 0 ? "Must upload less one file" : undefined,
              }}
              children={(field) => (
                <label className="mb-4 p-14 bg-foreground/20 w-full rounded-xl flex justify-center border-2 border-dashed border-foreground/50 cursor-pointer hover:opacity-80 transition">
                  <span className="font-medium text-base text-primary-foreground/60">
                    上傳圖片、影像
                  </span>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        const files = [...e.target.files];
                        field.handleChange([
                          ...field.state.value,
                          ...files.map(f => ({
                            file: f,
                            id: uuid()
                          })),
                        ]);
                      }
                    }}
                    type="file"
                    hidden
                    accept={allowedFileTypes.join(",")}
                    multiple
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </label>
              )}
            />
            <form.Field
              name="passwordRequired"
              children={(field) => (
                <div className="flex justify-start w-full">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(e) => {
                        if (typeof e === "boolean") {
                          field.handleChange(e);
                        }
                      }}
                    />
                    <span className="-mb-0.5 font-medium text-sm">
                      需要密碼
                    </span>
                  </label>
                </div>
              )}
            />
            {passwordRequired && (
              <form.Field
                name="password"
                children={(field) => (
                  <label className="flex flex-col w-full gap-2">
                    <span className="font-medium text-sm text-primary-foreground/60">
                      密碼
                    </span>
                    <Input
                      className="bg-primary-foreground text-black rounded-2xl"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </label>
                )}
              />
            )}
            <form.Field
              name="expireIn"
              children={(field) => (
                <label className="flex flex-col w-full gap-2">
                  <span className="font-medium text-sm text-primary-foreground/60">
                    有效日期
                  </span>
                  <Select
                    name={field.name}
                    value={`${field.state.value}`}
                    onValueChange={(v) => {
                      field.handleChange(Number(v));
                    }}
                  >
                    <SelectTrigger className="bg-primary-foreground text-black rounded-2xl">
                      <SelectValue placeholder="請輸入有效時間" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary-foreground text-black rounded-2xl">
                      <SelectItem className="rounded-xl" value="60">
                        60s
                      </SelectItem>
                      <SelectItem className="rounded-xl" value="120">
                        120s
                      </SelectItem>
                      <SelectItem className="rounded-xl" value="300">
                        300s
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              )}
            />
            <form.Field
              name="prompt"
              children={(field) => (
                <label className="flex flex-col w-full gap-2">
                  <span className="font-medium text-sm text-primary-foreground/60">
                    說明內容
                  </span>
                  <Input
                    className="bg-primary-foreground text-black rounded-2xl"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-44 rounded-2xl"
            disabled={isLoading}
          >
            {isLoading ? "上傳中.." : "上傳"}
          </Button>
        </div>
      </form>
    </div>
  );
};
