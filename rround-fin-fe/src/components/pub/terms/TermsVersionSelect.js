'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';

/** @typedef {{ id: string; label: string }} TermsVersionOption */

/**
 * 약관 시행일(이전 약관) 선택 드롭다운 — Figma Dropdown_type2
 * @param {object} props
 * @param {TermsVersionOption[]} props.versions
 * @param {string} props.value
 * @param {(id: string) => void} props.onChange
 */
export default function TermsVersionSelect({ versions, value, onChange }) {
  const listboxId = useId();
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const selected = versions.find((version) => version.id === value) ?? versions[0];

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        close();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  if (!selected || versions.length === 0) {
    return null;
  }

  return (
    <div ref={rootRef} className="terms-pub__version-select">
      <button
        type="button"
        className="terms-pub__version-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="terms-pub__version-value">{selected.label}</span>
        <Image
          src="/images/common/icon-chevron-down-muted.svg"
          alt=""
          width={16}
          height={16}
          className={`terms-pub__version-chevron${isOpen ? ' is-open' : ''}`}
        />
      </button>

      {isOpen ? (
        <ul id={listboxId} className="terms-pub__version-list" role="listbox" aria-label="약관 시행일 선택">
          {versions.map((version) => {
            const isSelected = version.id === selected.id;

            return (
              <li key={version.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`terms-pub__version-option${isSelected ? ' is-selected' : ''}`}
                  onClick={() => {
                    onChange(version.id);
                    close();
                  }}
                >
                  {version.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
