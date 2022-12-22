const jwt=require('jsonwebtoken')

userDetails = {
  1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
  1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }




}


// register


register = (acno, uname, psw) => {
  if (acno in userDetails) {
    return {
      statuscode: 404,
      status: false,
      message: " user already exist"
    }
  }
  else {
    userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    return {
      statuscode: 200,
      status: true,
      message: "registration sucess"
    }
  }
}


login = (acno, psw) => {


  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {

      const token=jwt.sign({currentAcno:acno},'sceretkey123')
      return {
        statuscode: 200,
        status: true,
        message: "Login sucess",
        token
      }

    }
    else {
      return {
        statuscode: 404,
        status: false,
        message: "incorrect password "
      }
    }
  }
  else {
    return {
      statuscode: 401,
      status: false,
      message: "incorect acno"
    }
  }
}

deposit = (acno, passsword, amount) => {
  var amnt = parseInt(amount)
  if (acno in userDetails) {
    if (passsword == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amnt
      userDetails[acno]["transaction"].push({ type: 'CREDIT', amount: amnt })

      return {
        statuscode: 200,
        status: true,
        message: userDetails[acno]["balance"]

      }

    }
    else {
      return {
        statuscode: 401,
        status: false,
        message: "incorect password"
      }
    }
  }
  else {
    return {
      statuscode: 401,
      status: false,
      message: "incorect account number"
    }
  }

}

withdraw = (acno, passsword, amount) => {
  var amnt = parseInt(amount)
  if (acno in userDetails) {
    if (passsword == userDetails[acno]["password"]) {
      if (amnt <= userDetails[acno]["balance"]) {
        userDetails[acno]["balance"] -= amnt
        userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: amnt })


        return {
          statuscode: 200,
          status: true,
          message: userDetails[acno]["balance"]

        }

      }
      else {
        // alert("insufficent balance")
        return {
          statuscode: 404,
          status: false,
          message: "insufficient balance"


        }
      }
    }
    else {
      return {
        statuscode: 404,
        status: false,
        message: "incorrect password"


      }
    }

  }
  else {
    // alert("incorrect ac no")
    return {
      statuscode: 404,
      status: false,
      message: "incorrect account number"


    }
  }

}

gettransaction=(acno) =>{

  if(acno in userDetails){
    return  {
      statuscode: 200,
      status: true,
      message: userDetails[acno]["transaction"]

    }
    


  }
  else{
    return {
      statuscode: 404,
      status: false,
      message: "incorrect account number"


    }
  }

}


module.exports = {
  register, login, deposit, withdraw,gettransaction
}
