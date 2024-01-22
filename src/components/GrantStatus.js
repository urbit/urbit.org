import React from "react";

export default function GrantStatus(post) {
  const canceled = post?.extra?.canceled;
  const completed = post?.extra?.completed;
  const open = !canceled && !completed && post?.extra?.assignee?.[0] === "";

  if (canceled) {
    return <span className="btn bg-gray text-tint">Canceled</span>;
  }
  if (completed) {
    return <span className="btn bg-gray text-tint">Completed</span>;
  }
  if (open) {
    return <span className="btn bg-brite text-gray">Open</span>;
  }
  return <span className="btn bg-gray text-brite">In Progress</span>;
}
