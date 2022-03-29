// 回溯法: 八皇后问题
function resolveQueen(num) {
    const board = [...Array(num)].map((temp) => {
        return [...Array(num)].map((s) => ' *');
    });
    // printBoard(board);
    var result=[];
    function backtrack(bsdata,row){
         if(row===bsdata.length){
            result.push(cloneBoard(bsdata));
            return;
         }

         for(var col=0;col<bsdata.length;col++){
            if(!isValid(bsdata,row,col)){
                continue
            }
            bsdata[row][col]=' Q';
            backtrack(bsdata,row+1);
            bsdata[row][col]=' *';
         }
    }
    backtrack(board,0);

    // console.log(result.length);

    result.forEach((temp,index)=>{
        printBoard(temp,index);
    });

    function isValid(bsdata,row,col){
        var i;
        var j;
        // console.log('top----0->n',col);
        for( i=0;i<row;i++){
            if(bsdata[i][col]===' Q'){
                return false;
            }
        }
        
        for( i=row-1,j=col+1;i>=0&&j<bsdata.length;i--,j++){
            // console.log('topright:',i,j);
            if(bsdata[i][j]===' Q'){
                return false;
            }
        }

        for( i=row-1,j=col-1;i>=0&&j>=0;i--,j--){
            // console.log('topleft:',i,j);
            if(bsdata[i][j]===' Q'){
                return false;
            }
        }
        return true;
    }
}



resolveQueen(8)



function cloneBoard(board){
    return board.map(temp=>temp.slice());
}

function printBoard(board,index){
    console.log(`==========${index+1} start===========`)
    for(var i=0;i<board.length;i++){
        var line='';
        for(var j=0;j<board.length;j++){
            line+=board[i][j];
        }
        console.log(line);
    }
    console.log(`==========${index+1} end ===========`)
}