firebase.initializeApp({
    apiKey: "AIzaSyBIFjhcH-IUMPcBqxZAduyBMQO6pdbO0yQ",
    authDomain: "talleropenshift.firebaseapp.com",
    databaseURL: "https://talleropenshift.firebaseio.com",
    projectId: "talleropenshift",
    storageBucket: "talleropenshift.appspot.com",
    messagingSenderId: "704393218436"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function guardar() {

    var nombre = document.getElementById('nombre').value;
    var cedula = document.getElementById('cedula').value;
    var email = document.getElementById('email').value;
    var carrera = document.getElementById('carrera').value;

    db.collection("user").add({
        nombre: nombre,
        cedula: cedula,
        email: email,
        carrera: carrera
    })
        .then(function (docRef) {
            console.log("se guardo el id: ", docRef.id);
            var nombre = document.getElementById('nombre').value = '';
            var cedula = document.getElementById('cedula').value = '';
            var email = document.getElementById('email').value = '';
            var carrera = document.getElementById('carrera').value = '';
        })
        .catch(function (error) {
            console.error("Error al guardar: ", error);
        });
  
}

//Listar datos
var tabla = document.getElementById('tabla');
db.collection("user").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `        
        <tr>
        <th scope = "row">${doc.id}</th >
        <td>${doc.data().nombre}</td>
        <td>${doc.data().cedula}</td> 
        <td>${doc.data().email}</td>
        <td>${doc.data().carrera}</td>        
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().cedula}','${doc.data().email}','${doc.data().carrera}')">Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>  
        ` 
    });
});
//Editrar datos 
function editar(id, nombre, cedula, email, carrera) {    

    document.getElementById("nombre").value = nombre;
    document.getElementById("cedula").value = cedula;
    document.getElementById("email").value = email;
    document.getElementById("carrera").value = carrera;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {

        var washingtonRef = db.collection("user").doc(id);

        var nombre = document.getElementById("nombre").value;
        var cedula = document.getElementById("cedula").value;
        var email = document.getElementById("email").value;
        var carrera = document.getElementById("carrera").value;


        return washingtonRef.update({
            nombre: nombre,
            cedula: cedula,
            email: email,
            carrera: carrera
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                var nombre = document.getElementById('nombre').value = '';
                var cedula = document.getElementById('cedula').value = '';
                var email = document.getElementById('email').value = '';
                var carrera = document.getElementById('carrera').value = '';
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
        
    }
}

//borrar datos
function eliminar(id) {
    db.collection("user").doc(id).delete().then(function () {
        console.log("Usuario Eliminado");
    }).catch(function (error) {
        console.error("Error al eliminarlo ", error);
    });
}
