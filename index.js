
function signup(event)
   
{ event.preventDefault();

    //alert("The form was submitted");

    const name=document.getElementById("text");
    const password=document.getElementById("pass");
    const email=document.getElementById("mail");

    let obj={
        name:name.value,
        password:password.value,
        email:email.value
    };
    console.log('object is ', obj);
    axios.post("http://localhost:3000/signup",obj)
    .then((response) => {
        if(response.status==201)
        {
            window.location.href="./login.html"
        }
        else
        {
            throw new Error("failed to login")
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    
}

function login(event)
   
{ event.preventDefault();

    alert("The form was submitted");

    const name=document.getElementById("text");
    const password=document.getElementById("pass");
  //  const email=document.getElementById("mail");

    let logindetails={
        //name:name.value,
        email:email.value,
        password:password.value,
     
    };
    
    axios.post("http://localhost:3000/login",logindetails)
    .then((response) => {
        if(response.status==201)
        { alert(response.data.message)
            window.location.href="./expense.html"
        }
        else
        {
            throw new Error(response.data.message)
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    
}

function addNewExpense(event)
   
{ event.preventDefault();

    alert("The form was submitted");

    const expenseamount =document.getElementById("text");
    const description=document.getElementById("pass");
    const category=document.getElementById("category");

    let obj={
        expenseamount:expenseamount.value,
        description:description.value,
        category:category.value
    };
    console.log('object is ', obj);
    axios.post("http://localhost:3000/addexpense",obj)
    .then((response) => {
        if(response.status==201)
        {
            addNewExpensetoUI(response.data.expense);
            alert("expense added");
        }
        else
        {
            throw new Error("failed to add")
        }
        
       
      console.log(response);
    
    })
    .catch((err) => {
        
        console.log(err);
    });

    

}

  
    window.addEventListener('load', ()=> {
        //const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/getexpenses').then(response => {
            if(response.status === 200){
                response.data.expenses.forEach(expense => {
    
                    addNewExpensetoUI(expense);
                })
            } else {
                throw new Error();
            }
        })
    });

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}