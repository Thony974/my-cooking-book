"use client";

import { MouseEvent } from "react";

import Link from "next/link";

import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { deleteRecipe } from "../details/actions";

import styles from "./edition.module.css";

export interface EditionProps {
  id: number;
}

export default function Edition({ id }: EditionProps) {
  const onDeleteClick = (event: MouseEvent<HTMLSpanElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Etes-vous sûr de vouloir supprimer cette recette ?",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteRecipe(id),
    });
  };

  return (
    <div className={styles.edit}>
      <Link href={`/edit?id=${id}`}>Editer</Link>
      <span
        onClick={onDeleteClick}
        className={styles.delete} /**TODO add a classname for styled as edit */
      >
        Supprimer
      </span>
      <ConfirmPopup />
    </div>
  );
}
