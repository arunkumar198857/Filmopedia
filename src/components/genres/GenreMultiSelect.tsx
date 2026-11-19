import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import type { Genre } from "../../types/tmdb";
import "../filters/ExploreFilters.scss";

interface GenreMultiSelectProps {
    options: Genre[];
    value: string[];
    onChange: (value: string[]) => void;
}

export default function GenreMultiSelect({ options, value, onChange }: GenreMultiSelectProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);

    const selectedOptions: Genre[] = options.filter((option: Genre) =>
        value.includes(String(option.id))
    );
    const filteredOptions: Genre[] = options.filter((option: Genre) =>
        option.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    useEffect((): (() => void) => {
        function closeOnOutsideClick(event: PointerEvent): void {
            if (!(event.target instanceof Node) || !containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
    }, []);

    function setSelection(nextValue: string[]): void {
        onChange(nextValue);
        setQuery("");
    }

    function toggleOption(option: Genre): void {
        const id: string = String(option.id);
        setSelection(
            value.includes(id)
                ? value.filter((selectedId: string) => selectedId !== id)
                : [...value, id]
        );
    }

    function removeOption(option: Genre, event: MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();
        setSelection(value.filter((selectedId: string) => selectedId !== String(option.id)));
        inputRef.current?.focus();
    }

    function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Escape") {
            setOpen(false);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            optionsRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus();
        } else if (event.key === "Backspace" && query === "" && selectedOptions.length) {
            setSelection(value.slice(0, -1));
        } else if (event.key === "Enter" && filteredOptions.length) {
            event.preventDefault();
            toggleOption(filteredOptions[0]);
        }
    }

    function handleOptionKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number): void {
        const optionElements: NodeListOf<HTMLDivElement> | undefined =
            optionsRef.current?.querySelectorAll<HTMLDivElement>('[role="option"]');

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction: 1 | -1 = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex: number = (index + direction + filteredOptions.length) % filteredOptions.length;
            optionElements?.[nextIndex]?.focus();
        } else if (event.key === "Escape") {
            setOpen(false);
            inputRef.current?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleOption(filteredOptions[index]);
        }
    }

    return (
        <div className="genre-field">
            <span className="genre-label">Genres</span>
            <div className="genre-multi-select" ref={containerRef}>
                <div
                    className={`genre-multi-control${open ? " is-open" : ""}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    {selectedOptions.map((option: Genre) => (
                        <span className="genre-chip" key={option.id}>
                            <span>{option.name}</span>
                            <button
                                type="button"
                                aria-label={`Remove ${option.name}`}
                                title={`Remove ${option.name}`}
                                onClick={(event: MouseEvent<HTMLButtonElement>) => removeOption(option, event)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        className="genre-query"
                        type="text"
                        role="combobox"
                        aria-label="Search genres"
                        aria-autocomplete="list"
                        aria-expanded={open}
                        aria-controls="genre-options"
                        autoComplete="off"
                        placeholder={selectedOptions.length ? "Add a genre…" : "Select genres…"}
                        value={query}
                        onFocus={() => setOpen(true)}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                    <button
                        className={`genre-dropdown-toggle${open ? " is-open" : ""}`}
                        type="button"
                        aria-label={open ? "Close genre options" : "Open genre options"}
                        aria-expanded={open}
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                            event.stopPropagation();
                            setOpen((isOpen: boolean) => !isOpen);
                        }}
                    >
                        <svg viewBox="0 0 16 12" aria-hidden="true" focusable="false">
                            <path
                                d="m2 3 6 6 6-6"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.7"
                            />
                        </svg>
                    </button>
                </div>
                {open && (
                    <div
                        className="genre-menu"
                        id="genre-options"
                        role="listbox"
                        aria-label="Genres"
                        aria-multiselectable="true"
                        ref={optionsRef}
                    >
                        {filteredOptions.length ? filteredOptions.map((option: Genre, index: number) => {
                            const selected: boolean = value.includes(String(option.id));
                            return (
                                <div
                                    className="genre-option"
                                    key={option.id}
                                    role="option"
                                    aria-selected={selected}
                                    tabIndex={0}
                                    onClick={() => toggleOption(option)}
                                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
                                        handleOptionKeyDown(event, index)
                                    }
                                >
                                    <span className="genre-check" aria-hidden="true">
                                        {selected ? "✓" : ""}
                                    </span>
                                    <span>{option.name}</span>
                                </div>
                            );
                        }) : (
                            <p className="genre-empty">No matching genres</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
