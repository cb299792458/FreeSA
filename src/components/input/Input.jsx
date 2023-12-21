import "./Input.scss";

export default function Input({ setState, type, id, label }){

    function change(e){
        setState(e.target.value);
    }
    
    return(
        <div className="controlledInput">
            <label htmlFor={id} >{label}<br/>
                <input type={type} id={id} onChange={change} />
                <div className="inputError" id={id+"-error"}>Error</div>
            </label>
        </div>
    )
}