import React from "react";

export interface Props extends React.ComponentPropsWithoutRef<"button"> {
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
}

export default function Button(props: Props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
