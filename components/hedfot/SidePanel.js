import React from "react";
import axios from "axios";
import Link from "next/link";

const SidePanel = ({ chilren, info }) => {
  return (
    <div className="flex items-center justify-left w-100 max-h-screen bg-gray-100">
      <table>
        <thead>
          <tr>
            <th>Friends</th>
          </tr>
        </thead>
        <tbody>
          {info.length === 0 ? (
            <tr>
              <td colSpan="1">No friends</td>
            </tr>
          ) : (
            info.map((info) => (
              <tr key={info.id}>
                <td>info.name</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SidePanel;
