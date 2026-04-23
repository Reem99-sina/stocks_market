"use client";

import { MarketStock } from "@/types/comapny";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { usePaymetStock } from "@/action/userStock";
import { handleApiRequest } from "@/lib/apiHandle";
import { redirect } from "next/navigation";

type FormData = {
  quantity: number;

};

export function AddModelProtfolio({
  stock,
  onClose
}: {
  stock: MarketStock | null;
  onClose: () => void;
}) {
  const { mutateAsync } = usePaymetStock();
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (stock) {
      const result = await handleApiRequest(() =>
        mutateAsync({
          stock,
          quantity: data.quantity,
        }),
      );

      console.log(result, "result");
      if (!result) return;
      reset();
      onClose();
      redirect(result.url);
    }
  };

  return (
    <Dialog
      open={!!stock}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {stock?.name} ({stock?.symbol})
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter quantity to add</p>

          <input
            type="number"
            min={1}
            {...register("quantity", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
            className="w-full border rounded px-3 py-2"
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>

            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
