
const isEmail = (val) =>
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
.test(val)
function isNumeric(str){
    return /^\d+$/.test(str);
}

export const rules = {
    email:{
        required:{
            value:true,
            message: 'Email is required',
        },
        minLength:{
            value:4,
            message:'Emails are between 4 and 160 characters in length'
        },
        maxLength:{
            value:160,
            message:'Emails are between 4 and 160 characters in length'
        },
        validate:{
            email: val=>isEmail(val) || "Please enter correct Email format"   
        }
    },
    password:{
        required:{
            value:true,
            message: 'Password is required'
        },
        minLength:{
            value:8,
            message:'Password are between 8 and 50 characters in length'
        },
        maxLength:{
            value:50,
            message:'Password are between 8 and 50 characters in length'
        },
    },
    confirmpassword:{
        required:{
            value:true,
            message: 'Confirm password is required'
        },
        minLength:{
            value:8,
            message:'Password are between 8 and 50 characters in length'
        },
        maxLength:{
            value:50,
            message:'Password are between 8 and 50 characters in length'
        },        
    },
    // referral_code: {
    //     required:{
    //         value:true,
    //         message: 'Referral code is required'
    //     },
    // },
    codeotp:{
        required:{
            value:true,
            message: 'Registration code is required'
        },
        minLength:{
            value:6,
            message:'Registration code must be 6 characters'
        },
        maxLength:{
            value:6,
            message:'Registration code must be 6 characters'
        },   
        validate:{
            codeotp: val=>isNumeric(val) || "Enter the code must be a number "   
        }     
    },
    codeotpForgot: {
        required:{
            value:true,
            message: 'Forgot password code is required',
        },
    },
    username: {
        required:{
            value:true,
            message: 'Username is required',
        },
    },
    Phone: {
        required:{
            value:true,
            message: 'Phone is required',
        },
    },
    address: {
        required:{
            value:true,
            message: 'Address is required',
        },
    }
}
