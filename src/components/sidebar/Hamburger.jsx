'use client'
function Hamburger(){
  const hamburgerClick = (e) => {
    // e.stopPropagation();
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("show");
    const hide = function(e){
        if(!sidebar.contains(e.target)){ // How can we tell if the user clicks outside of the SideBar?
          e.preventDefault();
          sidebar.classList.remove("show");
          document.removeEventListener('click', hide);
        }
    }
    document.addEventListener('click', hide);
  }
  return(
    <span id="hamburger-container" onClick={hamburgerClick}>
      <span id="hamburger" ></span> 
    </span>
  )
}

export default Hamburger;