// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const {Employee}= require('./Employee');

//Creaating Intern sub-class
class Intern extends Employee{
    constructor(name,id,email,role,school){
        super(name,id,email,role);
        this._school=school;
        this._role=role;
    }

    get role(){
        return this._role
    };

    get school(){
        return this._school
    };

}

module.exports={Intern}
