interface ILogin {
    email : string,
    password: string,
}

interface IRegister extends ILogin  {

    mobile: string
}