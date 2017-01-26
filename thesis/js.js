//make space
var flag = 0;
////for tween
var animate = funciton(){
  requestAnimationFrame(animate);
  TWEEN.update();
  Render(scene,camera);
}
animate();
var tw1;

var animFunc1 = function(){
  var pos = {x:6, y:2, z:12}
  tw1 = new TWEEN.Tween(sphere)
      .to({x:6, y:2, z:0}, 2000);
      .onUpdate(function(){
              sphere.position.set(
                  sphere.position.x,
                  sphere.position.y,
                  sphere.position.z - 0.25
              )
      })
  tw1.start()
}

//空間生成
  var scene = new THREE.Scene();
  var gridHelper = new THREE.GridHelper( 30, 20, 0xFFFF00, 0xFFFFFF);
//functions for button
  function Erasegrid(){
    scene.remove(gridHelper);
  }
  function Addgrid(){
    ///make a coordinate system
      gridHelper.position.set(0,2,0);
       scene.add(gridHelper);
    ///make a cordinate system end
  }
//カメラの設定
  var width = 600;
  var height = 400;
  var fov = 60;
  var aspect = width / height;
  var near = 1;
  var far = 1000;
  var camera = new THREE.PerspectiveCamera( fov, aspect, near , far);
      camera.position.set(50,50,50);
      camera.lookAt(new THREE.Vector3(0,0,0));
//render function
  function Render(scene,camera){
    renderer.render( scene, camera);
  }
//カメラを自由に操作するためのオブジェクト作成
  var camera_controls = new THREE.OrbitControls(camera);

//レンダラーをDOM上に設置
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild( renderer.domElement);

//光源の追加
  var directionalLight = new THREE.DirectionalLight( 0xffffff);
  directionalLight.position.set( 0.5, 0.5, 0.5 );
  scene.add(directionalLight);

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff);
  directionalLight2.position.set( -0.5, -0.5, -0.5);
  scene.add(directionalLight2);

//add sphere
var spGeo = new THREE.SphereGeometry(1,30,30);
var matsp = new THREE.MeshPhongMaterial({color: 0xff0000});
var sphere = new THREE.Mesh(spGeo,matsp);
sphere.position.set{
  sphere.position.x =,
  sphere.position.y =,
  sphere.position.z =,
}
scene.add(sphere);

///texture load
  //first floor texture
  const textureLoader1 = new THREE.TextureLoader();
  var texture1 = textureLoader1.load("pic/survey4.png");
  var mat1 = new THREE.MeshPhongMaterial();
  mat1.side = THREE.DoubleSide;//display both Front and back
  mat1.opacity = 1;
  mat1.transparent = true;
  mat1.map = texture1;
  //second floor texture
  const textureLoader2 = new THREE.TextureLoader();
  var texture2 = textureLoader2.load("pic/survey3.png");
  var mat2 = new THREE.MeshPhongMaterial();
  mat2.side = THREE.DoubleSide;
  mat2.opacity = 0;
  mat2.transparent = true;
  mat2.map = texture2;
  //third floor texture
  const textureLoader3 = new THREE.TextureLoader();
  var texture3 = textureLoader3.load("pic/survey5.png");
  var mat3 = new THREE.MeshPhongMaterial();
  mat3.side = THREE.DoubleSide;
  mat3.opacity = 1;
  mat3.transparent = true;
  mat3.map = texture3;
  //fourth floor texture
  const textureLoader4 = new THREE.TextureLoader();
  var texture4 = textureLoader4.load("pic/survey3.png");
  var mat4= new THREE.MeshPhongMaterial();
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
  var SecondFloor = new THREE.Mesh( SecondF,mat2);
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
  Render(scene,camera);
///add floor end
  var FifthF = new THREE.PlaneGeometry(30,30,1,1);
  var FifthFloor = new THREE.Mesh(FifthF, mat4);
  scene.add(FourthFloor);
  FourthFloor.rotation.set(Math.PI*3/2,0,0);
  FourthFloor.position.set(0,36,0);
  Render(scene,camera);




var Start={x:-6,y:2,z:12};
var pointB={x:-6,y:2,z:0};
var pointC={x:6,y:2,z:0};
var pointD={x:6,y:2,z:-12};
var pointE={x:-6,y:2,z:-12};
var pointF={x:6,y:2,z:12};

var point2B={x:-6,y:14,z:0};
var point2C={x:6,y:14,z:0};
var point2D={x:6,y:14,z:-12};
var point2E={x:-6,y:14,z:-12};
var point2F={x:6,y:14,z:12};

var point3B={x:-6,y:26,z:0};
var point3C={x:6,y:26,z:0};
var point3D={x:6,y:26,z:-12};
var point3E={x:-6,y:26,z:-12};
var point3F={x:6,y:26,z:12};

