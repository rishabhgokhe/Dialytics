import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDown } from "lucide-react";

export default function FilterTabs({ selectedFilters, setSelectedFilters }) {
  const toggleFilter = (filterName) => {
    setSelectedFilters({
      Incoming: filterName === "Incoming",
      Outgoing: filterName === "Outgoing",
      Completed: filterName === "Completed",
      Missed: filterName === "Missed",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <FilterButton
        value="Incoming"
        label="Incoming Calls"
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />
      <FilterButton
        value="Outgoing"
        label="Outgoing Calls"
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />
      <FilterButton
        value="Completed"
        label="Completed Calls"
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />
      <FilterButton
        value="Missed"
        label="Missed Calls"
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            More Filters
            <ArrowBigDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Button variant={"outline"}>Dates</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function FilterButton({ selectedFilters, value, label, toggleFilter }) {
  return (
    <Button
      variant="outline"
      style={{
        backgroundColor: selectedFilters[value] ? "#2C81FF" : "transparent",
        color: selectedFilters[value] ? "white" : "black",
      }}
      onClick={() => toggleFilter(value)}
    >
      {label}
    </Button>
  );
}