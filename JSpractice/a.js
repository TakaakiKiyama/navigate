//変数の定義（仕方なくここに持ってきたのもある）
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var sphere, arrowHelper;
var matsp,mat1,mat2,mat3,mat4,stairmat,elevmat,stair2mat;
var timelineTime = 200;
var gridHelper = new THREE.GridHelper( 30, 20, 0xFFFF00, 0xFFFFFF);
var flag = 0;
var countgrid = 0;
var cameraflag = 0;
var endflag = 0;
var right = left = forward = back = 0;
var endpoint,wayofchange,wayofchange2,wayofchange3;
var stair11, stair22, elev11;
var elev = "elev", stair1 = "stair1", stair2 = "stair2";
//グッリッドの表示と削除の関数                                  ↓↓↓↓↓
//functions for button
function Editgrid(){
  gridHelper.position.set(0,2,0);
  if(countgrid%2 != 0){
    scene.remove(gridHelper);
  }else{
    console.log("a");
    scene.add(gridHelper);
  }
  countgrid++;
}
function Addgrid(){
  ///make a coordinate system
  gridHelper.position.set(0,2,0);
  scene.add(gridHelper);
  ///make a cordinate system end
}
//グリッドの表示と削除                                          ↑↑↑↑↑

//アニメーションのときに必要な値の定義                           ↓↓↓↓↓
var userOpts	= {
  range		: 10,
  duration	: 1000,
  delay		: 20,
};
var currentdir = {x:0,y:1.57,z:-1.57};
//route information
var ops = {
  stairop:0,
  stairposx:0.85,
  stairposy:18,
  stairposz:4.7,

  stairop2:0,
  stairpos2x:27.8,
  stairpos2y:18,
  stairpos2z:4.6,

  elevop:0,
  elevposx:-0.85,
  elevposy:18,
  elevposz:4.7
}
var current = { x: 0, y:2 ,z:12};//
var currentop = { op1:1, op2:0, op3:0, op4:0 };
var currentcam = {x:0,y:35,z:0,_w:0.7,_x:-0.7,_y:0,_z:0};
var currentrot = {_x:Math.PI*3/2,_y:0,_z:0};
var positions = {
  1:{
    opacity:  1,
    floorNum: 1,
    height:   2,
    pointA:   {x:-6, y:2, z:12},
    pointB:   {x:-6, y:2, z:0},
    pointC:   {x:6, y:2, z:0},
    pointD:   {x:6, y:2, z:-12},
    elev:     {x:-0.9, y:2, z:4.7},
    esca:     {x:-26.5, y:2, z:4.6},
    stair :   {x:0.9, y:2, z:4.7},
    pointE:    {x:-6, y:2, z:-12}, //pointE
    pointF:   {x:6, y:2, z:12},

    W1A: {x:-18, y:2, z:-12},
    W1B: {x:-18, y:2, z:4.5},
    W1C: {x:-7.5, y:2, z:0},
    W1D: {x:-18, y:2, z:12},

    E1A: {x:18, y:2, z:-12},
    E1B: {x:7.5, y:2, z:0},
    E1C: {x:18, y:2, z:4.5},


    START:{x:0, y:2, z:12},
    START2:{x:0, y:2, z:8.3},
    A: {x:-23, y:2, z:-8.3},
    B: {x:-18, y:2, z:-8.3},
    C: {x:-3.5, y:2, z:-8.3},
    D: {x:0, y:2, z:-8.3},
    E: {x:3.5, y:2, z:-8.3},
    F: {x:18, y:2, z:-8.3},
    G: {x:23, y:2, z:-8.3},
    H: {x:-23, y:2, z:0},
    I: {x:-3.5, y:2, z:0},
    J: {x:3.5, y:2, z:0},
    K: {x:23, y:2, z:0},
    L: {x:-26.5, y:2, z:8.3},
    M: {x:-23, y:2, z:8.3},
    N: {x:-18, y:2, z:8.3},
    O: {x:-3.5, y:2, z:8.3},
    P: {x:-0.9, y:2, z:8.3},
    Q: {x:0.9, y:2, z:8.3},
    R: {x:3.5, y:2, z:8.3},
    S: {x:18, y:2, z:8.3},
    T: {x:23, y:2, z:8.3}

  },
  2:{
    opacity:  0.2,
    floorNum: 2,
    height:   14,
    pointA:   {x:-6,y:14,z:12},
    pointB:   {x:-6, y:14, z:0},
    pointC:   {x:6, y:14, z:0},
    pointD:   {x:6, y:14, z:-12},
    elev:     {x:-0.9, y:14, z:4.7},
    esca:     {x:-26.5, y:14, z:4.6},
    stair :   {x:0.9, y:14, z:4.7},
    pointE:   {x:-6, y:14, z:-12},
    pointF:   {x:6, y:14, z:12},

    W2A: {x:-18, y:14, z:-12},
    W2B: {x:-26.5, y:14, z:0},
    W2C: {x:-7.5, y:14, z:0},
    W2D: {x:-18, y:14, z:4.5},
    W2E: {x:-18, y:14, z:12},

    E2A: {x:18, y:14, z:-12},
    E2B: {x:7.5, y:14, z:0},
    E2C: {x:18, y:14, z:4.5},
    E2D: {x:26.5, y:14, z:0},
    E2E: {x:18, y:14, z:12},

    A: {x:-23, y:14, z:-8.3},
    B: {x:-18, y:14, z:-8.3},
    C: {x:-3.5, y:14, z:-8.3},
    D: {x:0, y:14, z:-8.3},
    E: {x:3.5, y:14, z:-8.3},
    F: {x:18, y:14, z:-8.3},
    G: {x:23, y:14, z:-8.3},
    H: {x:-23, y:14, z:0},
    I: {x:-3.5, y:14, z:0},
    J: {x:3.5, y:14, z:0},
    K: {x:23, y:14, z:0},
    L: {x:-26.5, y:14, z:8.3},
    M: {x:-23, y:14, z:8.3},
    N: {x:-18, y:14, z:8.3},
    O: {x:-3.5, y:14, z:8.3},
    P: {x:-0.9, y:14, z:8.3},
    Q: {x:0.9, y:14, z:8.3},
    R: {x:3.5, y:14, z:8.3},
    S: {x:18, y:14, z:8.3},
    T: {x:23, y:14, z:8.3}
  },
  3:{
    opacity:  0.2,
    floorNum: 3,
    height:   26,
    pointA:   {x:-6, y:26, z:12},
    pointB:   {x:-6, y:26, z:0},
    pointC:   {x:6, y:26, z:0},
    pointD:   {x:6, y:26, z:-12},
    elev:     {x:-0.9, y:26, z:4.7},
    esca:     {x:-26.5, y:26, z:4.6},
    stair :   {x:0.9, y:26, z:4.7},
    stair1:   {x:0.9, y:26, z:-12},
    pointE:   {x:-6, y:26, z:-12},
    pointF:   {x:6, y:26, z:12},

    W3A: {x:-18, y:26, z:-12},
    W3B: {x:-26.5, y:26, z:0},
    W3C: {x:-7.5, y:26, z:0},
    W3D: {x:-18, y:26, z:4.5},
    W3E: {x:-18, y:26, z:12},

    E3A: {x:18, y:26, z:-12},
    E3B: {x:7.5, y:26, z:0},
    E3C: {x:18, y:26, z:4.5},
    E3D: {x:26.5, y:26, z:0},
    E3E: {x:18, y:26, z:12},

    A: {x:-23, y:26, z:-8.3},
    B: {x:-18, y:26, z:-8.3},
    C: {x:-3.5, y:26, z:-8.3},
    D: {x:0, y:26, z:-8.3},
    E: {x:3.5, y:26, z:-8.3},
    F: {x:18, y:26, z:-8.3},
    G: {x:23, y:26, z:-8.3},
    H: {x:-23, y:26, z:0},
    I: {x:-3.5, y:26, z:0},
    J: {x:3.5, y:26, z:0},
    K: {x:23, y:26, z:0},
    L: {x:-26.5, y:26, z:8.3},
    M: {x:-23, y:26, z:8.3},
    N: {x:-18, y:26, z:8.3},
    O: {x:-3.5, y:26, z:8.3},
    P: {x:-0.9, y:26, z:8.3},
    Q: {x:0.9, y:26, z:8.3},
    R: {x:3.5, y:26, z:8.3},
    S: {x:18, y:26, z:8.3},
    T: {x:23, y:26, z:8.3}



  },
  4:{
    opacity:  0.2,
    floorNum: 4,
    height:   38,
    pointA:   {x:-6, y:38, z:12},
    pointB:   {x:-6, y:38, z:0},
    pointC:   {x:6, y:38, z:0},
    pointD:   {x:6, y:38, z:-12},
    pointE:   {x:-6, y:38, z:-12},
    elev:     {x:-0.9, y:38, z:4.7},
    esca:     {x:-26.5, y:38, z:4.6},
    stair :   {x:0.9, y:38, z:4.7},
    pointF:   {x:6, y:38, z:12},

    W4A: {x:-18, y:38, z:-12},
    W4B: {x:-26.5, y:38, z:0},
    W4C: {x:-7.5, y:38, z:0},
    W4D: {x:-18, y:38, z:4.5},
    W4E: {x:-18, y:38, z:12},

    E4A: {x:18, y:38, z:-12},
    E4B: {x:7.5, y:38, z:0},
    E4C: {x:18, y:38, z:4.5},
    E4D: {x:26.5, y:38, z:0},
    E4E: {x:18, y:38, z:12},

    A: {x:-23, y:38, z:-8.3},
    B: {x:-18, y:38, z:-8.3},
    C: {x:-3.5, y:38, z:-8.3},
    D: {x:0, y:38, z:-8.3},
    E: {x:3.5, y:38, z:-8.3},
    F: {x:18, y:38, z:-8.3},
    G: {x:23, y:38, z:-8.3},
    H: {x:-23, y:38, z:0},
    I: {x:-3.5, y:38, z:0},
    J: {x:3.5, y:38, z:0},
    K: {x:23, y:38, z:0},
    L: {x:-26.5, y:38, z:8.3},
    M: {x:-23, y:38, z:8.3},
    N: {x:-18, y:38, z:8.3},
    O: {x:-3.5, y:38, z:8.3},
    P: {x:-0.9, y:38, z:8.3},
    Q: {x:0.9, y:38, z:8.3},
    R: {x:3.5, y:38, z:8.3},
    S: {x:18, y:38, z:8.3},
    T: {x:23, y:38, z:8.3}

  }
}
// 1:{
//   opacity:  1,
//   floorNum: 1,
//   height:   2,
//   pointA:   {x:-6, y:2, z:12},
//   pointB:   {x:-6, y:2, z:0},
//   pointC:   {x:6, y:2, z:0},
//   pointD:   {x:6, y:2, z:-12},
//   stair:    {x:-6, y:2, z:-12}, //pointE
//   pointF:   {x:6, y:2, z:12}
// },
var escaroutes = {
  same:{//同じ階のとき
    pointA:["pointA"],
    pointB:["pointA","pointB"],
    pointE:["pointA","pointB","pointE"],
    pointC:["pointA","pointB","pointC"],
    pointD:["pointA","pointB","pointC","pointD"],
    pointF:["pointA","pointB","pointC","pointF"],

    W1A:["START","START2","M","A","B","W1A"],
    W1B:["START","START2","N","W1B"],
    W1C:["START","START2","O","I","W1C"],
    W1D:["START","START2","N","W1D"],
    E1A:["START","START2","R","E","F","E1A"],
    E1B:["START","START2","R","J","E1B"],
    E1C:["START","START2","S","E1C"],
  },
  1:{
    pointA:["esca","pointA"],
    pointB:["esca","pointA","pointB"],
    pointE:["esca","pointA","pointB","pointE"],
    pointC:["esca","pointA","pointB","pointC"],
    pointD:["esca","pointA","pointB","pointC","pointD"],
    pointF:["esca","pointA","pointB","pointC","pointF"],
    START:["esca","L","START2","START"]

  },
  2:{//2階エスカレータ
    pointA:["esca","pointE","pointB"],
    pointB:["esca"],
    pointC:["esca","pointE","pointB"],
    pointD:["esca","pointE","pointB","pointC"],
    pointF:["esca","pointE","pointB","pointC"],

    W2A:["esca","L","M","A","B","W2A"],
    W2B:["esca","L","M","H","W2B"],
    W2C:["esca","L","O","I","W2C"],
    W2D:["esca","L","N","W2D"],
    W2E:["esca","L","N","W2E"],

    E2A:["esca","L","R","E","F","E2A"],
    E2B:["esca","L","R","J","E2B"],
    E2C:["esca","L","S","E2C"],
    E2D:["esca","L","T","K","E2D"],
    E2E:["esca","L","S","E2E"],
    E2F:["esca","L","O","C","D","E2F"],
  },
  3:{//3階エスカレータ
    pointA:["esca","pointA"],
    pointB:["esca","pointA","pointB"],
    pointE:["esca","pointA","pointB","pointE"],
    pointC:["esca","pointA","pointB","pointC"],
    pointD:["esca","pointA","pointB","pointC","pointD"],
    pointF:["esca","pointA","pointB","pointC","pointF"],

    W3A:["esca","L","M","A","B","W3A"],
    W3B:["esca","L","M","H","W3B"],
    W3C:["esca","L","O","I","W3C"],
    W3D:["esca","L","N","W3D"],
    W3E:["esca","L","N","W3E"],

    E3A:["esca","L","R","E","F","E3A"],
    E3B:["esca","L","R","J","E3B"],
    E3C:["esca","L","S","E3C"],
    E3D:["esca","L","T","K","E3D"],
    E3E:["esca","L","S","E3E"],
    E3F:["esca","L","O","C","D","E3F"],
  },
  4:{//4階エスカレータ
    pointA:["esca","pointE","pointB","pointA"],
    pointB:["esca","pointE","pointB"],
    pointC:["esca","pointE","pointB","pointC"],
    pointD:["esca","pointE","pointB","pointC","pointD"],
    pointF:["esca","pointE","pointB","pointC","pointF"],

    W4A:["esca","L","M","A","B","W4A"],
    W4B:["esca","L","M","H","W4B"],
    W4C:["esca","L","O","I","W4C"],
    W4D:["esca","L","N","W4D"],
    W4E:["esca","L","N","W4E"],

    E4A:["esca","L","R","E","F","E4A"],
    E4B:["esca","L","R","J","E4B"],
    E4C:["esca","L","S","E4C"],
    E4D:["esca","L","T","K","E4D"],
    E4E:["esca","L","S","E4E"],
    E4F:["esca","L","O","C","D","E4F"],

  }
}
var routes = {
  same:{//同じ階のとき
    pointA:["pointA"],
    pointB:["pointA","pointB"],
    pointE:["pointA","pointB","pointE"],
    pointC:["pointA","pointB","pointC"],
    pointD:["pointA","pointB","pointC","pointD"],
    pointF:["pointA","pointB","pointC","pointF"],

    W1A:["START","START2","M","A","B","W1A"],
    W1B:["START","START2","N","W1B"],
    W1C:["START","START2","O","I","W1C"],
    W1D:["START","START2","N","W1D"],
    E1A:["START","START2","R","E","F","E1A"],
    E1B:["START","START2","R","J","E1B"],
    E1C:["START","START2","S","E1C"],
  },
  1:{
    pointA:["stair","pointE","pointB"],
    pointB:["stair"],
    pointC:["stair","pointE","pointB"],
    pointD:["stair","pointE","pointB","pointC"],
    pointE:["stair","pointE"],
    pointF:["stair","pointE","pointB","pointC"],

    START:["stair","Q","START2","START"],

  },
  2:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD"],
    pointE:["stair","pointE"],
    pointF:["stair","pointE","pointB","pointC","pointF"],

    W2A:["stair","Q","M","A","B","W2A"],
    W2B:["stair","Q","M","H","W2B"],
    W2C:["stair","Q","O","I","W2C"],
    W2D:["stair","Q","N","W2D"],
    W2E:["stair","Q","N","W2E"],

    E2A:["stair","Q","R","E","F","E2A"],
    E2B:["stair","Q","R","J","E2B"],
    E2C:["stair","Q","S","E2C"],
    E2D:["stair","Q","T","K","E2D"],
    E2E:["stair","Q","S","E2E"],
    E2F:["stair","Q","R","E","D","E2F"],




  },
  3:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD"],
    pointE:["stair","pointE"],
    pointF:["stair","pointE","pointB","pointC","pointF"],


    W3A:["stair","Q","M","A","B","W3A"],
    W3B:["stair","Q","N","W3B"],
    W3C:["stair","Q","O","I","W3C"],
    W3D:["stair","Q","N","W3D"],
    W3E:["stair","Q","N","W3E"],

    E3A:["stair","Q","R","E","F","E3A"],
    E3B:["stair","Q","R","J","E3B"],
    E3C:["stair","Q","S","E3C"],
    E3D:["stair","Q","T","K","E3D"],
    E3E:["stair","Q","S","E3E"],
    E3F:["stair","Q","R","E","D","E3F"],

  },
  4:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD"],
    pointE:["stair","pointE"],
    pointF:["stair","pointE","pointB","pointC","pointF"],

    W4A:["stair","Q","M","A","B","W4A"],
    W4B:["stair","Q","M","H","W4B"],
    W4C:["stair","Q","O","I","W4C"],
    W4D:["stair","Q","N","W4D"],
    W4E:["stair","Q","N","W4E"],

    E4A:["stair","Q","R","E","F","E4A"],
    E4B:["stair","Q","R","J","E4B"],
    E4C:["stair","Q","S","E4C"],
    E4D:["stair","Q","T","K","E4D"],
    E4E:["stair","Q","S","E4E"],
    E4F:["stair","Q","R","E","D","E4F"],
  }
}

