//変数の定義（仕方なくここに持ってきたのもある）
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var sphere, arrowHelper;
var matsp,mat1,mat2,mat3,mat4;
var timelineTime = 1000;
var gridHelper = new THREE.GridHelper( 30, 20, 0xFFFF00, 0xFFFFFF);
var flag = 0;
var countgrid = 0;
var cameraflag = 0;
var endflag = 0;
var right = left = forward = back = 0;
var wayofchange2,wayofchange3;
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
  duration	: 1500,
  delay		: 20,
};
var currentdir = {x:0,y:1.57,z:-1.57};
//route information
var current = { x: 6, y:2 ,z:12};//
var currentop = { op1:1, op2:0, op3:0, op4:0 };
var currentcam = {x:0,y:30,z:0,_w:0.7,_x:-0.7,_y:0,_z:0};
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
    elev:     {x:-11, y:2, z:-12},
    esca:     {x:-11, y:2, z:-12},
    stair :   {x:-11, y:2, z:-12},
    pointE:    {x:-6, y:2, z:-12}, //pointE
    pointF:   {x:6, y:2, z:12}
  },
  2:{
    opacity:  0.2,
    floorNum: 2,
    height:   14,
    pointA:   {x:-6,y:14,z:12},
    pointB:   {x:-6, y:14, z:0},
    pointC:   {x:6, y:14, z:0},
    pointD:   {x:6, y:14, z:-12},
    elev  :   {x:-11, y:14, z:-12},
    esca  :   {x:-11, y:14, z:12},
    stair:    {x:-11, y:14, z:-12},
    pointE:   {x:-6, y:14, z:-12},
    pointF:   {x:6, y:14, z:12}
  },
  3:{
    opacity:  0.2,
    floorNum: 3,
    height:   26,
    pointA:   {x:-6, y:26, z:12},
    pointB:   {x:-6, y:26, z:0},
    pointC:   {x:6, y:26, z:0},
    pointD:   {x:6, y:26, z:-12},
    elev  :   {x:-11, y:26, z:-12},
    esca  :   {x:-11, y:26, z:-12},
    stair:    {x:-11, y:26, z:-12},
    pointE:   {x:-6, y:26, z:-12},
    pointF:   {x:6, y:26, z:12}
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
    elev  :   {x:-11, y:38, z:-12},
    stair:    {x:-11, y:38, z:-12},
    esca  :   {x:-11, y:26, z:12},
    pointF:   {x:6, y:38, z:12}
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
    pointF:["pointA","pointB","pointC","pointF"]
  },
  1:{
    pointA:["stair","pointE","pointB"],
    pointB:["stair"],
    pointC:["stair","pointE","pointB"],
    pointD:["stair","pointE","pointB","pointC"],
    pointF:["stair","pointE","pointB","pointC"]
  },
  2:{//2階エスカレータ
    pointA:["esca","pointA"],
    pointB:["esca","pointA","pointB"],
    pointE:["esca","pointA","pointB","pointE"],
    pointC:["esca","pointA","pointB","pointC"],
    pointD:["esca","pointA","pointB","pointC","pointD"],
    pointF:["esca","pointA","pointB","pointC","pointF"]
  },
  3:{//3階エスカレータ
    pointA:["esca","pointE","pointB","pointA"],
    pointB:["esca","pointE","pointB"],
    pointC:["esca","pointE","pointB","pointC"],
    pointD:["esca","pointE","pointB","pointC","pointD"],
    pointF:["esca","pointE","pointB","pointC","pointF"]
  },
  4:{//4階エスカレータ
    pointA:["esca","pointA"],
    pointB:["esca","pointA","pointB"],
    pointE:["esca","pointA","pointB","pointE"],
    pointC:["esca","pointA","pointB","pointC"],
    pointD:["esca","pointA","pointB","pointC","pointD"],
    pointF:["esca","pointA","pointB","pointC","pointF"]
  }
}
var routes = {
  same:{//同じ階のとき
    pointA:["pointA"],
    pointB:["pointA","pointB"],
    pointE:["pointA","pointB","pointE"],
    pointC:["pointA","pointB","pointC"],
    pointD:["pointA","pointB","pointC","pointD"],
    pointF:["pointA","pointB","pointC","pointF"]
  },
  1:{
    pointA:["stair","pointE","pointB"],
    pointB:["stair"],
    pointC:["stair","pointE","pointB"],
    pointD:["stair","pointE","pointB","pointC"],
    pointF:["stair","pointE","pointB","pointC"]
  },
  2:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD"],
    pointF:["stair","pointE","pointB","pointC","pointF"]
  },
  3:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD"],
    pointF:["stair","pointE","pointB","pointC","pointF"]
  },
  4:{
    pointA:["stair","pointE","pointB","pointA"],
    pointB:["stair","pointE","pointB"],
    pointC:["stair","pointE","pointB","pointC"],
    pointD:["stair","pointE","pointB","pointC","pointD","pointC","pointB"],
    pointF:["stair","pointE","pointB","pointC","pointF"]
  }
}

