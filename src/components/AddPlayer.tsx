import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const AddPlayer: React.FC = () => {
  const [name, setName] = useState('');
  const [part, setPart] = useState('first_parts'); // ['first_parts', 'second_parts', 'third_parts'

  const handleAddDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, part), {
        name: name,
      });
      console.log('Document written with ID: ', docRef.id);
      // reset form
      setName('');
      window.location.reload()

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
          value={part}
          onChange={(e) => setPart(e.target.value as 'first_parts' | 'second_parts' | 'third_parts')}
      >
          <option value="first_parts">First Part</option>
          <option value="second_parts">Second Part</option>
          <option value="third_parts">Third Part</option>
      </select>

      <button onClick={handleAddDocument}>Add Document</button>
    </div>
  );
};

