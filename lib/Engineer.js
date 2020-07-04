// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const {Employee}= require('./Employee');

//Creaating Engineer sub-class
class Engineer extends Employee{
    constructor(name,id,email,role,github){
        super(name,id,email,role);
        this._github=github;
        this._role=role;
    }

    get role(){
        return this._role
    };

    get github(){
        return this._github
    };

}

module.exports={Engineer}
