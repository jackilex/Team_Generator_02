// TODO: Write code to define and export the Employee class
//super Class
class Employee{
    constructor(name,id,email,role){
        this._name=name;
        this._id=id;
        this._email=email;
        this._role=role
    }
    get name(){
        return this._name
    };

    get id(){
        return this._id
    };

    get email(){
        return this._email
    };

    get role(){
        return this._role
    };
}

module.exports={Employee}
