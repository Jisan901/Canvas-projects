let arr = [...Array(360)].map((e,i)=>i+1)
let XvalueArr = []
let YvalueArr = []
let positions = []


for (let i = 0; i < arr.length; i++) {
    let X = Math.sin(arr[i])*4
    let Y = Math.cos(arr[i])*4
    XvalueArr.push(X)
    YvalueArr.push(Y)
    positions.push({
        x:X,
        y:Y
    })
}

let XString = ''
let YString = ''

for (let i = 0; i < positions.length; i++) {
    XString+=`${positions[i].x} `
    YString+=`${positions[i].y} `
}
console.log(YString);