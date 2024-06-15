import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import { getCurrentUser } from "../utils/auth";
import { validateCharacter } from "../utils/haikuUtils";

const HaikuCreationPage = () => {
  const [theme, setTheme] = useState("");
  const [firstCharacter, setFirstCharacter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleCreate = async () => {
    const validationError = validateCharacter(firstCharacter);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (theme.trim() === "") {
      setError("テーマを入力してください");
      return;
    }

    try {
      const haikusCollection = collection(firestore, "haikus");
      await addDoc(haikusCollection, {
        theme,
        currentContent: firstCharacter,
        isComplete: false,
        createdBy: user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        contributions: [
          {
            character: firstCharacter,
            contributedBy: user.userId,
            contributedAt: new Date(),
          },
        ],
      });
      navigate("/");
    } catch (err) {
      setError("俳句の作成に失敗しました");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>新規俳句作成</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <input
        type='text'
        placeholder='テーマ'
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className='w-full mb-4 p-2 border'
      />
      <input
        type='text'
        placeholder='一文字目'
        value={firstCharacter}
        onChange={(e) => setFirstCharacter(e.target.value)}
        className='w-full mb-4 p-2 border'
      />
      <button
        onClick={handleCreate}
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        作成
      </button>
    </div>
  );
};

export default HaikuCreationPage;
