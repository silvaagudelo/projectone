const yargs = require('yargs');
const b = require('./base');
console.log("Bienvenido a la academia de NodeJS! Disfrutalo.");
yargs.command({
    command:"enroll",
    describe:"Proceso de enrolamiento",
    builder:{
        courseId:{
            alias:"c",
            describe: "course identification",
            demandOption:true
        },
        name:{
            alias:"n",
            describe: "concerned username",
            demandOption:true
        },
        id:{
            alias:"i",
            describe: "user id",
            demandOption:true
        }
    },
    handler(argv) {
        if (argv){
            b.enrollment(argv);
        }else{
            console.log("Incompleted information.");
        }
    }
}).command({
    command:"list",
    describe:"Listado de cursos disponibles",
    handler() {
        console.log("Listando los cursos disponibles");
        b.getCourses();
    }
}).argv;