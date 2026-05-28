import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export default function ChipSelector({
  options,
  selected,
  onChange,
  placeholder = "Adicionar outro...",
}: ChipSelectorProps) {
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const toggleChip = (chip: string) => {
    if (selected.includes(chip)) {
      onChange(selected.filter((s) => s !== chip));
    } else {
      onChange([...selected, chip]);
    }
  };

  const addCustomChip = () => {
    const trimmed = customInput.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
    }
    setCustomInput("");
    setShowInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomChip();
    }
    if (e.key === "Escape") {
      setShowInput(false);
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option}
            variant={selected.includes(option) ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1.5 text-sm transition-all hover:scale-105 ${
              selected.includes(option)
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "hover:border-blue-400 hover:text-blue-600"
            }`}
            onClick={() => toggleChip(option)}
          >
            {option}
            {selected.includes(option) && <X className="ml-1 h-3 w-3" />}
          </Badge>
        ))}
      </div>

      {/* Custom chips that aren't in the default options */}
      {selected.filter((s) => !options.includes(s)).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected
            .filter((s) => !options.includes(s))
            .map((chip) => (
              <Badge
                key={chip}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-sm text-white"
                onClick={() => toggleChip(chip)}
              >
                {chip}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
        </div>
      )}

      {showInput ? (
        <div className="flex items-center gap-2">
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="max-w-[200px] h-8 text-sm"
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={addCustomChip}
            className="h-8"
          >
            Adicionar
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowInput(true)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar outro
        </Button>
      )}
    </div>
  );
}