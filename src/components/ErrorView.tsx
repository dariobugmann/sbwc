import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function ErrorView(props: Props) {
  return <div className="error">{props.children}</div>;
}
