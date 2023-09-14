'use strict';

//Elements........

// let score0 = document.querySelector('#score--0');
let welcomeHeading = document.querySelector('.heading');
let userLogin = document.querySelector('#user');
let pinLogin = document.querySelector('#PIN');
let loginInterfaceBtn = document.querySelector('.loginInterfaceBtn')
let interfaceTime = document.querySelector('.time');
let ContainerInterface = document.querySelector('.container');
let currentBalance = document.querySelector('.balance');
let transferNameType = document.querySelector('.TransferType');
let transferRsNumberType = document.querySelector('.TransferNumber');
let transferBtn = document.querySelector('.btnTransfer');
let numberRequestLoan = document.querySelector(".numberloan");
let loanBtn = document.querySelector('#request-loan');
let typeCloseAccount = document.querySelector('.type-close-account');
let numberCloseAccount = document.querySelector('.number-close-account');
let closeAccountBtn = document.querySelector('#close-account');
let inMoney = document.querySelector('.in');
let outMoney = document.querySelector('.out');
let interest = document.querySelector('.interest');
let balanceTransaction = document.querySelector('.balanceHistory');
let footerSummary = document.querySelector('.footer');


// User data (ACCOOUNT /DATABASE).....

const account1 = {
    accountHolder: 'Ram Chander Rai',
    transactions: [-25000, -20000, 35000, 30000, -100000, 32020, 30000, 42003],
    interestRate: 1.2,
    pin: 1111,
    accountNumber: 10000007065,
};
const account2 = {
    accountHolder: 'Ramesh Kumar',
    transactions: [25000, 10000, -35000, 30000, -100000, 22020, -30000, 42003, 2000, 30000, 50000],
    interestRate: 1.2,
    pin: 2222,
    accountNumber: 20000009250,
};
const account3 = {
    accountHolder: 'Vishal Yadav',
    transactions: [500, -500, 1500, -1500, 201, -200, 28.20, 500, 650, -500, -499, 8000, -60, -500, -300, 300],
    interestRate: 2.3,
    pin: 3333,
    accountNumber: 30000009667,
};
const account4 = {
    accountHolder: 'Vibha Devi',
    transactions: [25000, 98000, 1, -4000, -50000, -50, -50000, -70, 200, -40, 2000, -30],
    interestRate: 1.2,
    pin: 4444,
    accountNumber: 40000009999,
};
const account5 = {
    accountHolder: 'Paras Yadav',
    transactions: [2000, 700, -30, -700, -300, -65, 870, 7000, 4567, 70000, -50000, -50, -50000, -70, 200, -40, 2000, -30, 90000],
    interestRate: 2.5,
    pin: 5555,
    accountNumber: 50000009888,
};

const accounts = [account1, account2, account3, account4, account5];


//TIME


function displayTime() {
    let timeString = new Date().toUTCString();
    interfaceTime.textContent = `As ${timeString}`;

}
setInterval(displayTime, 1000);

//IMPLIMENTATION (DISPLAYING HISTOTY)......

const displayTransactions = function (transactions) {
    balanceTransaction.innerHTML = '';
    transactions.forEach(function (tran, i) {
        const type = tran > 0 ? 'deposite' : 'getout';
        const html = `
        
        <div class="${type}" style="display: flex; ">
            ${i + 1} ${type}

        </div>
        <div class="his-1">₹${tran}</div>
        <hr>
    `;
        balanceTransaction.insertAdjacentHTML
            ('afterbegin', html);
    })
}



// Calculate (CURRENT BALANCE).......

const calcDisplayCurrentBalance = function (transactions) {
    const totalBalance = transactions.reduce((tran, acc) => acc + tran, 0);
    // const totalBalance = transactions.reduce(function(tran, acc) { acc + tran ,0} );
    currentBalance.textContent = `₹${totalBalance}`
};

// Summary (IN Balance)........

const calcDisplaySummaryIn = function (acc) {
    // const inBalance = acc.filter( trans => trans > 0).reduce((acc,trans)=>acc+trans,0);
    let inBalance = 0;
    let trans;
    for (trans of acc) {
        if (trans > 0) {
            inBalance = inBalance + trans;
        }
    }
    // console.log(inBalance);
    inMoney.textContent = `₹${inBalance}`;
}



// Summary (OUT Balance)........

const calcDisplaySummaryOut = function (acc) {
    // const inBalance = acc.filter( trans => trans < 0).reduce((acc,trans)=>acc+trans,0);
    let outBalance = 0;
    let trans;
    for (trans of acc) {
        if (trans < 0) {
            outBalance = outBalance + trans;
        }
    }
    // console.log(inBalance);
    outMoney.textContent = `₹${Math.abs(outBalance)}`;
}


