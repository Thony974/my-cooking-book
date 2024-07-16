"use client";
import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";

import "primereact/resources/themes/saga-green/theme.css";
import "primeicons/primeicons.css";

import styles from "./searchBar.module.css";

const options = [
  { label: "Titre", value: "title" },
  { label: "Hashtag", value: "hashtags" },
];

export function SearchBar() {
  const router = useRouter();

  const inputSearch = useRef<HTMLInputElement>(null);

  const [key, setKey] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    router.push(key ? `/?key=${key}&filters=${filters}` : "/");
  }, [key, filters]);

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
          placeholder="Trier..."
          value={filters}
          options={options}
          onChange={onSelectChange}
        />
      </div>
    </div>
  );
}
