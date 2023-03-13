var theLift = function(queues, capacity)
{
  let currentFloor = 0;
  let floors = [];
  let lift = [];
  let cap = false;
  let doOnce = true;
  let waiting = true;
  let dir = 1;
  let i = 0;
  let cnt = 0;
  for(;waiting;)
  {
    let dropped = false;
    for(let k = 0; k < lift.length; k++)
      if(lift[k] == currentFloor)
        lift.splice(k, 1), cap = false, dropped = true, k--;
    if(dropped)
      floors.push(currentFloor);
    
    if(!cap)
    {
      let inc = false;
      for(let j = 0; j < queues[i].length; j++)
      {
        if(lift.length >= capacity)
        {
          cap = true;
          break;
        }
        if(dir)
          if(queues[i][j] > currentFloor)
            lift.push(queues[i][j]), queues[i].splice(j, 1), j--, inc = true;
        if(!dir)
          if(queues[i][j] < currentFloor)
            lift.push(queues[i][j]), queues[i].splice(j, 1), j--, inc = true;
      }
      if(inc && !dropped)
        floors.push(currentFloor);
      if(doOnce)
      {
        if(!floors.length)
          floors.push(0);
        doOnce = false;
      }
        
    }
    else if(cap)
    {
      let pp = false;
      if(queues[i].length)
        for(let p = 0; p < queues[i].length; p++)
          if(queues[i][p] > currentFloor && dir)
            pp = true;
          else if(queues[i][p] < currentFloor && !dir)
            pp = true;
      if(pp)
        floors.push(i);
    }
    
    if(dir)
      currentFloor++, i++;
    if(!dir)
      currentFloor--, i--;
    
    if(lift.length == capacity)
      cap = true;
    waiting = false;
    for(let q = 0; q < queues.length; q++)
    {
      if(queues[q].length)
      {
        waiting = true;
        break;
      }
    }
    
    if(!waiting && !lift.length)
      waiting = false;
    else
      waiting = true;
    
    if(currentFloor == queues.length - 1 || !currentFloor)
      if(dir == 0)
      dir = 1;
      else
        dir = 0;
  }
  
  if(floors[floors.length - 1])
    floors.push(0);
  
  for(let i = 0; i < floors.length - 1; i++)
    if(floors[i] == floors[i + 1])
      floors.splice(i, 1);
  return floors;
};
