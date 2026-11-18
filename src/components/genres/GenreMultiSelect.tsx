import { useEffect, useRef, useState } from "react";

export default function GenreMultiSelect({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const optionsRef = useRef(null);

    const selectedOptions = options.filter((option) =>
        value.includes(String(option.id))
    );
    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    useEffect(() => {
        function closeOnOutsideClick(event) {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
    }, []);

    function setSelection(nextValue) {
        onChange(nextValue);
        setQuery("");
    }

    function toggleOption(option) {
        const id = String(option.id);
        setSelection(
            value.includes(id)
                ? value.filter((selectedId) => selectedId !== id)
                : [...value, id]
        );
    }

    function removeOption(option, event) {
        event.stopPropagation();
        setSelection(value.filter((selectedId) => selectedId !== String(option.id)));
        inputRef.current?.focus();
    }

    function handleInputKeyDown(event) {
        if (event.key === "Escape") {
            setOpen(false);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            optionsRef.current?.querySelector('[role="option"]')?.focus();
        } else if (event.key === "Backspace" && query === "" && selectedOptions.length) {
            setSelection(value.slice(0, -1));
        } else if (event.key === "Enter" && filteredOptions.length) {
            event.preventDefault();
            toggleOption(filteredOptions[0]);
        }
    }

    function handleOptionKeyDown(event, index) {
        const optionElements = optionsRef.current?.querySelectorAll('[role="option"]');

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex = (index + direction + filteredOptions.length) % filteredOptions.length;
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
                    {selectedOptions.map((option) => (
                        <span className="genre-chip" key={option.id}>
                            <span>{option.name}</span>
                            <button
                                type="button"
                                aria-label={`Remove ${option.name}`}
                                title={`Remove ${option.name}`}
                                onClick={(event) => removeOption(option, event)}
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
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                    <button
                        className={`genre-dropdown-toggle${open ? " is-open" : ""}`}
                        type="button"
                        aria-label={open ? "Close genre options" : "Open genre options"}
                        aria-expanded={open}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen((isOpen) => !isOpen);
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
                        {filteredOptions.length ? filteredOptions.map((option, index) => {
                            const selected = value.includes(String(option.id));
                            return (
                                <div
                                    className="genre-option"
                                    key={option.id}
                                    role="option"
                                    aria-selected={selected}
                                    tabIndex={0}
                                    onClick={() => toggleOption(option)}
                                    onKeyDown={(event) => handleOptionKeyDown(event, index)}
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