var elevroutes = {
  same:{//同じ階のとき
    pointA:["pointA"],
    pointB:["pointA","pointB"],
    pointE:["pointA","pointB","pointE"],
    pointC:["pointA","pointB","pointC"],
    pointD:["pointA","pointB","pointC","pointD"],
    pointF:["pointA","pointB","pointC","pointF"]
  },
  1:{
    pointA:["elev","pointE","pointB"],
    pointB:["elev"],
    pointC:["elev","pointE","pointB"],
    pointD:["elev","pointE","pointB","pointC"],
    pointF:["elev","pointE","pointB","pointC"]
  },
  2:{
    pointA:["elev","pointE","pointB","pointA"],
    pointB:["elev","pointE","pointB"],
    pointC:["elev","pointE","pointB","pointC"],
    pointD:["elev","pointE","pointB","pointC","pointD"],
    pointF:["elev","pointE","pointB","pointC","pointF"]
  },
  3:{
    pointA:["elev","pointE","pointB","pointA"],
    pointB:["elev","pointE","pointB"],
    pointC:["elev","pointE","pointB","pointC"],
    pointD:["elev","pointE","pointB","pointC","pointD"],
    pointF:["elev","pointE","pointB","pointC","pointF"]
  },
  4:{
    pointA:["elev","pointE","pointB","pointA"],
    pointB:["elev","pointE","pointB"],
    pointC:["elev","pointE","pointB","pointC"],
    pointD:["elev","pointE","pointB","pointC","pointD","pointC"],
    pointF:["elev","pointE","pointB","pointC","pointF"]
  }
}
// 1:{
//   pointA:["stair","pointB"],
//   pointB:["stair"],
//   pointC:["stair","pointB"],
//   pointD:["stair","pointB","pointC"],
//   pointF:["stair","pointB","pointC"]
// },



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
  pointA:[1,"pointA"],
  pointB:[1,"pointB"],
  pointC:[1,"pointC"],
  pointD:[1,"pointD"],
  pointE:[1,"pointE"],
  pointF:[1,"pointF"],
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
  timelineTime = 1000;
  // var startfloornum = document.forms.id_form1.id_textBox1.value;
  wayofchange2 = document.forms.id_form1.id_textBox2.value;
  wayofchange3 = document.forms.id_form1.id_textBox3.value;
  var endpoint = document.forms.id_form1.id_textBox4.value;
  var wayofchange = document.forms.id_form1.id_textBox5.value;
  move([1,"pointA"],routepass[endpoint],wayofchange);       //大本の入力
}

