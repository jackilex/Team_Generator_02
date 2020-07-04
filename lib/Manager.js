// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const {Employee}= require('./Employee');

//Creaating Mangager sub-class
class Manager extends Employee{
    constructor(name,id,email,role,officeNumber){
        super(name,id,email,role);
        this._officNumber=officeNumber
        this._role=role;
    }

    getRole(){
        return this._role
    };

    getOfficeNumber(){
        return this._officNumber
    };

}

module.exports={Manager}
