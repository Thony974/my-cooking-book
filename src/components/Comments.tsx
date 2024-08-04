"use client";

import { Rating, RatingChangeEvent } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";

import styles from "./comments.module.css";
import { updateRecipeMetaData } from "@/app/details/actions";

export interface CommentsProps {
  id: number;
  comments: string | null;
  rate: number;
}

export default function Comments({ id, comments, rate }: CommentsProps) {
  const [enabledComment, setCommentEnabled] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const inputTextRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setRatingValue(rate);
  }, [rate]);

  useEffect(() => {
    if (enabledComment) inputTextRef.current?.focus();
  }, [enabledComment]);

  const onSubmit = () => {
    if (enabledComment)
      updateRecipeMetaData(id, {
        rate: ratingValue,
        comments: inputTextRef.current?.value ?? "",
      });
    setCommentEnabled(!enabledComment);
  };

  const onRatingChanged = (event: RatingChangeEvent) => {
    const newRateValue = event.value ?? 0;
    updateRecipeMetaData(id, {
      rate: newRateValue,
      comments: inputTextRef.current?.value ?? "",
    });
    setRatingValue(newRateValue);
  };

  return (
    <div className={styles.commentsContainer}>
      <Rating value={ratingValue} onChange={onRatingChanged} />
      <InputTextarea
        ref={inputTextRef}
        className={styles.inputtextArea}
        disabled={!enabledComment}
        placeholder="Commentaires..."
        defaultValue={comments ?? ""}
      ></InputTextarea>
      <button onClick={onSubmit}>
        {enabledComment ? "Enregistrer" : "Editer"}
      </button>
    </div>
  );
}
