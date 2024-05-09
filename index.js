import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const { Client } = pkg;
const password = process.env.password

if (typeof password !== 'string') {
    throw new Error('La contraseña de la base de datos debe ser una cadena');
  }

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Always_music',
    password: password,
    port: 5432

})

// 1.Crear una función asíncrona para registrar un nuevo estudiante en la base de datos
const nuevoEstudiante = async (nombre, rut, curso, nivel) => {
    client.connect()
    await client.query(`INSERT INTO estudiantes( nombre,rut, curso, nivel) VALUES ( '${nombre}', '${rut}', '${curso}', '${nivel}')`)
    client.end()
}

//2.  Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut. 
const getEstudiante = async (rut) => {
    client.connect()
    const estudiante = await client.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`)
    console.log(estudiante.rows)
    return estudiante.rows
    client.end()
}

//3. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const getEstudiantes = async () => {
    client.connect()
    const estudiantes = await client.query("SELECT * FROM estudiantes")
    console.log(estudiantes.rows)
    return estudiantes.rows
    client.end()
}
//4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.

const updateEstudiante= async ( nombre, rut, curso, nivel ) => {
    client.connect()
            await client.query(`UPDATE estudiantes set nombre='${nombre}', rut='${rut}', curso='${curso}', nivel='${nivel}' WHERE rut='${rut}' `)
        
    client.end()
}

//5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteEstudiante = async (rut) => {
    client.connect()
    await client.query(`DELETE FROM estudiantes WHERE rut = '${rut}'`)
    console.log(`Registro de estudiante con rut ${rut} eliminado`)
    client.end()
}

const argumentos = process.argv.slice(2)
const funcion = argumentos[0]
const testConsultas = () => {
    if (funcion === 'nuevo') {
        nuevoEstudiante(argumentos[1], argumentos[2], argumentos[3], argumentos[4])
    }
    else if (funcion === 'consulta_todos') {
        getEstudiantes()
    }
    else if (funcion === 'consulta_rut') {
        getEstudiante(argumentos[1])
    }
    else if (funcion === 'editar') {
        updateEstudiante(argumentos[1], argumentos[2], argumentos[3], argumentos[4])
    }
    else if (funcion === 'eliminar') {
        deleteEstudiante(argumentos[1])
    }
}
testConsultas()

 //Prueba consultas
 
// node index.js nuevo 'Pedro Torres' 12345678 Piano Avanzado
// node index.js consulta_todos
// node index.js consulta_rut '23456789-0'
// node index.js editar 'Pedro Torres' 12345678 Piano Medio
// node index.js eliminar '12345678'
