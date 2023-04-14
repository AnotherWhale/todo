import React, { ReactElement, ReactNode } from "react";

type Props = {
  children: React.ReactNode;
};

function Todos(props: Props) {
  return (
    <div className="overflow-x-auto w-screen flex justify-center my-10">
      <table className="table table-fixed w-11/12 md:w-10/12">
        {/* head */}
        <thead>
          <tr>
            <th>todo</th>
            <th className="w-32">
              <button
                className="btn btn-sm w-full"
                onClick={() => {
                  localStorage.setItem("api", "");
                  location.reload();
                }}
              >
                logout
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export default Todos;