var elevroutes = {
  same:{//同じ階のとき
    pointA:["pointA"],
    pointB:["pointA","pointB"],
    pointE:["pointA","pointB","pointE"],
    pointC:["pointA","pointB","pointC"],
    pointD:["pointA","pointB","pointC","pointD"],
    pointF:["pointA","pointB","pointC","pointF"],


    W1A:["START","START2","M","A","B","W1A"],
    W1B:["START","START2","N","W1B"],
    W1C:["START","START2","O","I","W1C"],
    W1D:["START","START2","N","W1D"],
    E1A:["START","START2","R","E","F","E1A"],
    E1B:["START","START2","R","J","E1B"],
    E1C:["START","START2","S","E1C"],
  },
  1:{
    pointA:["elev","pointF","pointC","pointB","pointA"],
    pointB:["elev","pointF","pointC","pointB"],
    pointC:["elev","pointF","pointC"],
    pointD:["elev","pointF","pointC","pointD"],
    pointE:["elev","pointF","pointC","pointB","pointE"],
    pointF:["elev","pointF"],

    START:["elev","P","START2","START"]
  },
  2:{
    pointA:["elev","pointF","pointC","pointB","pointA"],
    pointB:["elev","pointF","pointC","pointB"],
    pointC:["elev","pointF","pointC"],
    pointD:["elev","pointF","pointC","pointD"],
    pointE:["elev","pointF","pointC","pointB","pointE"],
    pointF:["elev","pointF"],

    W2A:["elev","P","M","A","B","W2A"],
    W2B:["elev","P","N","W2B"],
    W2C:["elev","P","O","I","W2C"],
    W2D:["elev","P","N","W2D"],
    W2E:["elev","P","N","W2E"],

    E2A:["elev","P","R","E","F","E2A"],
    E2B:["elev","P","R","J","E2B"],
    E2C:["elev","P","S","E2C"],
    E2D:["elev","P","T","K","E2D"],
    E2E:["elev","P","S","E2E"],
    E2F:["elev","P","R","E","D","E2F"]



  },
  3:{
    pointA:["elev","pointF","pointC","pointB","pointA"],
    pointB:["elev","pointF","pointC","pointB"],
    pointC:["elev","pointF","pointC"],
    pointD:["elev","pointF","pointC","pointD"],
    pointE:["elev","pointF","pointC","pointB","pointE"],
    pointF:["elev","pointF"],

    W3A:["elev","P","M","A","B","W3A"],
    W3B:["elev","P","M","H","W3B"],
    W3C:["elev","P","O","I","W3C"],
    W3D:["elev","P","O","I","W3D"],
    W3E:["elev","P","N","W3E"],

    E3A:["elev","P","R","E","F","E3A"],
    E3B:["elev","P","R","J","E3B"],
    E3C:["elev","P","S","E3C"],
    E3D:["elev","P","T","K","E3D"],
    E3E:["elev","P","S","E3E"],
    E3F:["elev","P","R","E","D","E3F"]
  },
  4:{
    pointA:["elev","pointF","pointC","pointB","pointA"],
    pointB:["elev","pointF","pointC","pointB"],
    pointC:["elev","pointF","pointC"],
    pointD:["elev","pointF","pointC","pointD"],
    pointE:["elev","pointF","pointC","pointB","pointE"],
    pointF:["elev","pointF"],

    W4A:["elev","P","M","A","B","W4A"],
    W4B:["elev","P","M","H","W4B"],
    W4C:["elev","P","O","I","W4C"],
    W4D:["elev","P","N","W4D"],
    W4E:["elev","P","N","W4E"],

    E4A:["elev","P","R","E","F","E4A"],
    E4B:["elev","P","R","J","E4B"],
    E4C:["elev","P","S","E4C"],
    E4D:["elev","P","T","K","E4D"],
    E4E:["elev","P","S","E4E"],
    E4F:["elev","P","R","E","D","E4F"]
  }
}
// 1:{
//   pointA:["stair","pointB"],
//   pointB:["stair"],
//   pointC:["stair","pointB"],
//   pointD:["stair","pointB","pointC"],
//   pointF:["stair","pointB","pointC"]
// },


