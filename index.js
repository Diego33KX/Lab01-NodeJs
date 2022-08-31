import express, { request, response } from "express";

//npm i nodemon -D --> Se utiliza para que el servidor se actualice
const app = express();
//app.use sirve para que nuestro servidor pueda entender lo que el usuario le envies
//npm run dev --> se utiliza porque node no cuenta con el comando dev por defecto, a difenrencia de start, 
//que se puede ejecutar como npm start
app.use(express.json());
const people = [];

app.get("/", (request, response) => {
//response es la respuesta del servidor (JSON)
//request es la peticion del cliente
    return response.json({
        ok:true,
        data: people
    });

});
app.post("/create", function(req,res){
    //body almacena los que el usuario envia
    // destructuracion const { name, last_name} = req.body;
    const data = req.body;
    data.id = people.length+1;
    people.push(data);
    //people.push(res.body);
    //El estatus 201 se envia si fue creado con exito
    //500 es para error (el servidor no respondes)
    //responder que no hay servicio 401 o 404 (no encuentra)
    return res.status(201).json({
        ok:true,
        data:"Persona creada",

    });
});

//METODO PUT
app.put("/update", (request,response)=>{

    const data = request.body;

 
    function actualizarDatosDeLaPersona(id,newNombre,newApellido,newEdad,newTelefono){
        const personaEncontrada = people.find((person) =>{
            return person.id === id;
        });
        
        personaEncontrada["nombre"] = newNombre;
        personaEncontrada["apellido"] = newApellido;
        personaEncontrada["edad"] = newEdad;
        personaEncontrada["telefono"] = newTelefono;
    }

    actualizarDatosDeLaPersona(data.id,data.nombre,data.apellido,data.edad,data.telefono)
    //console.log(people)

    return response.status(200).json({
        ok:true,
        data:"Persona actualizada con exito",
        //nuevosDatos: people
    })

})

//METODO DELETE
app.delete("/delete", (request, response) => {
    const data = request.body;
    
   
    function eliminarPersona(id){
        //const index = people.findIndex((element) => element == id)
        //index--> elimina segun el indice
        //el segundo paràmetro del splice indica cuantos elementos eliminaremos, en este caso solo 1
        people.forEach(function(person, index, object){
            if(person.id == id){
                object.splice(index,1);
            }
        })
    }
    eliminarPersona(data.id)

    return response.status(200).json({
        ok:true,
        data:"Persona eliminasa satisfactoriamente",
        //datos: people
    })
})


app.listen(6004, () => 
    console.log(`El servidor inicio en http://localhost:6004`)
);