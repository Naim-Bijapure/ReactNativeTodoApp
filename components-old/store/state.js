
class State {
   constructor(){
       this.state=false;
   } 
changeState=(state)=>{
    this.state=state;
    return this.state;
}
}
export default State;