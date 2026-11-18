import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { SortOption } from "../../types/tmdb";

interface SortBySelectProps {
    options: SortOption[];
    value: string;
    onChange: (value: string) => void;
}

export default function SortBySelect({ options, value, onChange }: SortBySelectProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const selectedOption: SortOption | undefined = options.find(
        (option: SortOption) => option.value === value
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

    useEffect((): void => {
        if (open) {
            optionsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
        }
    }, [open]);

    function selectOption(option: SortOption): void {
        onChange(option.value);
        setOpen(false);
        triggerRef.current?.focus();
    }

    function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (event.key === "Escape") {
            setOpen(false);
        } else if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
        }
    }

    function handleOptionKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number): void {
        const optionElements: NodeListOf<HTMLDivElement> | undefined =
            optionsRef.current?.querySelectorAll<HTMLDivElement>('[role="option"]');

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction: 1 | -1 = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex: number = (index + direction + options.length) % options.length;
            optionElements?.[nextIndex]?.focus();
        } else if (event.key === "Escape") {
            setOpen(false);
            triggerRef.current?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectOption(options[index]);
        }
    }

    return (
        <div className="genre-field">
            <span className="genre-label" id="sort-by-label">Sort by</span>
            <div className="genre-multi-select" ref={containerRef}>
                <button
                    ref={triggerRef}
                    className={`genre-multi-control sort-select-control${open ? " is-open" : ""}`}
                    type="button"
                    role="combobox"
                    aria-labelledby="sort-by-label sort-by-value"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls="sort-by-options"
                    onClick={() => setOpen((isOpen: boolean) => !isOpen)}
                    onKeyDown={handleTriggerKeyDown}
                >
                    <span id="sort-by-value">{selectedOption?.label}</span>
                    <svg className={`genre-select-chevron${open ? " is-open" : ""}`} viewBox="0 0 16 12" aria-hidden="true" focusable="false">
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
                {open && (
                    <div
                        className="genre-menu"
                        id="sort-by-options"
                        role="listbox"
                        aria-labelledby="sort-by-label"
                        ref={optionsRef}
                    >
                        {options.map((option: SortOption, index: number) => {
                            const selected: boolean = option.value === value;
                            return (
                                <div
                                    className="genre-option"
                                    key={option.value}
                                    role="option"
                                    aria-selected={selected}
                                    tabIndex={0}
                                    onClick={() => selectOption(option)}
                                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
                                        handleOptionKeyDown(event, index)
                                    }
                                >
                                    <span>{option.label}</span>
                                    {selected && <span className="sort-option-check" aria-hidden="true">✓</span>}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
