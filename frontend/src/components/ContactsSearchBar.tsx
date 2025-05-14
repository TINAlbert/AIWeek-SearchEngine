interface ContactsSearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function ContactsSearchBar({ value, onChange }: ContactsSearchBarProps) {
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Buscar por nombre, email, etc."
        className="border rounded px-3 py-1 w-full max-w-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
