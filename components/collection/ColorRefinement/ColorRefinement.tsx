import { FC, useEffect, useState } from "react";

interface ColorRefinementProps {
  attribute: any;
}

const ColorRefinement: FC<ColorRefinementProps> = ({ attribute }) => {
  return (
    <ul>
      {/* {attribute.map((item: any) => (
        <li key={item.label}>
          <a href="#" style={{ fontWeight: item.isRefined ? "bold" : "" }}>
            {item.label} ({item.count})
          </a>
        </li>
      ))} */}
      <span>{JSON.stringify(attribute, null, 2)}</span>
    </ul>
  );
};

export default ColorRefinement;
