import { decodeEntity } from "html-entities";
import React from "react";

const EmojiButton = ({
  index,
  emoji,
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
}) => {
  const btnContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : "?";

  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  const btnAria = matchedCardEntry
    ? `${decodeEntity(emoji.name)}. Matched.`
    : selectedCardEntry
    ? `${decodeEntity(emoji.name)}. Not Matched Yet`
    : "Cards upside down.";
  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? null : handleClick}
      disabled={matchedCardEntry}
      aria-label={`Position ${index+1} : ${btnAria}`}
      aria-live="polite"
    >
      {btnContent}
    </button>
  );
};

export default EmojiButton;