var elevRoute;
function firstanimate(){
  render();
  requestAnimationFrame(firstanimate);
}

init();
firstanimate();
function  movemove(){
  setupTween();
  animate();
}
var routepass = {
  W101:[1,"W1A"],W102:[1,"W1A"],W103:[1,"W1A"],
  W104:[1,"W1B"],W105:[1,"W1B"],
  W106:[1,"W1C"],W107:[1,"W1C"],
  W108:[1,"W1D"],W109:[1,"W1D"],W110:[1,"W1D"],W111:[1,"W1D"],W112:[1,"W1D"],
  W113:[1,"W1D"],W114:[1,"W1D"],W115:[1,"W1D"],W116:[1,"W1D"],W117:[1,"W1D"],

  E101:[1,"E1A"],E102:[1,"E1A"],E103:[1,"E1A"],E104:[1,"E1A"],E105:[1,"E1A"],E106:[1,"E1A"],
  E107:[1,"E1B"],E108:[1,"E1B"],E109:[1,"E1B"],E110:[1,"E1B"],総合教室事務所:[1,"E1B"],情報創成事務室:[1,"W1C"],
  E111:[1,"E1C"],E112:[1,"E1C"],E113:[1,"E1C"],

  W201:[2,"W2A"],W202:[2,"W2A"],W203:[2,"W2A"],W204:[2,"W2A"],
  W205:[2,"W2A"],W206:[2,"W2A"],W207:[2,"W2A"],W208:[2,"W2A"],
  W209:[2,"W2B"],W210:[2,"W2B"],
  W211:[2,"W2C"],W212:[2,"W2C"],W213:[2,"W2C"],W216:[2,"W2C"],機械システム事務室:[2,"W2C"],機械就職事務室:[2,"W2C"],
  W214:[2,"W2D"],W215:[2,"W2D"],W217:[2,"W2D"],
  W218:[2,"W2E"],W219:[2,"W2E"],W220:[2,"W2E"],W221:[2,"W2E"],W222:[2,"W2E"],
  W223:[2,"W2E"],W224:[2,"W2E"],W225:[2,"W2E"],W226:[2,"W2E"],W227:[2,"W2E"],

  E201:[2,"E2A"],E202:[2,"E2A"],E203:[2,"E2A"],E204:[2,"E2A"],E205:[2,"E2A"],E206:[2,"E2A"],
  E207:[2,"E2B"],E208:[2,"E2B"],E209:[2,"E2B"],
  E210:[2,"E2C"],E211:[2,"E2C"],E212:[2,"E2C"],
  E214:[2,"E2D"],E215:[2,"E2D"],
  E216:[2,"E2E"],E217:[2,"E2E"],E218:[2,"E2E"],E219:[2,"E2E"],松永:[2,"E2E"],E220:[2,"E2E"],E221:[2,"E2E"],
  E222:[2,"E2E"],E223:[2,"E2E"],E224:[2,"E2E"],E225:[2,"E2E"],木山:[2,"E2E"],


  W301:[3,"W3A"],W302:[3,"W3A"],W303:[3,"W3A"],W304:[3,"W3A"],
  W305:[3,"W3A"],W306:[3,"W3A"],W307:[3,"W3A"],W308:[3,"W3A"],
  W309:[3,"W3B"],W310:[3,"W3B"],
  W311:[3,"W3C"],W312:[3,"W3C"],伊藤:[3,"W3C"],
  W313:[3,"W3D"],W314:[3,"W3D"],W315:[3,"W3D"],W316:[3,"W3D"],
  W317:[3,"W3E"],W318:[3,"W3E"],W319:[3,"W3E"],W320:[3,"W3E"],W321:[3,"W3E"],
  W322:[3,"W3E"],W323:[3,"W3E"],W324:[3,"W3E"],W325:[3,"W3E"],W326:[3,"W3E"],

  E301:[3,"E3A"],E302:[3,"E3A"],E303:[3,"E3A"],E304:[3,"E3A"],
  E306:[3,"E3B"],E307:[3,"E3B"],E308:[3,"E3B"],電子事務室:[3,"E3B"],学生実験室:[3,"E3B"],
  E309:[3,"E3C"],E310:[3,"E3C"],E311:[3,"E3C"],
  E312:[3,"E3D"],E313:[3,"E3D"],
  E314:[3,"E3E"],E315:[3,"E3E"],E316:[3,"E3E"],E317:[3,"E3E"],E318:[3,"E3E"],
  E319:[3,"E3E"],E320:[3,"E3E"],E321:[3,"E3E"],E322:[3,"E3E"],E323:[3,"E3E"],
  E324:[3,"E3F"],E325:[3,"E3F"],


  W401:[4,"W4A"],W402:[4,"W4A"],W403:[4,"W4A"],W404:[4,"E4A"],W405:[4,"E4A"],W406:[4,"E4A"],
  W407:[4,"W4B"],W408:[4,"W4B"],
  W409:[4,"W4C"],W410:[4,"W4C"],W414:[4,"W4C"],
  W411:[4,"W4D"],W412:[4,"W4D"],W413:[4,"W4D"],W414:[4,"W4D"],W415:[4,"W4D"],尾家:[4,"W4D"],
  W416:[4,"W4D"],
  W417:[4,"W4E"],W418:[4,"W4E"],W419:[4,"W4E"],W420:[4,"W4E"],W421:[4,"W4E"],
  W422:[4,"W4E"],W423:[4,"W4E"],W424:[4,"W4E"],W425:[4,"W4E"],W426:[4,"W4E"],

  E401:[4,"E4A"],E402:[4,"E4A"],E403:[4,"E4A"],E404:[4,"E4A"],E405:[4,"E4A"],E406:[4,"E4A"],E407:[4,"E4A"],
  E408:[4,"E4B"],E409:[4,"E4B"],E410:[4,"E4B"],
  E411:[4,"E4C"],E412:[4,"E4C"],E413:[4,"E4C"],
  E414:[4,"E4D"],E415:[4,"E4D"],
  E416:[4,"E4E"],E417:[4,"E4E"],E418:[4,"E4E"],E419:[4,"E4E"],E420:[4,"E4E"],
  E421:[4,"E4E"],E422:[4,"E4E"],E423:[4,"E4E"],E424:[4,"E4E"],E425:[4,"E4E"],
  E426:[4,"E4F"],E427:[4,"E4F"],




  point1A:[1,"pointA"],
  point1B:[1,"pointB"],
  point1C:[1,"pointC"],
  point1D:[1,"pointD"],
  point1E:[1,"pointE"],
  point1F:[1,"pointF"],
  point2A:[2,"pointA"],
  point2B:[2,"pointB"],
  point2C:[2,"pointC"],
  point2D:[2,"pointD"],
  point2E:[2,"pointE"],
  point2F:[2,"pointF"],
  point3A:[3,"pointA"],
  point3B:[3,"pointB"],
  point3C:[3,"pointC"],
  point3D:[3,"pointD"],
  point3E:[3,"pointE"],
  point3F:[3,"pointF"],
  point4A:[4,"pointA"],
  point4B:[4,"pointB"],
  point4C:[4,"pointC"],
  point4D:[4,"pointD"],
  point4E:[4,"pointE"],
  point4F:[4,"pointF"]
};


