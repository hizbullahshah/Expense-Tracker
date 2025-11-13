const Balance = document.querySelector("#balance");
const IncomBalance = document.querySelector("#income-balance");
const ExpenseBalance = document.querySelector("#expense-balance");
const ListUL = document.querySelector("#transactiona-list");
const DescriptionInput = document.querySelector("#input-1");
const AmountInput = document.querySelector("#input-2");
const AddBtn = document.querySelector("#add-transaction");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

AddBtn.addEventListener("click", () => {
    if(DescriptionInput.value == "" && AmountInput.value == "") {
        alert("it should be not emipty");
    } else {
       AddList();
    }
});

const AddList = () => {
     let DecribInputText = DescriptionInput.value;
     let AmountInputText = parseFloat(AmountInput.value);

     transactions.push({
        id:Date.now(),
        DecribInputText,
        AmountInputText
     });

     AmountInput.value = "";
     DescriptionInput.value = "";

     localStorage.setItem("transactions", JSON.stringify(transactions));

     upDateTranstionList();
     Updatesummry();
}

const upDateTranstionList = () => {
   ListUL.innerHTML = "";
    const sortedTeranstions = [...transactions].reverse();
        
     sortedTeranstions.forEach((transaction) => {
        const transactionEl = createTranstionElement(transaction);
        ListUL.appendChild(transactionEl);
     });
}

const createTranstionElement = (transaction, AmountInputText, DecribInputText) => {
   const li = document.createElement("i");
   li.classList.add("list-i");
   li.classList.add(transaction.AmountInputText > 0 ? "income" : "expense");
   li.innerHTML = `<p class="list-text">${transaction.DecribInputText}</p>
                       <div class="listAmountIcon">
                       <p class="listAmount">${farmatCurrency(transaction.AmountInputText)}</p>
                      <div class="icondiv" onclick="removeTranstion(${transaction.id})"><i class="fa-solid fa-xmark" id="icon"></i></div> 
                      </div>`;
   
   return li;

}

 const Updatesummry = () => {
     const balance = transactions.reduce((acc, transaction) => acc +
      transaction.AmountInputText, 0);

      const income = transactions.filter((transaction) => transaction.AmountInputText > 0).
      reduce((acc, transaction) => acc + transaction.AmountInputText, 0);

      const expenses = transactions.filter((transaction) => transaction.AmountInputText < 0).
      reduce((acc, transaction) => acc + transaction.AmountInputText, 0);

      // updateUI
      Balance.innerText = farmatCurrency(balance);
      IncomBalance.innerText = farmatCurrency(income);
      ExpenseBalance.innerText = farmatCurrency(expenses);
 }

 const farmatCurrency = (number) => {
   return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(number);
 }

 const removeTranstion = (id) => {
   transactions = transactions.filter(transaction => transaction.id !== id);

   localStorage.setItem("transactions", JSON.stringify(transactions));
   upDateTranstionList();
   Updatesummry();
 }

 Updatesummry();
 upDateTranstionList();