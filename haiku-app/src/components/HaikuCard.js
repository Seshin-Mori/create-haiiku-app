import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const HaikuCard = ({ haiku }) => {
  const user = getCurrentUser();
  const lastContributor =
    haiku.contributions[haiku.contributions.length - 1]?.contributedBy;
  const canAddCharacter =
    !haiku.isComplete && (!lastContributor || lastContributor !== user.userId);

  const formatHaikuContent = (content) => {
    if (content.length <= 5) {
      return content;
    } else if (content.length <= 12) {
      return `${content.slice(0, 5)}\n${content.slice(5)}`;
    } else {
      return `${content.slice(0, 5)}\n${content.slice(5, 12)}\n${content.slice(
        12
      )}`;
    }
  };

  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <h2 className='text-xl font-bold mb-2'>{haiku.theme}</h2>
      <p className='mb-2 whitespace-pre-line'>
        {formatHaikuContent(haiku.currentContent)}
      </p>
      <p className='mb-2 text-sm text-gray-500'>作成者: {haiku.createdBy}</p>
      {haiku.isComplete ? (
        <p className='text-green-500'>完成</p>
      ) : canAddCharacter ? (
        <Link to={`/add/${haiku.id}`} className='text-blue-500'>
          文字を追加
        </Link>
      ) : (
        <p className='text-red-500'>前回投稿したユーザーは投稿不可</p>
      )}
    </div>
  );
};

export default HaikuCard;