function move(currentPlace,goalPlace,wayofchange){        //案内を実際に実行する関数
  var currentPos = positions[currentPlace[0]][currentPlace[1]];
  var currentRoute = routes[currentPlace[0]][currentPlace[1]];　//一階のゴールへの道の
  var goal = positions[goalPlace[0]][goalPlace[1]]; //ゴールの中身を持ってくる
  var goalRoute = routes[goalPlace[0]][goalPlace[1]];//ゴールの階の
  var samefloorRoute = routes["same"][goalPlace[1]];
  var escaRoute = escaroutes[goalPlace[0]][goalPlace[1]];
  var elevRoute = elevroutes[goalPlace[0]][goalPlace[1]];
  // //swichでできなかった。。。定義はスイッチ文の外に反映されないっぽい。
  //   if(goalPlace[0] == "2"){
  //       var escafloor = 5;
  //   }else if (goalPlace[0] == "3"){
  //       var escafloor = 6;
  //   }else if (goalPlace[0] == "4"){
  //       var escafloor = 7;
  //   }

  // var currentStair = positions[currentPlace[0]]["stair"];//現在居る階の階段の場所
  // var goalStair = positions[goalPlace[0]]["stair"]; //目的地の会談の場所
  if(endflag == 1){　//二回目以降の初期化
    currentrot = {_x:Math.PI*3/2,_y:0,_z:0};
    current = { x: 6, y:2 ,z:12};//
    currentop = { op1:1, op2:0, op3:0, op4:0 };
    currentcam = {x:0,y:30,z:0,_w:0.7,_x:-0.7,_y:0,_z:0};
    currentdir = {x:0,y:1.57,z:-1.57};
  }


  setPos(currentPlace[0], currentPos);   //初期位置
  if(goalPlace[0]==1){
    for (var i=0 ; i<samefloorRoute.length-1 ; i++) {//一階階段まで
      changedir(positions[currentPlace[0]][samefloorRoute[i+1]],positions[currentPlace[0]][samefloorRoute[i]]);
      moveTo(currentPlace[0], positions[currentPlace[0]][samefloorRoute[i+1]]);
    }
  }else{
    for (var i=currentRoute.length-1 ; i>-1 ; i--) {//一階階段まで
      moveTo(currentPlace[0], positions[currentPlace[0]][currentRoute[i]]);
      if(i>=1)
      changedir(positions[currentPlace[0]][currentRoute[i-1]],positions[currentPlace[0]][currentRoute[i]]);
    }
  }

  camerachange1(goalPlace[0]);
  camerarotate();

  if(wayofchange2 === ""){
    for( var i=1 ; goalPlace[0]>i ; i++ ){     //目的階までの移動と同時に透明度変更
      wayofchange = wayofchange || "stair";
      if(wayofchange == "esca" && i<goalPlace[0]) {
        changedir(positions[i+1]["esca"],positions[i]["esca"]);
      }
      upfloor(currentop,positions[i]["floorNum"]);
      moveTo(i + 1, positions[i+1][wayofchange]);
      // }else if ( wayofchange == "elev"){    //エレベータを使うなら。。。
      //   upfloor(currentop,positions[i]["floorNum"]);
      //   moveTo(i+1,positions[i+1]["elev"]);
      // }else if( wayofchange == "esca"){     //エスカレーターを使うなら。。。方向変換追加
      //   upfloor(currentop,positions[i]["floorNum"]);
      //   moveTo(i+1,positions[i+1]["esca"]);
      // }else {                               //指定されていない場合は階段
      //   upfloor(currentop,positions[i]["floorNum"]);
      //   moveTo(i+1,positions[i+1]["stair"]);
      // }
    }
  }else if(wayofchange3 === ""){
    for(var i = 1;goalPlace[0]>i;i++){
      var route;
      var lens = {
        elev: elevRoute.length,
        esca: escaRoute.length,
        stair: goalRoute.length
      };
      route = lens[wayofchange] - lens[wayofchange2] < 0 ? wayofchange : wayofchange2;//前の条件がそろったらwayofchange, wayofchange2
      // if((wayofchange == "stair" && wayofchange2 == "elev" )||(wayofchange == "elev" && wayofchange2 == "stair")){
      //   route = lens[wayofchange] - lens[wayofchange2] < 0 ? wayofchange : wayofchange2;
      //   // if(elevRoute.length - goalRoute.length < 0 ){
      //   //   upfloor(currentop,positions[i]["floorNum"]);
      //   //   moveTo(i+1,positions[i+1]["elev"]);
      //   // }else{
      //   //   upfloor(currentop,positions[i]["floorNum"]);
      //   //   moveTo(i+1,positions[i+1]["stiar"]);
      //   // }
      // }else if((wayofchange == "stair" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "stair")){
      //   route = escaRoute.length - goalRoute.length < 0 ? "elev" : "stiar";
      // }else if((wayofchange == "elev" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "elev")){
      //   route = elevRoute.length - goalRoute.length < 0 ? "elev" : "stiar";
      // }
      if(route == "esca" && i<goalPlace[0]) {
        changedir(positions[i+1]["esca"],positions[i]["esca"]);
      }
      upfloor(currentop,positions[i]["floorNum"]);
      moveTo(i+1,positions[i+1][route]);
    }
  }else{
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
      }
    }
  }



  camerachange2(goalPlace[0]);
  camerarotate2();
  changedir(positions[goalPlace[0]][escaRoute[1]],positions[goalPlace[0]][escaRoute[0]]);
  camerarot(positions[goalPlace[0]][goalRoute[0]],positions[goalPlace[0]][goalRoute[1]]);



  if(typeof wayofchange2 === ""){
    if(wayofchange == "stair"){           //階段を使うなら階段を移動
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }else if ( wayofchange == "elev"){    //エレベータを使うなら。。。
      for(var i = 0; i < elevRoute.length -1 ; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
      }
    }else if( wayofchange == "esca"){     //エスカレーターを使うなら。。。方向変換追加
      for(var i = 0 ; i<escaRoute.length-1; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
      }
    }else {                               //指定されていない場合は階段
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }
  }else if(wayofchange3 === ""){
    for(var i = 1;goalPlace[0]>i;i++){
      if((wayofchange == "stair" && wayofchange2 == "elev" )||(wayofchange == "elev" && wayofchange2 == "stair")){
        if(elevRoute.length - goalRoute.length < 0){
          for(var i = 0; i < elevRoute.length -1 ; i++){
            if(i>0)
            changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
          }
        }else{
          for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
            changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
          }
        }
      }else if((wayofchange == "stair" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "stair")){
        if(escaRoute.length - goalRoute.length < 0){
          for(var i = 0 ; i<escaRoute.length-1; i++){
            if(i>0)
            changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
          }
        }else{
          for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
            changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
          }
        }
      }else if((wayofchange == "elev" && wayofchange2 == "esca" )||(wayofchange == "esca" && wayofchange2 == "elev")){
        if(elevRoute.length-goalRoute.length < 0){
          for(var i = 0; i < elevRoute.length -1 ; i++){
            if(i>0)
            changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
          }
        }else{
          for(var i = 0 ; i<escaRoute.length-1; i++){
            if(i>0)
            changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
            moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
          }
        }
      }
    }
  }else{
    if(escaRoute.length < goalRoute.length && escaRoute.length < elevRoute.length){
      for(var i = 0 ; i<escaRoute.length-1; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
      }
    }else if(goalRoute.length < escaRoute.length && goalRoute.length< elevRoute.length){
      for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
        changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
      }
    }else if(elevRoute.length < escaRoute.length && elevRoute.length< goalRoute.length){
      for(var i = 0; i < elevRoute.length -1 ; i++){
        if(i>0)
        changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
        moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
      }
    }
  }

  // if(wayofchange == "esca"){
  //   for(var i = 0 ; i<escaRoute.length-1; i++){
  //       if(i>0)
  //       changedir(positions[goalPlace[0]][escaRoute[i+1]],positions[goalPlace[0]][escaRoute[i]]);
  //       moveTo(goalPlace[0],positions[goalPlace[0]][escaRoute[i+1]]);
  //   }
  // }else if(wayofchange == "elev"){
  //   for(var i = 0; i < elevRoute.length -1 ; i++){
  //     if(i>0)
  //       changedir(positions[goalPlace[0]][elevRoute[i+1]],positions[goalPlace[0]][elevRoute[i]]);
  //       moveTo(goalPlace[0],positions[goalPlace[0]][elevRoute[i+1]]);
  //   }
  // }else{
  //   for( var i=0 ; i<goalRoute.length-1 ; i++ ){     //ゴールまで
  //         changedir(positions[goalPlace[0]][goalRoute[i+1]],positions[goalPlace[0]][goalRoute[i]]);
  //         moveTo(goalPlace[0],positions[goalPlace[0]][goalRoute[i+1]]);
  //   }
  // }
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
  a = 30 + ((goalfloorNum-1) * 12);
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
function camerarotate(){//カメラの前後ろ方向の角度変更（LookAtの変わり）x/32xが48より大きくなるほど上向きになる。
  addTween(currentrot,{_x:Math.PI*54/32},userOpts.duration,userOpts.delay, true)
}
function camerarotate2(){//カメラを元の向きに戻す。
  addTween(currentrot,{_x:Math.PI*3/2},userOpts.duration,userOpts.delay, true)
};
function updateProps() {//描画する情報の更新
  // sphere.position.x = current.x;
  // sphere.position.y = current.y;
  // sphere.position.z = current.z;
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

  //カメラを自由に操作するためのオブジェクト作成
  var camera_controls = new THREE.OrbitControls(camera);

  //si-nntuika
  scene = new THREE.Scene();

  //光源の追加
  var directionalLight = new THREE.DirectionalLight( 0xffffff);
  directionalLight.position.set( 0.5, 0.5, 0.5 );
  scene.add(directionalLight);

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff);
  directionalLight2.position.set( -0.5, -0.5, -0.5);
  scene.add(directionalLight2);

  //add sphere
  var dir = new THREE.Vector3(1,0,0);
  var origin = new THREE.Vector3(-6,2,12);
  var length = 3;
  var hex = 0xff2222;
  var headLength = length;
  var headWidth = 2;
  arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex,headLength,headWidth);
  scene.add( arrowHelper );


  var spGeo = new THREE.SphereGeometry(1,30,30);
  matsp = new THREE.MeshPhongMaterial({color: 0xff1111});
  sphere = new THREE.Mesh(spGeo,matsp);
  sphere.position.set(
    sphere.position.x = -6,
    sphere.position.y = 2,
    sphere.position.z = 12
  )
  //scene.add(sphere);
  ///texture load
  //first floor texture
  const textureLoader1 = new THREE.TextureLoader();
  var texture1 = textureLoader1.load("pic/survey4.png");
  mat1 = new THREE.MeshPhongMaterial();
  mat1.side = THREE.DoubleSide;//display both Front and back
  mat1.opacity = 1;
  mat1.transparent = true;
  mat1.map = texture1;
  //second floor texture
  const textureLoader2 = new THREE.TextureLoader();
  var texture2 = textureLoader2.load("pic/survey3.png");
  mat2 = new THREE.MeshPhongMaterial();
  mat2.side = THREE.DoubleSide;
  mat2.opacity = 1;
  mat2.transparent = true;
  mat2.map = texture2;
  //third floor texture
  const textureLoader3 = new THREE.TextureLoader();
  var texture3 = textureLoader3.load("pic/survey5.png");
  mat3 = new THREE.MeshPhongMaterial();
  mat3.side = THREE.DoubleSide;
  mat3.opacity = 1;
  mat3.transparent = true;
  mat3.map = texture3;
  //fourth floor texture
  const textureLoader4 = new THREE.TextureLoader();
  var texture4 = textureLoader4.load("pic/survey3.png");
  mat4= new THREE.MeshPhongMaterial();
  mat4.side = THREE.DoubleSide;
  mat4.opacity = 1;
  mat4.transparent = true;
  mat4.map = texture4;
  ///texture load end

  ///add floor
  //add first floor
  var FirstF = new THREE.PlaneGeometry( 30, 30, 1,1);//make dimensions
  //var material = new THREE.MeshPhongMaterial( {color: 0xff0000 });//adjust color of texture
  var FirstFloor = new THREE.Mesh( FirstF, mat1);//make object
  scene.add(FirstFloor);                          //add FirstFloor to scene
  FirstFloor.rotation.set(Math.PI*3/2,0, 0);     //adjust rotation of FirstFloor
  //add second floor
  var SecondF = new THREE.PlaneGeometry(30,30,1,1);
  var SecondFloor = new THREE.Mesh( SecondF,mat2);//何でかmat2が使えない！
  scene.add(SecondFloor);
  SecondFloor.rotation.set(Math.PI*3/2, 0, 0);
  SecondFloor.position.set(0,12,0);
  //add third floor
  var ThirdF = new THREE.PlaneGeometry(30,30,1,1);
  var ThirdFloor = new THREE.Mesh(ThirdF, mat3);
  scene.add(ThirdFloor);
  ThirdFloor.rotation.set(Math.PI*3/2, 0, 0);
  ThirdFloor.position.set(0,24,0);
  //add fourth floor
  var FourthF = new THREE.PlaneGeometry(30,30,1,1);
  var FourthFloor = new THREE.Mesh(FourthF, mat4);
  scene.add(FourthFloor);
  FourthFloor.rotation.set(Math.PI*3/2,0,0);
  FourthFloor.position.set(0,36,0);
  ///add floor end



  container = document.createElement( 'div' );
  document.body.appendChild( container );

  //レンダラーをDOM上に設置
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  container.appendChild( renderer.domElement );


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
