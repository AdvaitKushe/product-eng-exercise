import { useState} from "react";
import { NavTabs, TabConfig } from "./components/NavTabs";
import { Feedback } from "./Feedback";
import { Groups } from "./Groups";
import { Filter } from "./components/Filter";

export const TabsConfig: TabConfig = {
  feedback: {
    id: "feedback",
    name: "Feedback",
  },
  groups: {
    id: "groups",
    name: "Groups",
  },
};

function App() {
  const [selectedTab, setSelectedTab] = useState("feedback");
  const [selectedFilters, setSelectedFilters] = useState({});


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5 flex flex-col gap-y-4">
        <NavTabs
          config={TabsConfig}
          tabOrder={["feedback", "groups"]}
          onTabClicked={(tabId) => {
            setSelectedTab(tabId);
          }}
          selectedTab={selectedTab}
        />
        {/**
         * TODO(part-1): Add filter options
         */}

        <Filter onChange={(filt) => setSelectedFilters(filt)} />

        {selectedTab === "feedback" ? (
          <Feedback filters={selectedFilters} />
        ) : (
          <Groups filters={selectedFilters} />
        )}
      </div>
    </div>
  );
}

export default App;
