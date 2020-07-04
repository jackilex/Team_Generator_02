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
let switcH=0;

//choice 1) options (manager, engineer, intern,complete team)
const option1= ()=>{
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'option1',
      message: `Add the following to the team`,
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
          default: 'Manager',
        },
        {
          name: 'email',
          message: `What is the team's manger Email?`,
          default: 'noemail@gmail.com',
        },
        {
            name: 'officeNumber',
            message: `What is your office/room number`,
            default: 'Manager',
          },
          {
            name: 'id',
            message: `enter this employee ID`,
            default: '0',
          },
      ])
      .then(answers => {
       const managerS =new Manager(answers.nameMana,answers.id,answers.email,'Manager',answers.officeNumber)
    //    let manageR={
    //      name:managerS.name,
    //      id:managerS.id,
    //      email: managerS.email,
    //      role:managerS.role,
    //      office:managerS.officNumber

    //    }
       
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
          default: 'Manager',
        },
        {
          name: 'email',
          message: `What is this engineer's Email?`,
          default: 'noemail@gmail.com',
        },
          {
            name: 'github',
            message: `What is this engineer gitHub username`,
            default: 'username',
          },
          {
            name: 'id',
            message: `enter this employee ID`,
            default: '0',
          },
      ])
      .then(answers => {
       const engineerS =new Engineer(answers.nameEng,answers.id,answers.email,'Engineer',answers.github)
    //    let engineeR={
    //     name:engineerS.name,
    //     id:engineerS.id,
    //     email: engineerS.email,
    //     role:engineerS.role,
    //     github:engineerS.github
    //   }
       teamLog.push(engineerS);
      //  console.log(teamLog);
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
          default: 'Manager',
        },
        {
          name: 'email',
          message: `What is this intern's Email?`,
          default: 'noemail@gmail.com',
        },
          {
            name: 'school',
            message: `What University does this intern attends?`,
            default: 'N/A',
          },
          {
            name: 'id',
            message: `enter this employee ID`,
            default: '0',
          },
      ])
      .then(answers => {
       const internS =new Intern(answers.nameInt,answers.id,answers.email,'Intern',answers.school)
    //    let interN={
    //     name:internS.name,
    //     id:internS.id,
    //     email: internS.email,
    //     role:internS.role,
    //     school:internS.school
    //   }
      teamLog.push(internS);
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





async function asyncF(){
option1()

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
