import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CategorySelectorProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export const CategorySelector = ({ categories, value, onChange }: CategorySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Todas las categorías" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas las categorías</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
