let transaction=[]

function addTransaction() {
    const text=document.getElementById('text').value
    const amount=parseFloat(document.getElementById('amount').value)

    if(text === ''|| isNaN(amount)){
        alert('Please enter the description and amount')
        return;
    }

    const Transaction={ id:Date.now(),text,amount}
    transaction.push(Transaction);

    updateUI();
   
    document.getElementById('text').value='';
    document.getElementById('amount').value='';
}
function updateUI(){
    const list=document.getElementById('list');
    list.innerHTML='';

    let income=0;
    let expense=0;

    transaction.forEach (t => {
        const li=document.createElement('li');
        li.className = t.amount > 0 ? 'plus' : 'minus';
        li.innerHTML=`
        <span>${t.text}</span>
        <span>₹${t.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button>
        `;

        list.appendChild(li);

        if(t.amount > 0){
            income = income+t.amount;
        }else{
            expense = expense+Math.abs(t.amount);
        }
    })
    document.getElementById('balance').textContent=(income - expense).toFixed(2);
    document.getElementById('income').textContent=income.toFixed(2);
    document.getElementById('expense').textContent=expense.toFixed(2);
}
function deleteTransaction(id) {
    transaction = transaction.filter(t => t.id !== id);
    updateUI();
}