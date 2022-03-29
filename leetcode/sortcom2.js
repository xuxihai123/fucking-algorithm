//回溯算法的框架, 解决组合问题

/**
 * result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return
    
    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
 */

const list = [1, 2, 3, 4];

var num = 0;

var ret = [];

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function sortarr(list, count) {
    function backtrack(list, result) {
        // printIndent(num++,result,count);
        if (result.length === count) { // 满足条件,记录.
            console.log('finish====',result);
            let set = new Set(result.slice())
            ret.push(set);
            return;
        }
        for (var i = 0; i < list.length; i++) {
            if (result.indexOf(list[i]) === -1) {
                result.push(list[i]); // 做选择
                backtrack(list,result);// 进入下一层
                result.pop(); // 回溯
            }
        }
        // printIndent(--num);
    }
    return backtrack(list, []);
}

sortarr(list,2);

function printIndent(n,msg) {
    console.log('=>'.repeat(n),msg?msg:'');
}

console.log(ret);
console.log(ret.length);
