import { useCallback, useState, KeyboardEvent } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  'aria-label'?: string;
}

/**
 * Tag-style input: type and press Enter to add a pill; each pill has X to remove.
 */
export function TagInput({ value, onChange, placeholder = 'Type and press Enter', 'aria-label': ariaLabel }: TagInputProps) {
  const [input, setInput] = useState('');

  const add = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || value.includes(t)) return;
      onChange([...value, t]);
      setInput('');
    },
    [value, onChange]
  );

  const remove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        add(input);
      }
    },
    [add, input]
  );

  return (
    <div
      className="tag-input"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-1)',
        alignItems: 'center',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: 'var(--space-1)',
        minHeight: 40,
        background: 'var(--color-bg)',
      }}
    >
      {value.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 9999,
            fontSize: 'var(--text-caption)',
          }}
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => remove(i)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginLeft: 2,
              lineHeight: 1,
              color: 'var(--color-text-muted)',
              fontSize: 14,
            }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        className="kodnest-input"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        style={{
          flex: '1 1 120px',
          minWidth: 100,
          border: 'none',
          background: 'transparent',
          outline: 'none',
        }}
      />
    </div>
  );
}