function setupTween(){
  TWEEN.removeAll();
  timelineTime = 200;
  // var startfloornum = document.forms.id_form1.id_textBox1.value;
  endpoint = document.forms.id_form1.id_textBox4.value;
  wayofchange2 = document.forms.id_form1.id_textBox2.value;//stair2
  wayofchange3 = document.forms.id_form1.id_textBox3.value;//elev
  wayofchange = document.forms.id_form1.id_textBox5.value;//stair

  checkstair2 = document.forms.id_form1.id_textBox2.checked;
  checkelev3 = document.forms.id_form1.id_textBox3.checked;
  checkstair1 = document.forms.id_form1.id_textBox5.checked;



if(!checkstair1 && checkstair2 && checkelev3){//入力の左から順番に入るようにする
  wayofchange = "stair2";
  wayofchange2 = "elev";
  wayofchange3 = "";
}
if(!checkstair1 && checkstair2 && !checkelev3){
  wayofchange = "stair2";
  wayofchange2= "";
  wayofchange3= "";
}
if(!checkstair1 && !checkstair2 && checkelev3){
  console.log("asdfasdf");
  wayofchange = "elev";
  wayofchange2 = "";
  wayofchange3 = "";

}
if(checkstair1 && !checkstair2 && checkelev3){
  wayofchange = "stair";
  wayofchange2 = "elev";
  wayofchange3 = "";

}





  // if (wayofchange == "stair1"){
  //   wayofchange = "stair";
  // }else if (wayofchange2 == "stair1"){
  //   wayofchange2 = "stair";
  // }else if (wayofchange3 == "stair1"){
  //   wayofchange3 = "stair";
  // }

  if (wayofchange == "stair2"){
    wayofchange = "esca";
  }else if (wayofchange2 == "stair2"){
    wayofchange2 = "esca";
  }else if (wayofchange3 == "stair2"){
    wayofchange3 = "esca";
  }
  move([1,"START"],routepass[endpoint],wayofchange);       //大本の入力
}

