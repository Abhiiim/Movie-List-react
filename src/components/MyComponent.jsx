import React, { useState } from 'react';

function MyComponent() {
  const [items, setItems] = useState([
    { id: 1, title: 'Item 1', content: 'Content 1' },
    { id: 2, title: 'Item 2', content: 'Content 2' },
    { id: 3, title: 'Item 3', content: 'Content 3' },
    // Add more items as needed
  ]);

  const handleEdit = (index) => {
    // Clone the array to avoid directly modifying the state
    const editedItems = [...items];

    // Prompt the user for the new title and content using the input boxes
    const newTitle = prompt('Enter the new title:', editedItems[index].title);
    const newContent = prompt('Enter the new content:', editedItems[index].content);

    if (newTitle !== null && newContent !== null) {
      // Update the title and content of the selected item
      editedItems[index].title = newTitle;
      editedItems[index].content = newContent;

      // Update the state with the edited array
      setItems(editedItems);
    }
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <div>
              <strong>Title:</strong> {item.title}
            </div>
            <div>
              <strong>Content:</strong> {item.content}
            </div>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
