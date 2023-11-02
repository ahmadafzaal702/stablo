import React from "react";

interface Iprops {
  statusText: string;
}

const FormStatusDisplay = ({ statusText }: Iprops) => {
  return (
    <div className="text-center">
      <span className="text-sm font-semibold text-error">{statusText}</span>
    </div>
  );
};

export default FormStatusDisplay;
