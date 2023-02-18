import React from "react";

function Summary({ summary }) {
  return (
    <section>
      <h1 className="text-align-center">Covid Summary</h1>
      {summary &&
        Object.keys(summary).length > 0 &&
        Object.keys(summary).map((state, stateIndex) => {
          const value = summary[state];
          console.log(value);
          return (
            <p>
              In {state} {value.confirmed} were affected by Covid, over{" "}
              {value.confirmed} affected cases {value.active} were active,{" "}
              {value.deceased} were deceased and {value.recovered} were
              recovered
            </p>
          );
        })}
    </section>
  );
}

export default Summary;
