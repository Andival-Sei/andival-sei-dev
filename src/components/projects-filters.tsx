"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

/**
 * Компонент фильтрации проектов
 * Включает поиск, фильтрацию по типу и технологиям, сортировку по дате
 */

interface ProjectsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  projectType: string;
  onProjectTypeChange: (type: string) => void;
  selectedTechnologies: string[];
  onTechnologiesChange: (technologies: string[]) => void;
  sortOrder: "newest" | "oldest";
  onSortOrderChange: (order: "newest" | "oldest") => void;
  allTechnologies: string[];
  projectTypes: { value: string; label: string }[];
}

export function ProjectsFilters({
  searchQuery,
  onSearchChange,
  projectType,
  onProjectTypeChange,
  selectedTechnologies,
  onTechnologiesChange,
  sortOrder,
  onSortOrderChange,
  allTechnologies,
  projectTypes,
}: ProjectsFiltersProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, onSearchChange]);

  // Обработка изменения технологий
  const handleTechnologyToggle = (technology: string) => {
    if (selectedTechnologies.includes(technology)) {
      onTechnologiesChange(
        selectedTechnologies.filter((t) => t !== technology)
      );
    } else {
      onTechnologiesChange([...selectedTechnologies, technology]);
    }
  };

  // Очистка фильтров
  const handleClearFilters = () => {
    setLocalSearchQuery("");
    onSearchChange("");
    onProjectTypeChange("all");
    onTechnologiesChange([]);
    onSortOrderChange("newest");
  };

  // Проверка наличия активных фильтров
  const hasActiveFilters =
    searchQuery ||
    projectType !== "all" ||
    selectedTechnologies.length > 0 ||
    sortOrder !== "newest";

  return (
    <div className="space-y-4">
      {/* Первая строка: Поиск и Фильтр по типу */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Поиск */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по названию..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Фильтр по типу проекта */}
        <Select value={projectType} onValueChange={onProjectTypeChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Тип проекта" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Сортировка */}
        <Select
          value={sortOrder}
          onValueChange={(value) =>
            onSortOrderChange(value as "newest" | "oldest")
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Новые первыми</SelectItem>
            <SelectItem value="oldest">Старые первыми</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Вторая строка: Фильтр по технологиям и кнопка очистки */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Фильтр по технологиям */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Технологии
              {selectedTechnologies.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5">
                  {selectedTechnologies.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium mb-3">Выберите технологии:</p>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {allTechnologies.map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <Checkbox
                      id={tech}
                      checked={selectedTechnologies.includes(tech)}
                      onCheckedChange={() => handleTechnologyToggle(tech)}
                    />
                    <label
                      htmlFor={tech}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
              {selectedTechnologies.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTechnologiesChange([])}
                  className="w-full mt-2"
                >
                  Очистить выбор
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Выбранные технологии */}
        {selectedTechnologies.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {selectedTechnologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() => handleTechnologyToggle(tech)}
              >
                {tech}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}

        {/* Кнопка очистки всех фильтров */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
}
