import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface PinPadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const PinPad = ({ value, onChange, maxLength = 6 }: PinPadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden Input for keyboard input */}
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="sr-only"
        autoComplete="off"
        autoFocus
      />

      {/* PIN Display */}
      <div 
        className="flex justify-center gap-3 py-8 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {Array.from({ length: maxLength }).map((_, index) => (
          <div
            key={index}
            className={`h-14 w-14 rounded-lg border-2 flex items-center justify-center text-3xl font-bold transition-all ${
              index < value.length
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-muted'
            }`}
          >
            {index < value.length ? '•' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};