var point4B={x:-6,y:38,z:0};
var point4C={x:6,y:38,z:0};
var point4D={x:6,y:38,z:-12};
var point4E={x:-6,y:38,z:-12};
var point4F={x:6,y:38,z:12};

var array1 = [pointB,pointC,pointD,"END"]
var array2 = [pointB,pointE,point2E,point2B,point2C,point2D,"END"]
var array21= [pointB,pointE,point2E,point2B,point2C,point2F,"END"]
var array3 = [pointB,pointE,point2E,point3E,point3B,point3C, point3D,"END"]
var array4 = [pointB,pointE,point2E,point3E,point4E,point4B,point4C,point4D,"END"]
var floor = [mat1,mat2,mat3,mat4,"END"]
//make objects

// //functions
//  function animation(point){
//    dx=sphere.position.x-point.x;
//    dy=sphere.position.y-point.y;
//    dz=sphere.position.z-point.z;
//    if(dx != 0){
//     if(sphere.position.x - point.x > 0){
//       sphere.position.set(
//           sphere.position.x - 0.25,
//           sphere.position.y,
//           sphere.position.z
//       )
//     }else if(sphere.position.x - point.x < 0){
//       sphere.position.set(
//           sphere.position.x + 0.25.
//           sphere.position.y,
//           sphere.position.z
//
//       )
//     }
//   }//if(dx!=0) end
//
//   if(dy != 0){
//     if(sphere.position.y - point.y > 0){
//       sphere.position.set(
//           sphere.position.x,
//           sphere.position.y - 0.25,
//           sphere.position.z
//       )
//     }else if(sphere.position.y - point.y < 0){
//       sphere.position.set(
//           sphere.position.x,
//           sphere.position.y + 0.25,
//           sphere.position.z
//       )
//     }
//   }//if(dy != 0) end
//
//   if(dz != 0){
//     if(sphere.position.z - point.z > 0){
//       sphere.position.set(
//           sphere.position.x,
//           sphere.position.y,
//           sphere.position.z - 0.25
//       )
//     }else if(sphere.position.z - point.z < 0){
//       sphere.position.set(
//             sphere.position.x,
//             sphere.position.y,
//             sphere.position.z + 0.25
//       )
//     }
//   }//if(dz!= 0) end
//   //Animation end
// }
//  function floorup(map1,map2){
//    console.log("up");
//    map1.opacity=map1.opacity - 0.02;
//    map2.opacity=map2.opacity + 0.02;
//  }  //floorup
// function init(){
//   sphere.position.set(
//     sphere.position.x = -6,
//     sphere.position.y = 2,
//     sphere.position.z = 12
//   )
//   i = j = 0; low = 2; high = 14;
//   mat1.opacity = 1.0;
//   mat2.opacity = 0.4;
//   mat3.opacity = 0.4;
//   mat4.opacity = 0.4;
// } //reset
// //functions end
//
//
// //for attempt
//
// //for attempt end
// //アニメーションを作成
// var i=0,j=0;
// var n=0.01;
// var opflagup=0;
// var opflagdown = 0;
// var Point={x:-6,y:2,z:0};
// var bpx=0,bpy=0,bpz=0;
// var array = ["END"];
// var low = 0, high = 14;
// var betf = 12;
// (function renderLoop (){ //名前付き即時関数
//   var textinput = document.forms.id_form1.id_textBox1.value;
//   if(textinput == "1"){
//     var array = array1;
//   }else if(textinput == "21"){
//     var array = array2;
//   }else if(textinput == "3"){
//     var array = array3;
//   }else if(textinput == "4"){
//     var array = array4;
//   }else if(textinput == "2"){
//     var array = array21;
//   }else{
//     init();
//     var array = ["END"];
//   }
//
//   var yb=sphere.position.y;
//   if(JSON.stringify(array[i]) == JSON.stringify(sphere.position)){
//     //console.log("call");
//     i++;
//   }else {
//     if(array[i] != "END")
//       animation(array[i]);
//   }
//   ya = sphere.position.y;
//   requestAnimationFrame(renderLoop);
//   //attempt
// //visible to invisible and vise versa
// if(yb!=ya){
//   if(floor[j+1]!="END"){
//     if(low<sphere.position.y && sphere.position.y<high){
//       if(yb<ya){
//           if(floor[j].opacity > 0.4)
//             floorup(floor[j],floor[j+1]);
//       }//else sagaru
//     }else{
//       low = high,
//       high = high + betf;
//       j++;
//     }
//   }
// }
//
//       camera_controls.update();    //自由にカメラを動かす
//       Render(scene,camera);
//     })();
//     make animation end
