"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";

import { useDebounce } from "../lib/debounce";

import styles from "./searchBar.module.css";
import { RecipeCategories } from "../models/Recipe";

let options = [
  { label: "Titre", value: "title" },
  { label: "Hashtag", value: "hashtags" },
];
for (const { name, value } of RecipeCategories) {
  options.push({ label: name, value: `cat_${value.toString()}` });
}

export function SearchBar() {
  const router = useRouter();

  const inputSearch = useRef<HTMLInputElement>(null);

  const [key, setKey] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  // Avoid extra requests to server on search
  const debouncedInputValue = useDebounce(key, 500);

  useEffect(() => {
    router.push(key ? `/?key=${key}&filters=${filters}` : "/");
  }, [debouncedInputValue, filters]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setKey(event.target.value);
  };

  const onIconClick = () => {
    if (key && inputSearch.current) {
      inputSearch.current.value = "";
      setKey("");
    }
  };

  const onSelectChange = (event: MultiSelectChangeEvent) => {
    event.preventDefault();
    setFilters(event.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <IconField iconPosition="left">
          <InputIcon
            className={`pi pi-${key ? "times" : "search"}`}
            onClick={onIconClick}
          />
          <InputText
            ref={inputSearch}
            onChange={onInputChange}
            placeholder="Rechercher..."
            style={{ width: "100%" }}
          />
        </IconField>
      </div>
      <div className={styles.searchBarFilter}>
        <MultiSelect
          style={{ maxWidth: "100%" }}
          placeholder="Filtres"
          value={filters}
          options={options}
          onChange={onSelectChange}
        />
      </div>
    </div>
  );
}
