import { useEffect, useRef, useState } from "react";

export default function SortBySelect({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);
    const optionsRef = useRef(null);
    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
        function closeOnOutsideClick(event) {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
    }, []);

    useEffect(() => {
        if (open) {
            optionsRef.current?.querySelector('[aria-selected="true"]')?.focus();
        }
    }, [open]);

    function selectOption(option) {
        onChange(option.value);
        setOpen(false);
        triggerRef.current?.focus();
    }

    function handleTriggerKeyDown(event) {
        if (event.key === "Escape") {
            setOpen(false);
        } else if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
        }
    }

    function handleOptionKeyDown(event, index) {
        const optionElements = optionsRef.current?.querySelectorAll('[role="option"]');

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex = (index + direction + options.length) % options.length;
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
                    onClick={() => setOpen((isOpen) => !isOpen)}
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
                        {options.map((option, index) => {
                            const selected = option.value === value;
                            return (
                                <div
                                    className="genre-option"
                                    key={option.value}
                                    role="option"
                                    aria-selected={selected}
                                    tabIndex={0}
                                    onClick={() => selectOption(option)}
                                    onKeyDown={(event) => handleOptionKeyDown(event, index)}
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
