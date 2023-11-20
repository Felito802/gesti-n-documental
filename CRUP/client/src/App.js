import './App.css';
import {useState} from "react";
import Axios  from "axios";
import  'bootstrap/dist/css/bootstrap.min.css'; 
import Swal from 'sweetalert2';
////////////////////////////////////////////////////////////////
import {Table, Button,Container,modal } from 'reactstrap';


function App() {


  const[dependencia,setDependencia] = useState("");
  const[usuario,setUsuario] = useState("");
  const[estado,setEstado] = useState("");
  const[nota,setNota] = useState("");
  const[nombredu,setNombredu] = useState("");
  const[ubicacion,setUbicacion] = useState("");
  const[id,setId] = useState();
  

  const[editar,setEditar] = useState(false );  
const[empleadosList,setEmpleados] = useState([])

const [resultadoBusquedaId, setResultadoBusquedaId] = useState([]);

// Agrega un estado para el ID de búsqueda
const [idBusqueda, setIdBusqueda] = useState('');

//agregar
const add=() =>{
  Axios.post("http://localhost:3001/create",{
    nombredu:nombredu,
    ubicacion:ubicacion,
    dependencia:dependencia,
   usuario:usuario,
   estado:estado,
   nota:nota
  }).then(() =>{
    getEmpleados();
    cancelar();
    Swal.fire({
      icon: "success",
      title: "<strong> resgitro exitoso</strong>",
      html: "<i>el empleado <strong>"+"</strong></i>",
  
      timer:3000
    });
  });
}
//actuliz
const update=() =>{
  Axios.put("http://localhost:3001/update",{
    id:id,
    nombredu:nombredu,
    ubicacion:ubicacion,
    dependencia:dependencia,
    usuario:usuario,
    estado:estado,
    nota:nota
  }).then(() =>{
    getEmpleados();
    cancelar();
    Swal.fire({
      icon: "success",
      title: "<strong> actualizacion exitoso</strong>",
      html: "<i>el empleado <strong>"+ dependencia+"</strong></i>",
  
      timer:3000
    });
  });
}
//eliminar
const eliminar=(val) =>{
    Swal.fire({
      title: "Aconfirmar ?",
      html: "<i>Realmente desea eliminar a <strong>"+ val.dependencia+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`,).then(() =>{
          getEmpleados();
          Swal.fire({
            title: "Eliminado!",
             text: val.dependencia+" fue eliminado ",
           icon:"success",
           timer: 3000
        });
          });
        
        
      }
    
    
  });
}
//editar
const editarE = (val)=>{
  setEditar(true);
  setNombredu(val.nombredu);
  setUbicacion(val.ubicacion);
  setDependencia(val.dependencia);
  setUsuario(val.usuario);
  setEstado(val.estado);
  setNota(val.nota);
  
  
  setId(val.id);
  
}
/////


// Función para manejar la búsqueda por ID
const buscarEmpleadoPorId = (val) => {
  Axios.get(`http://localhost:3001/buscarPorId?id=${id}`).then((response) => {
    setResultadoBusquedaId(response.data);
    setEditar(true);
    setNombredu(val.nombredu);
    setUbicacion(val.ubicacion);
    setDependencia(val.dependencia);
    setUsuario(val.usuario);
    setEstado(val.estado);
    setNota(val.nota);
    setId(val.id);
  });
};
///////////
//cancelar
const cancelar =()=> {
  setNombredu("");
  setUbicacion("");
  setDependencia("");
  setUsuario("");
  setEstado("");
  setNota("");
  setId("");
  setEditar(false);
}

//listar
const getEmpleados=() =>{
  Axios.get("http://localhost:3001/empleados").then((response) =>{
    setEmpleados(response.data);
  });
}
  return (
    <div className="container">
   
    <div className="card text-center">
      <div className="card-header">
        Proceso de Documentos
      </div>
      <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar empleado por ID"
            value={idBusqueda}
            onChange={(event) => setIdBusqueda(event.target.value)}
          />
          <button className="btn btn-primary" onClick={buscarEmpleadoPorId}>
            Buscar por ID
          </button>
        </div>


      <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ID Documento:</span>
                <input type="text" 
                  onChange={(event)=>{
                    setId(event.target.value);
                  }}
                className="form-control" value={id}  placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre Documento:</span>
          <input type="text" 
                  onChange={(event)=>{
                    setNombredu(event.target.value);
                  }}
                className="form-control" value={nombredu}  placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
          
        </div> <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Ubicacion:</span>
          <input type="text" 
                  onChange={(event)=>{
                    setUbicacion(event.target.value);
                  }}
                className="form-control" value={ubicacion}  placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
          
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Dependencia actual:</span>
          <input type="text" 
                 
                className="form-control" value={dependencia}  placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
          
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Usuario:</span>
          <input type="text" value={usuario} 
            onChange={(event)=>{
              setUsuario(event.target.value);
            }}
          className="form-control" placeholder=" " aria-label="Username" aria-describedby="basic-addon1"/>
         
        </div>
             
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Estado:</span>
          <input type="tex" value={nota} 
             onChange={(event)=>{
              setNota(event.target.value);
            }}
          className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
         
        </div>
              
        <div className="card w-80">
          <div className="card-body">
            
            <div className="input-group">
                      <span className="input-group-text">Nota</span>
                      <textarea  value={estado} 
                      onChange={(event)=>{
                        setEstado(event.target.value);
                      }}className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <div className="mb-3"> {/* Agregar una clase de margen inferior */}
      {/* Contenido entre "Nota" y "Asignar a" */}
    </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Asignar a:</span>
                <input type="tex" value={dependencia} 
              onChange={(event)=>{
              
                setDependencia(event.target.value);
              }}
          className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             
              
          </div>
        </div>

        
              
      
      </div>
      <div className="card-footer text-muted">
      <button className='btn btn-success' onClick={update}>actualizar</button>
    { /*<button className='btn btn-success' onClick={add}>enviar</button>
      <button className='btn btn-danger' onClick={cancelar}>cancelar</button>*/}
        
      </div>
</div>
      <table className="table table-striped">
          <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Ubicacion</th>
          <th scope="col">Dependencia</th>
          <th scope="col">Usuario</th>
          <th scope="col">Nota</th>
          <th scope="col">Estado</th>
        
          <th scope="col">Acciones</th>


        </tr>
      </thead>
      <tbody>
          {
            empleadosList.map((val,key)=>{
              return  <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombredu}</td>
              <td>{val.ubicacion}</td>
              <td>{val.dependencia}</td>
              <td>{val.usuario}</td>
              <td>{val.nota}</td>
              <td>{val.estado}</td>
            
              <td>

                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                  onClick={()=>{
                    editarE(val);
                  }}
                  className="btn btn-info">Editar</button>


                  <button type="button" onClick={()=>{
                      eliminar(val);
                   }}
                  className="btn btn-danger">Eliminar</button>
                  
                </div>
              </td>
           </tr>
              
              
              
              
            })
          }
       
      </tbody>
      </table>
  </div>

  );
}

export default App;
