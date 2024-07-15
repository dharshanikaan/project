document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('form');
    const expenseList = document.getElementById('list');
    const expenseCategory = document.getElementById('category');
    const addExpenseBtn = document.getElementById('btn');
    const expenseAmount = document.getElementById('amount');
    const expenseDescription = document.getElementById('des');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to display expenses
    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
            const li = document.createElement('li');
            li.textContent = `Amount: $${expense.amount} | Description: ${expense.description} | Category: ${expense.category}`;

            // Create Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.setAttribute('edit-id',index);
            editBtn.addEventListener('click', function() {
                editExpense(index);
            });
            li.appendChild(editBtn);

            // Create Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('data-id', index); 
            deleteBtn.addEventListener('click', function() {
                deleteExpense(index);
            });
            li.appendChild(deleteBtn);

            expenseList.appendChild(li);
        });
    }

    // Function to add expense
    function addExpense() {
        const amount = parseFloat(expenseAmount.value);
        const description = expenseDescription.value;
        const category = expenseCategory.value;

        if (!amount || !description || !category) {
            alert('Please fill in all fields.');
            return;
        }

        const expense = {
            amount: amount,
            description: description,
            category: category
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseForm.reset();
        displayExpenses(); // Refresh the UI to display the newly added expense
    }
    function editExpense(index) {
        // For demonstration purposes, increment the amount by 1
        expenses[index].amount = parseFloat(expenses[index].amount) + 1;
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses(); // Refresh the UI to reflect the updated expense
    }
    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses(); // Refresh the UI to reflect the deleted expense
    }

    // Event listener for add expense button
    addExpenseBtn.addEventListener('click', addExpense);

    // Display initial expenses on page load
    displayExpenses();
});