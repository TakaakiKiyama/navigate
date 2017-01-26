var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var cube;
var mat;
var timelineTime = 20;

//移動に使う数値を集めておく。
var userOpts	= {
	range		: 400,
	duration	: 2000,
	delay		: 20,
};

var cubeop = {
	opacity : 1,
	duration : 2000,
	delay : 20,
}
var current	= { x: -userOpts.range , y:-userOpts.range/2 };  //最新のポジションをあらわす引数
var currentop = { op:1 } //最新の透明度をあらわす引数
var positions = {//位置の情報のオブジェクト
	1: {
		hight: 0,
		aaa: {x: 50, y: 50},
		bbb: {x: 150, y: 150},
		ccc: {x: 300, y: 150},
		ddd: {x: 500, y: 550},
		stair: {x: 100, y: 100}
	},
	4: {
		hight: 500,
		bbb: {x: 500, y: 500},
		ccc: {x: 300, y: 150},
		ddd: {x: 500, y: 550},
		stair: {x: 100, y: 100}
	}
}
var routes = {
	1: {
		aaa: ["bbb"],
		bbb: []
	},
	4: {
		bbb: [],
		ccc: ["bbb"],
		ddd: ["bbb", "ccc"]
	}
};


//初期化してからとアニメーションの実行
init();
animate();


//Tween.js setup

function setupTween()
{

	TWEEN.removeAll();//tweenを削除

	//tween(head)の作成 current(現在地)からuserOpts.rangeまで移動するtween

	// var tweenHead	= new TWEEN.Tween(current)
	// .to({x: +userOpts.range}, userOpts.duration)
	// .delay(userOpts.delay)
	// .onUpdate(update);
	//
	//
	// //tween(head)
	// var tweenBack	= new TWEEN.Tween(current)
	// .to({x: -userOpts.range}, userOpts.duration)
	// .delay(userOpts.delay)
	// .onUpdate(update);
	//
	// var tweena = new TWEEN.Tween(currentop)
	// .delay(1000)
	// .to({op: 0}, cubeop.duration)
	// .onUpdate(updateopa);
	//
	//
	// tweenHead.chain(tweenBack);//tweenHeadの直後にtweenBackをつなぐ
	// tweenBack.chain(tweena);//逆
	// tweena.chain(tweenHead);
	// tweenHead.start(); //tweenを実行

	// addTween(current, {x: +userOpts.range}, userOpts.duration, userOpts.delay, true)
	// addTween(current, {x: -userOpts.range}, userOpts.duration, userOpts.delay, false)
	// addTween(currentop, {op: 0}, cubeop.duration, cubeop.delay, true);


//(currentPlace,goalPlace)
	move([1, "aaa"], [4, "bbb"]);//これだけ実行すればその場所に行ってくれる。

}

function move(currentPlace, goalPlace) {
	var currentPos = positions[currentPlace[0]][currentPlace[1]]; //入力から、positions[1]（階）[aaa]の中身を持ってくる
	var currentRoute = routes[currentPlace[0]][currentPlace[1]];　//一階のゴールへの道の
	var goal = positions[goalPlace[0]][goalPlace[1]] //ゴールの中身を持ってくる
	var goalRoute = routes[goalPlace[0]][goalPlace[1]];//ゴールの階
	var currentStair = positions[currentPlace[0]]["stair"];//現在居る階の階段の場所
	var goalStair = positions[goalPlace[0]]["stair"]; //目的地の会談の場所

//ここで経路を求める式を考える。


	setPos(currentPlace[0], currentPos);
	for (var i = currentRoute.length - 1; i > -1; i--) {
		moveTo(goalPlace[0], currentRoute[i]);
	}
	moveTo(currentPlace[0], currentStair);
	changestair()
	moveTo(goalPlace[0], goalStair);

	goalRoute.forEach(function(place){
		moveTo(goalPlace[0], place);
	})

	moveTo(goalPlace[0], goal);
}

function setPos(stairNumber, pos) {
	current.x = pos.x
	current.y = pos.y
	current.z = positions[stairNumber].height
}

function moveTo(stairNumber, pos) {
	addTween(current, {
		x: pos.x,
		y: pos.y,
		z: positions[stairNumber].height
	}, userOpts.duration, userOpts.delay, true)
}

function changestair(){
	addTween(currentop, {
	　op: 0.5
	}, userOpts.duration, userOpts.delay, false)
}


function updateProps() {//現在地の更新
	console.log(currentop)
	cube.position.x = current.x;
	cube.position.y = current.y;
	mat.opacity = currentop.op;
}


//関数の合成
var compose = (f,g)=> {
	return (arg) => {
		return f(g(arg))
	}
}

function init(){
	//カメラ
	camera	= new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 1000;

	//シーン追加
	scene	= new THREE.Scene();

	//光源設定　（無くても良いみたい？ｗ）//Normalmaterial だっから光源関係なく色ついてただけ
	light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
	light.position.set( 100, 100, 200 );
	scene.add(light);

	light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
	light.position.set( -100, -100, -200 );
	scene.add(light);

	setupTween();


	//球の追加
	mat = new THREE.MeshPhongMaterial({color:0xff0000});
	mat.transparent = true;
	cube	= new THREE.Mesh( new THREE.SphereGeometry( 200, 48, 32 ), mat);
	cube.position.x = -userOpts.range;
	scene.add( cube );

	//コンテイナー？
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	//レンダラー？
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
}


function animate(time){
	render();
	requestAnimationFrame(animate);
	TWEEN.update(time);
	updateProps();
}

function render(){
	renderer.render(scene,camera);
}



//targetにcurrent,propにobject情報, isSeriesには直列に実行するかしないかするならtrue
function addTween(target, prop, duration, delay, isSeries) {　//tweenの作成とタイムライン的なので管理
	setTimeout(function() {
		var tween = new TWEEN.Tween(target)
			.to(prop, duration);
		tween.start();
	}, timelineTime)

	if (isSeries) {
		timelineTime += duration;
	}
}
