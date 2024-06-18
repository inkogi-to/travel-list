import { useState } from 'react';

export default function PackingList({
  items,
  handleRemoveItems,
  onToggleItems,
  handleClearList,
}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  console.log(items);

  return (
    <div className="list">
      <ul>
        {sortedItems.map(({ id, description, quantity, packed }) => (
          <li key={id}>
            <input
              type="checkbox"
              value={packed}
              onChange={() => onToggleItems(id)}
            />
            <span style={packed ? { textDecoration: 'line-through' } : {}}>
              {quantity} {description}
            </span>
            <button onClick={() => handleRemoveItems(id)}>❌</button>
          </li>
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}
