function renderBooks() {
  const tbody = document.getElementById('book-list');
  tbody.innerHTML = '';

  books.forEach((book, index) => {
    const tr = document.createElement('tr');

    const titleTd = document.createElement('td');
    titleTd.textContent = book.title;
    tr.appendChild(titleTd);

    const authorTd = document.createElement('td');
    authorTd.textContent = book.author;
    tr.appendChild(authorTd);

    const actionsTd = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = "Modifier titre";
    editBtn.onclick = () => {
      // transformer la cellule titre en input
      const input = document.createElement('input');
      input.type = 'text';
      input.value = book.title;
      input.style.width = '95%';

      titleTd.innerHTML = '';
      titleTd.appendChild(input);

      // remplacer les actions par Enregistrer / Annuler
      actionsTd.innerHTML = '';

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Enregistrer';
      saveBtn.onclick = () => {
        const newTitle = input.value.trim();
        if (!newTitle) {
          alert('Le titre ne peut pas être vide.');
          input.focus();
          return;
        }
        books[index].title = newTitle;
        renderBooks();
      };

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Annuler';
      cancelBtn.onclick = () => {
        renderBooks();
      };

      // support clavier: Enter = save, Escape = cancel
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
      });

      actionsTd.appendChild(saveBtn);
      actionsTd.appendChild(cancelBtn);
    };
    actionsTd.appendChild(editBtn);

    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

renderBooks();
