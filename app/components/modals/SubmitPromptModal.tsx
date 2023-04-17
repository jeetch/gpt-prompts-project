"use client";

import { FC, useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputPrompt from "../inputs/InputPrompt";
import useSubmitPromptModal from "@/app/hooks/useSubmitPostModal";

enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
}

const SubmitPromptModal: FC = ({}) => {
  const router = useRouter();
  const submitPromptModal = useSubmitPromptModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      title: "",
      prompt: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/posts", data)
      .then(() => {
        toast.success("Prompt submitted successfully!", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#21374a",
            color: "#fff",
          },
        });
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        submitPromptModal.onClose();
      })
      .catch(() => {
        toast.success("Something went wrong ", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#21374a",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step == STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your prompt?"
        subtitle="Pick a category"
      />
      <div className=" flex flex-wrap justify-center items-center max-h-[50vh] overflow-y-auto gap-2 ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.DESCRIPTION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="What's your prompt?"
          subtitle="Give an appropriate title."
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <InputPrompt
          id="prompt"
          label="Prompt"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={submitPromptModal.isOpen}
      onClose={submitPromptModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title="Submit your prompt"
      body={bodyContent}
    />
  );
};

export default SubmitPromptModal;
