const fs = require('fs');   
const outputTime = 2;

const readAll = () => {
    try {
        const buffer = fs.readFileSync('courses.json');
        const JsonArray = buffer.toString();
        return JSON.parse(JsonArray);
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getCourses = () => {
    const buffer = readAll();
    buffer.forEach((buffer, index) => {
        setTimeout(() => {
            console.log(`El curso ${buffer.id} tiene por nombre ${buffer.nombre}.` +
                ` Tiene una duración de ${buffer.duracion} horas y un valor de ${buffer.valor} COP`)
        }, (outputTime * 1000) * (index + 1));
    });
}

const enrollment = (argv) => {
    if (!argv.id || !argv.courseId || !argv.name){
        console.log( "Argumentos incompletos, por favor verifique");
        return;
    }
    const courses = readAll();
    if (courses){
        const itemArray = courses.find(itemArray => itemArray.id === argv.courseId);
        if (itemArray) {
            const informacion = `El estudiante ${argv.name} con cedula ${argv.i} se ha matriculado` +
                ` en el curso llamado ${itemArray.nombre} tiene una duracion de ${itemArray.duracion} horas y un valor de ${itemArray.valor} pesos`;
            fs.writeFile(`infoMatricula_${argv.id}.log`, informacion, (err) => {
                if (err) throw (err);
                console.log('Se ha registrado la información en el archivo de texto');
            })
        } else {
            console.log('No se reconoce el curso indicado. Si deseas obtener información de los cursos disponibles por favor ejecutar el siguiente comando:');
            console.log('node index.js list');
        }
    }else{
        console.log("Actualmente no hay cursos disponibles. Por favor verifica el archivo courses.json para ingresarlos");
    }
}

module.exports = {
    enrollment: enrollment,
    getCourses: getCourses
}