import { useState } from "react";
import { Link } from "react-router-dom";

const AdminCard = ({ username, role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="rounded-lg shadow-lg bg-white w-[80vw] border bg-card text-card-foreground  "
      data-v0-t="card"
    >
      <div className="flex  items-start p-6">
        <div className="grid gap-1 ml-4">
          <div className="flex items-center gap-2">
            <hgroup className="grid gap-1">
              <h3 className="text-base font-bold leading-none">{username}</h3>
            </hgroup>
          </div>
          <p className="text-sm leading-relaxed">{role}</p>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
