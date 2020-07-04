const {Manager} = require("./lib/Manager");
const {Engineer} = require("./lib/Engineer");
const {Intern} = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer");

let teamLog=[]
//switchH checks to see if there is a Mnagaer to the team
let switcH=0;

let idOfManager=1;
let idOfEmployee=2;

//choice 1) options (manager, engineer, intern,complete team)
const option1= ()=>{
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'option1',
      message: `Create a Team and Add the following to the team (must have at least one manager and someone under the manager)`,
      choices: ['Add manager','Add engineer','Add intern','*complete*'],
    },
    ])
    .then(answers => {
    
      if(answers.option1==='Add manager'&& switcH===0){
        manager();
      }
      if(answers.option1==='Add manager'&& switcH===1){
        console.log(`**A manager was already created for this team**`);
        return option1()
      };
      if(answers.option1==='Add engineer'){
        engineer();
      };
      if(answers.option1==='Add intern'){
        intern();
      };
      if(answers.option1==='*complete*'){
        complete();
      }

    })
  }

//choice 2) options (engineer, intern, complete team)




//manager information input
const manager= ()=>{
    inquirer
    .prompt([
        {
          name: 'nameMana',
          message: `What is the team's manger Name?`,
          default: 'The Name',
          validate: checkName
        },
        {
          name: 'email',
          message: `What is the team's manger Email?`,
          default: 'noemail@gmail.com',
          validate: checkEmail,

        },
        {
            name: 'officeNumber',
            message: `What is your office/room number`,
            default: '02',
          },
    
      ])
      .then(answers => {
       const managerS =new Manager(answers.nameMana,idOfManager,answers.email,'Manager',answers.officeNumber)
       teamLog.push(managerS);
       switcH++ 
       return managerS;
      })
      .then(()=>{
          option1()
      })
     
}

// engineer information input
const engineer= ()=>{
    inquirer
    .prompt([
        {
          name: 'nameEng',
          message: `What is this engineer's Name?`,
          default: 'The Name',
          validate: checkName
        },
        {
          name: 'email',
          message: `What is this engineer's Email?`,
          default: 'noemail@gmail.com',
          validate: checkEmail,
        },
          {
            name: 'github',
            message: `What is this engineer gitHub username`,
            default: 'The Name',
          },
       
      ])
      .then(answers => {
       const engineerS =new Engineer(answers.nameEng,idOfEmployee,answers.email,'Engineer',`https://github.com/${answers.github}`)
       teamLog.push(engineerS);
      //  console.log(teamLog);
      idOfEmployee++
       return engineerS
      
      })
      .then(()=>{
        option1()
    })      
     
}

// intern information input
const intern= ()=>{
    inquirer
    .prompt([
        {
          name: 'nameInt',
          message: `What is this intern's Name?`,
          default: 'The Name',
          validate: checkName
        },
        {
          name: 'email',
          message: `What is this intern's Email?`,
          default: 'noemail@gmail.com',
          validate: checkEmail,
        },
          {
            name: 'school',
            message: `What University does this intern attends?`,
            default: 'N/A',
          },
      ])
      .then(answers => {
       const internS =new Intern(answers.nameInt,idOfEmployee,answers.email,'Intern',answers.school)
      teamLog.push(internS);
      idOfEmployee++
      return internS
      })
      .then(()=>{
        option1()
    })
   
      
     
}

const complete= ()=>{
  if (teamLog.length>1 && switcH===1){
    // console.info(`team is complete`&& teamLog);
    fs.writeFileSync(outputPath, render(teamLog),function(err){
        if(err) throw err;
        }
    )
  }else{
    console.info('**Add at least one Manager and one Engineer to the team**')
    option1()
  }
}


// input validations
const checkEmail= (email)=> {
  
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

    if (valid) {
      console.log("emaill accepted");
        return true;
    } else {
        console.log(".  Please enter a valid email")
        return false;
    }
}

const checkName= (name)=>{ 
let letters = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
if(letters)
{
console.log('Validated');
return true;
}
else
{
console.log(`  Please input alphabet characters only`);
return false;
}
}




async function asyncF(){
let runIt= await option1()

}

asyncF()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
