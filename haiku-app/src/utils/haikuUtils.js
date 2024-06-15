// haikuUtils.js

export const validateCharacter = (character) => {
  if (character.length !== 1) {
    return "文字は1文字で入力してください";
  }
  if (character.trim() === "") {
    return "空白文字は許容されません";
  }
  return null;
};
