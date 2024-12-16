import { useState } from "react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { For } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LuFilter } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterProps {
  onChange?: (newFilters: Array<[string, string[]]>) => void;
}

function sendToFilter(
  filter: Map<string, string[]>,
  onChange?: (newFilters: Array<[string, string[]]>) => void
) {
  if (onChange) {
    var filterArray: Array<[string, string[]]> = [];
    filter.forEach((value, key) => {
      filterArray.push([key, value]);
    });

    return onChange(filterArray); // Send the updated filter to the parent component
  }
}

//Updating filter based on currecnt contents of it, it something is checked we will remove it and if something is unchecked we will add it
function filterUpdate(
  filterType: string,
  filterName: string,
  filterMap: Map<string, string[]>
) {
  var subMap = filterMap.get(filterType);
  if (filterMap.get(filterType)?.includes(filterName)) {
    if (subMap) subMap.splice(subMap.indexOf(filterName), 1);
    filterMap.set(filterType, subMap!);
  } else {
    subMap?.push(filterName);
    filterMap.set(filterType, subMap!);
  }

  return filterMap;
  /*

 {"Importance": ["High"],

 CompanyNames: ["Loom", "Ramp", "Brex", "Vanta", "Notion", "Linear", "OpenAI"],

 "Type": []
 }



  */
}

//Using ChakraUI Library to implement this, I think they have a really nice UI for this
export function Filter({ onChange }: FilterProps) {
  const filters = ["Importance", "Type", "Customer"];

  const Importance = ["High", "Medium", "Low"];
  const Type = ["Sales", "Customer", "Research"];
  const Customer = [
    "Loom",
    "Ramp",
    "Brex",
    "Vanta",
    "Notion",
    "Linear",
    "OpenAI",
  ];

  const [filterMap, setFilterMap] = useState(() => {
    const initialMap = new Map<string, string[]>();
    initialMap.set("Importance", []);
    initialMap.set("Type", []);
    initialMap.set("Customer", []);
    return initialMap;
  });

  return (
    <MenuRoot
      closeOnSelect={false}
      onExitComplete={() => sendToFilter(filterMap, onChange)}
    >
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm" w="10%">
          <LuFilter />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <For each={filters}>
          {(filterType) => (
            <MenuRoot
              closeOnSelect={false}
              positioning={{ placement: "right-start", gutter: 2 }}
            >
              <MenuTriggerItem value={filterType}>{filterType}</MenuTriggerItem>
              <MenuContent>
                <For
                  each={
                    filterType === "Importance"
                      ? Importance
                      : filterType === "Type"
                      ? Type
                      : filterType === "Customer"
                      ? Customer
                      : []
                  }
                >
                  {(FilterName) => (
                    <MenuItem value={FilterName}>
                      <Checkbox
                        onChange={() =>
                          setFilterMap(
                            filterUpdate(filterType, FilterName, filterMap)
                          )
                        }
                      >
                        {FilterName}
                      </Checkbox>
                    </MenuItem>
                  )}
                </For>
              </MenuContent>
            </MenuRoot>
          )}
        </For>
      </MenuContent>
    </MenuRoot>
  );
}