function move(currentPlace,goalPlace,wayofchange){        //案内を実際に実行する関数
  var currentPos = positions[currentPlace[0]][currentPlace[1]];
  var currentRoute = routes[currentPlace[0]][currentPlace[1]];　//一階のゴールへの道の
  var currentescaRoute = escaroutes[currentPlace[0]][currentPlace[1]];
  var currentelevRoute = elevroutes[currentPlace[0]][currentPlace[1]];
  var goal = positions[goalPlace[0]][goalPlace[1]]; //ゴールの中身を持ってくる
  var goalRoute = routes[goalPlace[0]][goalPlace[1]];//ゴールの階の
  var samefloorRoute = routes["same"][goalPlace[1]];
  var sameescaRoute = escaroutes["same"][goalPlace[1]];
  var sameelevRoute = elevroutes["same"][goalPlace[1]];
  var escaRoute = escaroutes[goalPlace[0]][goalPlace[1]];
 elevRoute = elevroutes[goalPlace[0]][goalPlace[1]];

  if(endflag == 1){　//二回目以降の初期化
    currentrot = {_x:Math.PI*3/2,_y:0,_z:0};
    current = { x: 0, y:2 ,z:12};//
    opt = {};
    currentop = { op1:1, op2:0, op3:0, op4:0 };
    currentcam = {x:0,y:35,z:0,_w:0.7,_x:-0.7,_y:0,_z:0};
    currentdir = {x:0,y:1.57,z:-1.57};
    right = left = forward = back = 0;
    ops = { stairop:0, stairop2:0, elevop:0};
  }

  //setPos(currentPlace[0], currentPos);   //初期位置

  if(goalPlace[0]==1){
    for (var i=0 ; i<samefloorRoute.length-1 ; i++) {//一階階段まで
      changedir(positions[goalPlace[0]][samefloorRoute[i+1]],positions[goalPlace[0]][samefloorRoute[i]]);
      moveTo(goalPlace[0], positions[goalPlace[0]][samefloorRoute[i+1]]);
    }
  }else{
    if(wayofchange2 === ""){
      console.log("1a");
      if(wayofchange == "stair1"){           //階段を使うなら階段を移動
        //stair
        for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
          moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
        }
      }else if ( wayofchange == "elev"){    //エレベータを使うなら。。。
        //elev
        console.log("elev1")
        for (var i=currentelevRoute.length-1 ; i>-1 ; i--) {//一階階段までelev
          moveTo(currentPlace[0], positions[currentPlace[0]][currentelevRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentelevRoute[i-1]],positions[currentPlace[0]][currentelevRoute[i]]);
        }
      }else if( wayofchange == "esca"){     //エスカレーターを使うなら。。。方向変換追加
        //esca

        for (var i=currentescaRoute.length-1 ; i>-1 ; i--) {//一階階段までesca
          moveTo(currentPlace[0], positions[currentPlace[0]][currentescaRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentescaRoute[i-1]],positions[currentPlace[0]][currentescaRoute[i]]);
        }
      }else {                               //指定されていない場合は階段
        //stair
        for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
          moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
        }
      }
    }else if(wayofchange3 === ""){
      console.log("1b");
      if((wayofchange == "stair" && wayofchange2 == "elev" )||(wayofchange == "elev" && wayofchange2 == "stair")){
        console.log("stair&elev");
        if(elevRoute.length - goalRoute.length < 0){
          //elev
          for (var i=currentelevRoute.length-1 ; i>-1 ; i--) {//一階階段までelev
            moveTo(currentPlace[0], positions[currentPlace[0]][currentelevRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentelevRoute[i-1]],positions[currentPlace[0]][currentelevRoute[i]]);
            console.log("a");
          }
        }else{
          //stair
          console.log("ab");
          for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
            moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
          }
        }
      }else if((wayofchange == "stair" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "stair")){
        console.log("stair&esca");
        if(escaRoute.length - goalRoute.length < 0){
          //esca
          for (var i=currentescaRoute.length-1 ; i>-1 ; i--) {//一階階段までesca
            moveTo(currentPlace[0], positions[currentPlace[0]][currentescaRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentescaRoute[i-1]],positions[currentPlace[0]][currentescaRoute[i]]);
          }
        }else{
          //stair
          for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
            moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
          }
        }
      }else if((wayofchange == "elev" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "elev")){
        console.log("elev&esca");
        if(elevRoute.length-escaRoute.length < 0){
          //elev
          for (var i=currentelevRoute.length-1 ; i>-1 ; i--) {//一階階段までelev
            moveTo(currentPlace[0], positions[currentPlace[0]][currentelevRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentelevRoute[i-1]],positions[currentPlace[0]][currentelevRoute[i]]);
          }
        }else{
          //esca
          for (var i=currentescaRoute.length-1 ; i>-1 ; i--) {//一階階段までesca
            moveTo(currentPlace[0], positions[currentPlace[0]][currentescaRoute[i]]);
            if(i>=1)
            changedir(positions[currentPlace[0]][currentescaRoute[i-1]],positions[currentPlace[0]][currentescaRoute[i]]);
          }
        }
      }
    }else{
      console.log("1else");
      if(escaRoute.length < goalRoute.length && escaRoute.length < elevRoute.length){
        console.log("esca");
        //esca
        for (var i=currentescaRoute.length-1 ; i>-1 ; i--) {//一階階段までesca
          moveTo(currentPlace[0], positions[currentPlace[0]][currentescaRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentescaRoute[i-1]],positions[currentPlace[0]][currentescaRoute[i]]);
        }
      }else if(goalRoute.length < escaRoute.length && goalRoute.length< elevRoute.length){
        console.log("stair");
        //stair
        for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
          moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
        }
      }else if(elevRoute.length < escaRoute.length && elevRoute.length< goalRoute.length){
        console.log("elev");
        //elev
        for (var i=currentelevRoute.length-1 ; i>-1 ; i--) {//一階階段までelev
          moveTo(currentPlace[0], positions[currentPlace[0]][currentelevRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentelevRoute[i-1]],positions[currentPlace[0]][currentelevRoute[i]]);
        }
      }else {
        console.log("anotherstair");
        //stair
        for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段までstair
          moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
          if(i>=1)
          changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
        }
      }
    }
  }



  if(goalPlace[0] != 1){
    camerachange1(goalPlace[0]);
    camerarotate();
    addstairs();
  }




  if(goalPlace[0] != 1)
  if(wayofchange2 === ""){
    console.log("up");
    for( var i=1 ; goalPlace[0]>i ; i++ ){     //目的階までの移動と同時に透明度変更
      wayofchange = wayofchange || "stair";
      // if(wayofchange == "esca" && i<goalPlace[0]) {
      //   changedir(positions[i+1]["esca"],positions[i]["esca"]);
      // }
      upfloor(currentop,positions[i]["floorNum"]);
      moveTo(i + 1, positions[i+1][wayofchange]);
    }
  }else if(wayofchange3 === ""){
    console.log("way3");
    for(var i = 1;goalPlace[0]>i;i++){
      var route;
      var lens = {
        elev: elevRoute.length,
        esca: escaRoute.length,
        stair: goalRoute.length
      };
      if(lens[wayofchange] - lens[wayofchange2] == 0){
        route = "stair";
      }else
      route = lens[wayofchange] - lens[wayofchange2] < 0 ? wayofchange : wayofchange2;//前の条件がそろったらwayofchange, wayofchange2
      // if(route == "esca" && i<goalPlace[0]) {
      //   changedir(positions[i+1]["esca"],positions[i]["esca"]);
      // }
      console.log(route);
      upfloor(currentop,positions[i]["floorNum"]);
      moveTo(i+1,positions[i+1][route]);
    }
  }else{
    console.log("upelse");
    for(var i = 1;goalPlace[0]>i;i++){
      if(escaRoute.length < goalRoute.length && escaRoute.length < elevRoute.length){
        if(i < goalPlace[0]){
          changedir(positions[i+1]["esca"],positions[i]["esca"]);
        }
        upfloor(currentop,positions[i]["floorNum"]);
        moveTo(i+1,positions[i+1]["esca"]);
      }else if(goalRoute.length < escaRoute.length && goalRoute.length< elevRoute.length){
        upfloor(currentop,positions[i]["floorNum"]);
        moveTo(i+1,positions[i+1]["stair"]);
      }else if(elevRoute.length < escaRoute.length && elevRoute.length< goalRoute.length){
        upfloor(currentop,positions[i]["floorNum"]);
        moveTo(i+1,positions[i+1]["elev"]);
      }else {
        upfloor(currentop,positions[i]["floorNum"]);
        moveTo(i+1,positions[i+1]["stair"]);
      }
    }
  }



  if(goalPlace[0] != 1){
    camerachange2(goalPlace[0]);
    camerarotate2();
    erasestairs();
  }

  if(goalPlace[0] != 1)
  if(wayofchange2 === ""){
    console.log("2a");
    if(wayofchange == "stair"){           //階段を使うなら階段を移動
      console.log("stair");
      changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
      camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }else if ( wayofchange == "elev"){    //エレベータを使うなら。。。
      console.log("elevvv");
      changedir(positions[goalPlace[0]][elevRoute[1]],positions[goalPlace[0]][elevRoute[0]]);
      camerarot(positions[goalPlace[0]][elevRoute[0]],positions[goalPlace[0]][elevRoute[1]]);
      for(var i = 0; i < elevRoute.length -1 ; i++){
        console.log(i);
         changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
         moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
      }
    }else if( wayofchange == "esca"){     //エスカレーターを使うなら。。。方向変換追加
      console.log("esca");
      changedir(positions[goalPlace[0]][escaRoute[1]],positions[goalPlace[0]][escaRoute[0]]);
      camerarot(positions[goalPlace[0]][escaRoute[0]],positions[goalPlace[0]][escaRoute[1]]);
      for(var i = 0 ; i<escaRoute.length-1; i++){
        changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
      }
    }else {                               //指定されていない場合は階段
      console.log("anotherstair");
      changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
      camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }
  }else if(wayofchange3 === ""){
    console.log("2b");
    if((wayofchange == "stair" && wayofchange2 == "elev" )||(wayofchange == "elev" && wayofchange2 == "stair")){
      console.log("stair&elev");
      if(elevRoute.length - goalRoute.length < 0){
        changedir(positions[goalPlace[0]][elevRoute[1]],positions[goalPlace[0]][elevRoute[0]]);
        camerarot(positions[goalPlace[0]][elevRoute[0]],positions[goalPlace[0]][elevRoute[1]]);
        for(var i = 0; i < elevRoute.length -1 ; i++){
          conosole.log("elevelev");
          if(i>0)
          changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
          moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
        }
      }else{
        console.log("stairstair");
        changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
        camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
        for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
          changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
          moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
        }
      }
    }else if((wayofchange == "stair" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "stair")){
      console.log("stair&esca");
      if(escaRoute.length - goalRoute.length < 0){
        changedir(positions[goalPlace[0]][escaRoute[1]],positions[goalPlace[0]][escaRoute[0]]);
        camerarot(positions[goalPlace[0]][escaRoute[0]],positions[goalPlace[0]][escaRoute[1]]);
        for(var i = 0 ; i<escaRoute.length-1; i++){
          if(i>0)
          changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
          moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
        }
      }else{
        changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
        camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
        for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
          changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
          moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
        }
      }
    }else if((wayofchange == "elev" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "elev")){
      console.log("esca&elev");
      if(elevRoute.length-goalRoute.length < 0){
        changedir(positions[goalPlace[0]][elevRoute[1]],positions[goalPlace[0]][elevRoute[0]]);
        camerarot(positions[goalPlace[0]][elevRoute[0]],positions[goalPlace[0]][elevRoute[1]]);
        for(var i = 0; i < elevRoute.length -1 ; i++){
          if(i>0){
            changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
          }
          moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
        }
      }else{
        changedir(positions[goalPlace[0]][escaRoute[1]],positions[goalPlace[0]][escaRoute[0]]);
        camerarot(positions[goalPlace[0]][escaRoute[0]],positions[goalPlace[0]][escaRoute[1]]);
        for(var i = 0 ; i<escaRoute.length-1; i++){
          if(i>0)
          changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
          moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
        }
      }
    }
  }else{
    console.log("2else");
    if(escaRoute.length < goalRoute.length && escaRoute.length < elevRoute.length){
      console.log("esca");
      changedir(positions[goalPlace[0]][escaRoute[1]],positions[goalPlace[0]][escaRoute[0]]);
      camerarot(positions[goalPlace[0]][escaRoute[0]],positions[goalPlace[0]][escaRoute[1]]);
      for(var i = 0 ; i<escaRoute.length-1; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
      }
    }else if(goalRoute.length < escaRoute.length && goalRoute.length< elevRoute.length){
      console.log("stair");
      changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
      camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }else if(elevRoute.length < escaRoute.length && elevRoute.length< goalRoute.length){
      console.log("elev");
      changedir(positions[goalPlace[0]][elevRoute[1]],positions[goalPlace[0]][elevRoute[0]]);
      camerarot(positions[goalPlace[0]][elevRoute[0]],positions[goalPlace[0]][elevRoute[1]]);
      for(var i = 0; i < elevRoute.length -1 ; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
      }
    }else {
      console.log("anotherstair");
      changedir(positions[goalPlace[0]][goalRoute[1]],positions[goalPlace[0]][goalRoute[0]]);
      camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }
  }
  endflag = 1;
}



