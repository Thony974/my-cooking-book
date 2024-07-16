"use client";

import Link from "next/link";

import { deleteRecipe } from "../details/actions";

import styles from "./edition.module.css";

export interface EditionProps {
  id: number;
}

export default function Edition({ id }: EditionProps) {
  return (
    <div className={styles.edit}>
      <Link href={`/edit?id=${id}`}>Editer</Link>
      <Link href="/" onClick={() => deleteRecipe(id)}>
        Supprimer
      </Link>
    </div>
  );
}