// Summary (interest Balance)........

const calcDisplaySummaryInterest = function (acc) {
    const interestBalance = acc.filter((trans) => trans > 0).map((deposite) => (deposite * 1.2) / 100).reduce((acc, int) => acc + int, 0);
    interest.textContent = `₹${interestBalance}`;
}


// USERNAME..........

const createUserLoginName = function (accs) {
    accs.forEach(function (acc) {
        acc.userLoginName = acc.accountHolder
            .toLowerCase().split(' ').map(Name => Name[0]).join('');
    });
};
createUserLoginName(accounts);


/// UPDATE UI 

const updateInterface = function () {

    //display transactions.........

    displayTransactions(currentHolderName.transactions);


    // display crrent balance.......

    calcDisplayCurrentBalance(currentHolderName.transactions);


    // display summary.......

    calcDisplaySummaryIn(currentHolderName.transactions);
    calcDisplaySummaryOut(currentHolderName.transactions);
    calcDisplaySummaryInterest(currentHolderName.transactions);
}


// EventListner (interfaceLoginBtn)........

let currentHolderName;

loginInterfaceBtn.addEventListener('click', function (e) {

    // prevent for submitting
    e.preventDefault();

    currentHolderName = accounts.find(acc => acc.userLoginName === userLogin.value);
    // console.log(currentHolderName);

    if (currentHolderName?.pin === Number(pinLogin.value)) {
        pinLogin.value = userLogin.value = '';
        welcomeHeading.textContent = `Welcome back Hey®${currentHolderName.accountHolder.split(' ')[0]}`;
        ContainerInterface.style.opacity = 100;
        footerSummary.style.opacity = 100;

        updateInterface();

        // shuliyat ke liye.....

        document.body.style.backgroundColor = 'rgb(247, 239, 246)';
        loginInterfaceBtn.style.backgroundColor = 'rgb(247, 239, 246)';
        welcomeHeading.style.color = 'black';
        loginInterfaceBtn.style.border = 'rgb(247, 239, 246)';
    }
    else {
        document.body.style.backgroundColor = 'red';
        pinLogin.value = userLogin.value = '';
        loginInterfaceBtn.style.backgroundColor = 'red';
        welcomeHeading.style.color = 'white';
        loginInterfaceBtn.style.border = 'red';
    }

});


// EvenListner (transferBtn).........

transferBtn.addEventListener('click', function (e) {
    console.log('clicked');

    // prevent for submitting
    e.preventDefault();

    const amountInput = Number(transferRsNumberType.value);
    const recieverAccount = accounts.find((acc) => {
        acc.userLoginName === transferNameType.value
    })
    if (amountInput > 0 && recieverAccount && currentHolderName.totalBalance >= amountInput && recieverAccount?.userLoginName !== currentHolderName.userLoginName) {

        currentHolderName.transactions.push(-amountInput);

        recieverAccount.transactions.push(amountInput);



        updateInterface(currentHolderName);


        // //display transactions.........

        // displayTransactions(currentHolderName.transactions);


        // // display crrent balance.......

        // calcDisplayCurrentBalance(currentHolderName.transactions);


        // // display summary.......

        // calcDisplaySummaryIn(currentHolderName.transactions);
        // calcDisplaySummaryOut(currentHolderName.transactions);
        // calcDisplaySummaryInterest(currentHolderName.transactions);
    }

});


//  EventListner (loanBtn)........

loanBtn.addEventListener('click', function (e) {

    e.preventDefault();

    const amountInput = Number(numberRequestLoan.value);
    if (amountInput > 0 && currentHolderName.transactions.some(trans => trans >= amountInput * 0.1)) {
        currentHolderName.transactions.push(amountInput)
        updateInterface(currentHolderName)
    }
    numberRequestLoan.value = '';
})

// EventListner (closeAccountBtn)........


closeAccountBtn.addEventListener('click', function (e) {
    // prevent for submitting
    e.preventDefault();


    if (currentHolderName?.pin === Number(numberCloseAccount.value) && (currentHolderName.userLoginName === typeCloseAccount.value)) {
        let closeAccountIndex = accounts.findIndex(acc => acc.userLoginName === currentHolderName.userLoginName);
        accounts.splice(closeAccountIndex, 1);
        ContainerInterface.style.opacity = 0;
        footerSummary.style.opacity = 0;
        welcomeHeading.textContent = ' Log in to Get Started';
    }
    typeCloseAccount.value = numberCloseAccount.value = '';
})