//案内に用いる関数群                                       ↓↓↓↓↓
function changedir(afterpos,beforepos){//矢印の方向転換
  var dx = beforepos.x - afterpos.x;
  var dz = beforepos.z - afterpos.z;
  if(dx>0){//　　　　←
    if(left != 1)
    addTween(currentdir,{y:3.14},userOpts.duration,userOpts.delay,true)
    initdir();
    left = 1;
  }else if (dx<0){//→
    if(right !=1)
    addTween(currentdir,{y:0},userOpts.duration,userOpts.delay,true)
    initdir();
    right = 1;
  }
  if(dz>0){//       ↑
    if(forward != 1)
    addTween(currentdir,{y:1.57},userOpts.duration,userOpts.delay,true)
    initdir();
    forward = 1;
  }else if (dz<0){//↓
    if(back != 1)
    addTween(currentdir,{y:-1.57},userOpts.duration,userOpts.delay,true)
    initdir();
    back = 1;
  }
}

function initdir(){//前回どの方向を向いていたか判定するための初期化
  right = left = forward = back = 0;
}
function camerarot(stair,next){//目的階到着後視点をあわせる
  dx = stair.x - next.x;
  dz = stair.z - next.z;
  //addTween(currentrot,{_x:Math.PI*3/2,_y:0,_z:Math.PI},userOpts.duration,userOpts.delay, true)
  if(dx>0){//　　　　←
    addTween(currentrot,{_x:Math.PI*3/2,_y:0,_z:Math.PI/2},userOpts.duration,userOpts.delay, true)
  }else if (dx<0){//→
    addTween(currentrot,{_x:Math.PI*3/2,_y:0,_z:Math.PI*(-1/2)},userOpts.duration,userOpts.delay, true)
  }else if(dz > 0){
    //no change
  }else if (dz<0){//↓
    addTween(currentrot,{_x:Math.PI*3/2,_y:0,_z:Math.PI},userOpts.duration,userOpts.delay, true)
  }
}
function camerachange1(goalfloorNum){//カメラのポジションを移動（最初）
  a = 50 + ((goalfloorNum-1) * 12);
  addTween(currentcam,{x:0,y:a,z:50},userOpts.duration,userOpts.delay, false)
}
function camerachange2(goalfloorNum){//カメラの歩視ションを移動（後）
  a = 35 + ((goalfloorNum-1) * 12);
  addTween(currentcam,{x:0,y:a,z:0},userOpts.duration,userOpts.delay, false)
}
function setPos(stairNumber, pos) {         //初期配置
  current.x = pos.x,
  current.y = positions[stairNumber].height,
  current.z = pos.z
}
function moveTo(floorNum, pos) {            //点の移動
  addTween(current, {
    x: pos.x,
    y: positions[floorNum].height,
    z: pos.z
  }, userOpts.duration, userOpts.delay, true)
}
function upfloor(currentop,pos){            //階の上昇
  addTween(currentop, {
    ["op" + pos]:0.2,
    ["op" + (pos + 1)]:1
  }, userOpts.duration, userOpts.delay, false)
  // if(pos == 1){
  //   addTween(currentop, {
  //     op1:0.2,
  //     op2:1
  //   }, userOpts.duration, userOpts.delay, false)
  // }else if(pos == 2){
  //   addTween(currentop, {
  //     op2:0.2,
  //     op3:1
  //   }, userOpts.duration, userOpts.delay, false)
  // }else if(pos == 3){
  //   addTween(currentop, {
  //     op3:0.2,
  //     op4:1
  //   }, userOpts.duration, userOpts.delay, false)
  // }
}
function erasestair(){
  addTween(ops,{stairposy:-10},1,0, true)
}
function erasestair2(){
  addTween(ops,{stairpos2y:-10},1,0, true)
}
function eraseelev(){
  addTween(ops,{elevposy:-10},1,0, true)
}
function addstair(){
  addTween(ops,{stairop:0.4},1,0, true)
}
function addstair2(){
  addTween(ops,{stairop2:0.4},1,0, true)
}
function addelev(){
  addTween(ops,{elevop:0.4},1,0, true)
}
function addstairs(){
  addstair();
  addstair2();
  addelev();
}
function erasestairs(){
  erasestair();
  erasestair2();
  eraseelev();
}
function camerarotate(){//カメラの前後ろ方向の角度変更（LookAtの変わり）x/32xが48より大きくなるほど上向きになる。
  addTween(currentrot,{_x:Math.PI*54/32},userOpts.duration,userOpts.delay, true)
}
function camerarotate2(){//カメラを元の向きに戻す。
  addTween(currentrot,{_x:Math.PI*3/2},userOpts.duration,userOpts.delay, true)
};
function updateProps() {//描画する情報の更新
  stair11.position.y = ops.stairposy;
  stair22.position.y = ops.stairpos2y;
  elev11.position.y = ops.elevposy;
  // sphere.position.x = current.x;
  // sphere.position.y = current.y;
  // sphere.position.z = current.z;
  stair2mat.opacity = ops.stairop2;
  // esca22.opacity = ops.escaop2;
  // esca33.opacity = ops.escaop3;
  stairmat.opacity = ops.stairop;
  elevmat.opacity = ops.elevop;
  mat1.opacity = currentop.op1;
  mat2.opacity = currentop.op2;
  mat3.opacity = currentop.op3;
  mat4.opacity = currentop.op4;
  camera.position.x = currentcam.x;
  camera.position.y = currentcam.y;
  camera.position.z = currentcam.z;
  camera.rotation.x = currentrot._x;
  camera.rotation.y = currentrot._y;
  camera.rotation.z = currentrot._z;
  arrowHelper.position.x = current.x;
  arrowHelper.position.y = current.y;
  arrowHelper.position.z = current.z;
  //camera.lookAt(new THREE.Vector3(0,0,0));//自力で何とかできる？
  arrowHelper.rotation.x = currentdir.x;
  arrowHelper.rotation.y = currentdir.y;
  arrowHelper.rotation.z = currentdir.z;
  //camera.rotation.set(Math.PI*3/2,0, Math.PI);
}
//                                                       ↑↑↑↑↑
function init(){  //アニメーションに必要なオブジェクトやカメラの用意、初期化 ↓↓↓↓↓
  //カメラの設定
  var width = 600;
  var height = 400;
  var fov = 60;
  var aspect = width / height;
  var near = 1;
  var far = 1000;


  camera = new THREE.PerspectiveCamera( fov, aspect, near , far);
  camera.position.set(50,50,50);

  //camera.lookAt(new THREE.Vector3(0,0,0));



  //si-nntuika
  scene = new THREE.Scene();

  //光源の追加
  var directionalLight = new THREE.DirectionalLight( 0xffffff);
  directionalLight.position.set( 0.5, 0.5, 0.5 );
  scene.add(directionalLight);

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff);
  directionalLight2.position.set( -0.5, -0.5, -0.5);
  scene.add(directionalLight2);

  var directionalLight3 = new THREE.DirectionalLight( 0x444444);
  directionalLight.position.set( 5, 5, 5 );
  scene.add(directionalLight3);


  //add sphere
  var dir = new THREE.Vector3(1,0,0);
  var origin = new THREE.Vector3(-6,2,12);
  var length = 2;
  var hex = 0xff2222;
  var headLength = length;
  var headWidth = 1;
  arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex,headLength,headWidth);
  scene.add( arrowHelper );


  // var spGeo = new THREE.SphereGeometry(1,30,60);
  // matsp = new THREE.MeshPhongMaterial({color: 0xff1111});
  // sphere = new THREE.Mesh(spGeo,matsp);
  // sphere.position.set(
  //   sphere.position.x = -6,
  //   sphere.position.y = 2,
  //   sphere.position.z = 12
  // )
  //scene.add(sphere);
  ///texture load
  //first floor texture
  const textureLoader1 = new THREE.TextureLoader();
  var texture1 = textureLoader1.load("pic/tmp1.png");
  mat1 = new THREE.MeshPhongMaterial();
  mat1.side = THREE.DoubleSide;//display both Front and back
  mat1.opacity = 1;
  mat1.transparent = true;
  mat1.map = texture1;
  //second floor texture
  const textureLoader2 = new THREE.TextureLoader();
  var texture2 = textureLoader2.load("pic/tmp2.png");
  mat2 = new THREE.MeshPhongMaterial();
  mat2.side = THREE.DoubleSide;
  mat2.opacity = 1;
  mat2.transparent = true;
  mat2.map = texture2;
  //third floor texture
  const textureLoader3 = new THREE.TextureLoader();
  var texture3 = textureLoader3.load("pic/tmp3.png");
  mat3 = new THREE.MeshPhongMaterial();
  mat3.side = THREE.DoubleSide;
  mat3.opacity = 1;
  mat3.transparent = true;
  mat3.map = texture3;
  //fourth floor texture
  const textureLoader4 = new THREE.TextureLoader();
  var texture4 = textureLoader4.load("pic/tmp4.png");
  mat4= new THREE.MeshPhongMaterial();
  mat4.side = THREE.DoubleSide;
  mat4.opacity = 1;
  mat4.transparent = true;
  mat4.map = texture4;

  // escamat = new THREE.MeshPhongMaterial( {color: 0xffffff });
  // escamat.side = THREE.DoubleSide;
  // escamat.opacity = 0.4;
  // escamat.transparent = true;

  elevmat = new THREE.MeshPhongMaterial( {color: 0x00ffff });
  elevmat.side = THREE.DoubleSide;
  elevmat.opacity = 0.4;
  elevmat.transparent = true;

  stairmat = new THREE.MeshPhongMaterial( {color: 0x00ff00 });
  stairmat.side = THREE.DoubleSide;
  stairmat.opacity = 0.4;
  stairmat.transparent = true;

  stair2mat = new THREE.MeshPhongMaterial( { color: 0x00ff00 });
  stair2mat.side = THREE.DoubleSide;
  stair2mat.opacity = 0.4;
  stair2mat.transparent = true;


  ///texture load end

  ///add floor
  //add first floor
  var FirstF = new THREE.PlaneGeometry( 60, 30, 1,1);//make dimensions
  //var material = new THREE.MeshPhongMaterial( {color: 0xff0000 });//adjust color of texture
  var FirstFloor = new THREE.Mesh( FirstF, mat1);//make object
  scene.add(FirstFloor);                          //add FirstFloor to scene
  FirstFloor.rotation.set(Math.PI*3/2,0, 0);     //adjust rotation of FirstFloor
  //add second floor
  var SecondF = new THREE.PlaneGeometry(60,30,1,1);
  var SecondFloor = new THREE.Mesh( SecondF,mat2);//何でかmat2が使えない！
  scene.add(SecondFloor);
  SecondFloor.rotation.set(Math.PI*3/2, 0, 0);
  SecondFloor.position.set(0,12,0);
  //add third floor
  var ThirdF = new THREE.PlaneGeometry(60,30,1,1);
  var ThirdFloor = new THREE.Mesh(ThirdF, mat3);
  scene.add(ThirdFloor);
  ThirdFloor.rotation.set(Math.PI*3/2, 0, 0);
  ThirdFloor.position.set(0,24,0);
  //add fourth floor
  var FourthF = new THREE.PlaneGeometry(60,30,1,1);
  var FourthFloor = new THREE.Mesh(FourthF, mat4);
  scene.add(FourthFloor);
  FourthFloor.rotation.set(Math.PI*3/2,0,0);
  FourthFloor.position.set(0,36,0);
  ///add floor end
  //
  //   var esca1 = new THREE.PlaneGeometry(30,3,5,2);
  //   var esca11 = new THREE.Mesh(esca1,escamat);
  // //  scene.add(esca11);
  //   esca11.rotation.set(-Math.PI*3/8,0,Math.PI*3/2)
  //   esca11.position.set(-12,6,0)
  //
  //   var esca2 = new THREE.PlaneGeometry(30,3,5,2);
  //   var esca22 = new THREE.Mesh(esca2,escamat);
  // //  scene.add(esca22);
  //   esca22.rotation.set(Math.PI*3/8,0,Math.PI*3/2)
  //   esca22.position.set(-12,18,0)
  //
  //   var esca3 = new THREE.PlaneGeometry(30,2,5,2);
  //   var esca33 = new THREE.Mesh(esca3,escamat);
  // //  scene.add(esca33);
  //   esca33.rotation.set(-Math.PI*3/8,0,Math.PI*3/2)
  //   esca33.position.set(-12,30,0)

  var elev1 = new THREE.BoxGeometry(37,1,1);
  elev11 = new THREE.Mesh(elev1,elevmat);
  scene.add(elev11);
  elev11.rotation.set(0,0,Math.PI*3/2)
  elev11.position.set(-0.9,17.4,4.7)

  var stair1 = new THREE.BoxGeometry(37,1,1);
  stair11 = new THREE.Mesh(stair1,stairmat);
  scene.add(stair11);
  stair11.rotation.set(0,0,Math.PI*3/2);
  stair11.position.set(0.95,17.4,4.7);

  var stair2 = new THREE.BoxGeometry(37,1,1);
  stair22 = new THREE.Mesh(stair2,stair2mat);
  scene.add(stair22);
  stair22.rotation.set(0,0,Math.PI*3/2);
  stair22.position.set(-27.8,17.4,4.6);

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  //レンダラーをDOM上に設置
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  container.appendChild( renderer.domElement );


  //カメラを自由に操作するためのオブジェクト作成
  var camera_controls = new THREE.OrbitControls(camera, renderer.domElement);

}

//↑↑↑↑↑
//アニメーションを作成
function animate(time){
  render();
  requestAnimationFrame(animate);
  TWEEN.update(time);
  updateProps();
}

//render function
function render(){
  renderer.render(scene, camera);
}

//targetにcurrent,propにobject情報, isSeriesには直列に実行するかしないかするならtrue
function addTween(target, prop, duration, delay, isSeries) {　//tweenの作成とタイムライン的なので管理
  setTimeout(function() {
    var tween = new TWEEN.Tween(target)
    .to(prop, duration);
    tween.start();
  }, timelineTime)
  if (isSeries) {      //直列に実行する場合（アニメーションをつなげる時）時間を追加する.
    timelineTime += duration;
  }
}
