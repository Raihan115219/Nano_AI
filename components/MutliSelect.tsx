import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

const MutliSelect = () => {
  const data = [
    {
      label: "Node 1",
      value: "node1",
      children: [
        {
          label: "Node 1.1",
          value: "node1.1",
        },
        {
          label: "Node 1.2",
          value: "node1.2",
        },
      ],
    },
    {
      label: "Node 2",
      value: "node2",
      children: [
        {
          label: "Node 2.1",
          value: "node2.1",
        },
        {
          label: "Node 2.2",
          value: "node2.2",
        },
      ],
    },
  ];

  return (
    <div>
      <DropdownTreeSelect data={data} />
    </div>
  );
};

export default MutliSelect;
