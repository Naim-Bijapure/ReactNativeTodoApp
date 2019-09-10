

const todoApp =  (state = [], action) => {
  switch (action.type) {
    case 'GET_TODO':
      
        var newState=[];
        if (action.params) {
          
          newState.push(...action.params);
          return [...newState];
        }else{
        return [...state]
        }

    case 'ADD_TODO':
        console.log('todo action',action);
        var newState=[];
        newState.push(...action.params);
     return [...newState];

     case 'FILTER_TODO':

       let filterState=[...action.params.data];
        if (action.params.category=='All') {
          
         return [...filterState];
        }else{

          let newFilterState=filterState.filter((e)=>{
            if (e.category==action.params.category) {
              return e; 
            }
          });
          
          return [...newFilterState];
        }
    default:
      return state
  }
}

export default todoApp;
