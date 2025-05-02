export function createTransactionButtons(containerId, transactions) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  // Clear container before adding buttons
  container.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transaction-item");
    transactionDiv.innerHTML = `<strong>${transaction.name}</strong> - ${transaction.status}`;

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = () => {
      const newName = prompt("Enter new transaction name:", transaction.name);
      if (newName) {
        transactions[index].name = newName;
        createTransactionButtons(containerId, transactions); // Refresh UI
      }
    };

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => {
      if (confirm(`Are you sure you want to delete "${transaction.name}"?`)) {
        transactions.splice(index, 1);
        createTransactionButtons(containerId, transactions); // Refresh UI
      }
    };

    transactionDiv.appendChild(editButton);
    transactionDiv.appendChild(deleteButton);
    container.appendChild(transactionDiv);
  });
}
