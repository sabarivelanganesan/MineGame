mineGame();
function mineGame(){
var board = document.getElementById('playboard');
var printMineCount = document.getElementById('printminecount');
var printFlagCount = document.getElementById('printflagcount');
var initial_click = true;
var game_over = false;
var flag_count = 10;
var mine_count = 10;
startGame();

function startGame(){ 
  printMineCount.innerHTML = mine_count;
  printFlagCount.innerHTML = flag_count;
  board.style.color = 'green';
  board.innerHTML = '';  
  for(let board_row=0; board_row<8; board_row++){
     row = board.insertRow(board_row);
     for(let board_col=0; board_col<10; board_col++){
        cell = row.insertCell(board_col);
        var click_state = document.createAttribute("clicked");
        click_state.value = false;
        cell.setAttributeNode(click_state);
        var click_state_for_right = document.createAttribute("right-clicked");
        click_state_for_right.value = false;
        cell.setAttributeNode(click_state_for_right);
        cell.onclick = function() {
            if(game_over){
                alert(`Game Over :(`);
                return mineGame();
            }
            clickCell(this);
        }
            cell.oncontextmenu = function() {
                rightClick(this);
            }
        var mine = document.createAttribute("data-mine");       
        mine.value = "false";             
        cell.setAttributeNode(mine);
     }
  }
}

function rightClick(cell){
    if(cell.getAttribute("right-clicked")=="true"){
        cell.setAttribute("right-clicked" , "false");
        cell.innerHTML = '';
        mine_count++;
        flag_count++;
        printFlagCount.innerHTML = flag_count;
        return;
    }
    if(cell.getAttribute("right-clicked")=="false") cell.setAttribute("right-clicked" , "true");

      if(cell.getAttribute("clicked")=="false" && flag_count>0){
        cell.innerHTML = '&#128681';
        debugger;
        if(cell.getAttribute('data-mine') == 'true'){
            mine_count--;
            if(mine_count == 9){
                alert('Congratulation You Won :)');
                if(confirm("Do you want to continue the game")){
                  return mineGame();
                 }
            }
        }
        flag_count--;
        printFlagCount.innerHTML = flag_count;
        console.log(mine_count+" "+flag_count);
      }

      
    window.oncontextmenu = (e) => {
        e.preventDefault();
      }
}

function clickCell(cell){
    if(cell.getAttribute("right-clicked")=="false"){
        if(cell.getAttribute("clicked")=="false") cell.setAttribute("clicked" , "true");
        if(cell.getAttribute('data-mine')=='true' && cell.getAttribute("clicked")=="true"){
            gameOver();
        } 
        else{
          var row = cell.parentNode.rowIndex;
          var col = cell.cellIndex;
        //   console.log(row+" "+col);
          var minecount=0;
          if(initial_click){
            addMine();
            initial_click = false;
          } else {
             for(let cell_row=Math.max(row-1,0); cell_row<=Math.min(row+1,7); cell_row++){
                for(let cell_col=Math.max(col-1,0); cell_col<=Math.min(col+1,9); cell_col++){
                    if(board.rows[cell_row].cells[cell_col].getAttribute('data-mine')=='true'){
                        minecount++;
                        cell.setAttribute('clicked', 'true');
                    } 
                }
            }
        }
          if(minecount != 0){
            cell.innerHTML = `<img class='png-size' src="Assets/images/icon${minecount}.png">`;
          } 
          cell.style.backgroundColor = 'rgb(214, 172, 117)';
          if(minecount == 0){
              for(let cell_row=Math.max(row-1,0); cell_row<=Math.min(row+1,7); cell_row++){
                  for(let cell_col=Math.max(col-1,0); cell_col<=Math.min(col+1,9); cell_col++){
                      if( board.rows[cell_row].cells[cell_col].getAttribute('data-mine') == 'false' && 
                          board.rows[cell_row].cells[cell_col].getAttribute('clicked') == 'false'){
                             clickCell(board.rows[cell_row].cells[cell_col]);
                      }
                  }
              }
          }
        }     
    }
}

function addMine(){
    for(let index=0; index<10; index++){
        var row = Math.floor(Math.random() * 8);
        var col = Math.floor(Math.random() * 10);
        var cell = board.rows[row].cells[col];
        if(cell.getAttribute("data-mine")=="false" && cell.getAttribute('clicked')=='false'){
          cell.setAttribute("data-mine","true");
        }
        else{
            index--;
        }
     }  
}

function gameOver(){
    for(let index=0; index<8; index++){
        for(let index1=0; index1<10; index1++){
            var cell = board.rows[index].cells[index1];
            if (cell.getAttribute("data-mine")=="true") cell.innerHTML='&#x1f4a3;';
        }
    }
    printFlagCount.innerHTML = 10;
    game_over = true;
}
}
