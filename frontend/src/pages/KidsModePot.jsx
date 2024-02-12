import { Tab } from "@headlessui/react";

// 하드코딩용
import { potList } from "../test/potList";

export default function KidsModePot() {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap gap-2 mb-4">
        {potList.map((pot) => (
          <Tab key={pot.potId} className="bg-green-200">
            {pot.potName}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {potList.map((pot) => (
          <Tab.Panel key={pot.potId}>
            {pot.potName}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
