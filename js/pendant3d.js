/**
 * pendant3d.js v10.2 - Realistic lanyard badge + fixed rotation + black/red
 */
(function () {
    'use strict';
    var container = document.getElementById('pendant3dContainer');
    var btn = document.getElementById('pendantBtn');
    var canvas = document.getElementById('pendant3dCanvas');
    var badge = document.getElementById('dropBadge');
    if (!container || !btn || !canvas) { console.warn('[pendant3d] missing elements'); return; }

    var scene, camera, renderer, pendantGroup, cardGroup;
    var isInitialized = false, isOpen = false, isAnimating = false;
    var physics = { amplitude: 0.35, omega: 2.2, damping: 0.6, startTime: 0 };
    var mouse = { x: 0, y: 0, targetX: 0, targetY: 0, lerpFactor: 0.08 };
    var isDragging = false, dragVelocity = 0, lastDragX = 0, lastDragTime = 0;
    var manualRotY = 0;
    // Card rotation: free stop, no snap. Just damping + hard limits.
    var MAX_ROT = Math.PI; // max rotation each direction (shows back at ±PI)

    function rr(ctx, x, y, w, h, r) {
        ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
        ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
        ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
        ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
        ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
    }

    function frontCanvas() {
        var W=700,H=1050,c=document.createElement('canvas'); c.width=W; c.height=H;
        var x=c.getContext('2d');
        var bg=x.createLinearGradient(0,0,W*.3,H);
        bg.addColorStop(0,'#0a0a0a'); bg.addColorStop(.5,'#141414'); bg.addColorStop(1,'#0a0a0a');
        x.fillStyle=bg; rr(x,0,0,W,H,36); x.fill();
        // Brushed texture
        x.strokeStyle='rgba(255,255,255,0.012)'; x.lineWidth=.5;
        for(var i=0;i<W;i+=28){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke();}
        // Red border
        x.strokeStyle='rgba(180,40,40,0.5)'; x.lineWidth=2.5; rr(x,14,14,W-28,H-28,26); x.stroke();
        // Corner accents
        var cs=28; x.strokeStyle='rgba(180,40,40,0.9)'; x.lineWidth=3;
        [[20,20,1,1],[W-20,20,-1,1],[20,H-20,1,-1],[W-20,H-20,-1,-1]].forEach(function(p){
            x.beginPath();x.moveTo(p[0],p[1]+cs*p[3]);x.lineTo(p[0],p[1]);x.lineTo(p[0]+cs*p[2],p[1]);x.stroke();});
        // Lanyard slot at top
        x.fillStyle='#050505';
        rr(x,W/2-30,55,60,20,8); x.fill();
        x.strokeStyle='rgba(180,40,40,0.6)';x.lineWidth=1.5;
        rr(x,W/2-30,55,60,20,8); x.stroke();
        // Avatar
        var aY=290,aR=95;
        x.save();x.beginPath();x.arc(W/2,aY,aR+6,0,Math.PI*2);
        x.strokeStyle='rgba(180,40,40,0.5)';x.lineWidth=2;x.stroke();
        x.beginPath();x.arc(W/2,aY,aR,0,Math.PI*2);x.clip();
        var ag=x.createLinearGradient(W/2-aR,aY-aR,W/2+aR,aY+aR);
        ag.addColorStop(0,'#1a1a1a');ag.addColorStop(1,'#0d0d0d');
        x.fillStyle=ag;x.fillRect(W/2-aR,aY-aR,aR*2,aR*2);
        x.fillStyle='rgba(180,40,40,0.9)';x.font='bold 80px system-ui,sans-serif';
        x.textAlign='center';x.textBaseline='middle';x.fillText('\u9648',W/2,aY+4);x.restore();
        // Name
        x.fillStyle='#ffffff';x.font='bold 56px system-ui,sans-serif';x.textAlign='center';
        x.fillText('\u9648\u6587\u4eae',W/2,470);
        // Red divider
        var lg=x.createLinearGradient(W/2-130,0,W/2+130,0);
        lg.addColorStop(0,'rgba(180,40,40,0)');lg.addColorStop(.5,'rgba(180,40,40,0.8)');lg.addColorStop(1,'rgba(180,40,40,0)');
        x.strokeStyle=lg;x.lineWidth=2;x.beginPath();x.moveTo(W/2-130,510);x.lineTo(W/2+130,510);x.stroke();
        // Subtitle
        x.fillStyle='rgba(180,40,40,0.9)';x.font='500 28px system-ui,sans-serif';
        x.fillText('\u5e7f\u5dde\u7f8e\u672f\u5b66\u9662 \u00b7 \u6c7d\u8f66\u8bbe\u8ba1',W/2,565);
        x.fillStyle='rgba(255,255,255,0.4)';x.font='400 22px system-ui,sans-serif';
        x.fillText('GUANGZHOU ACADEMY OF FINE ARTS',W/2,610);
        // Separator
        x.strokeStyle='rgba(255,255,255,0.06)';x.lineWidth=1;
        x.beginPath();x.moveTo(60,680);x.lineTo(W-60,680);x.stroke();
        // Tags
        var tags=['\u6c7d\u8f66\u8bbe\u8ba1','SUV / MPV','AI \u521b\u4f5c'];
        x.font='400 20px system-ui,sans-serif';
        var tws=tags.map(function(t){return x.measureText(t).width+28;});
        var tW=tws.reduce(function(a,b){return a+b;},0)+(tags.length-1)*10;
        var tX=(W-tW)/2;
        tags.forEach(function(t,idx){var tw=tws[idx];
            x.fillStyle='rgba(180,40,40,0.08)';rr(x,tX,713,tw,34,17);x.fill();
            x.strokeStyle='rgba(180,40,40,0.4)';x.lineWidth=1;rr(x,tX,713,tw,34,17);x.stroke();
            x.fillStyle='rgba(180,40,40,0.85)';x.textAlign='center';x.fillText(t,tX+tw/2,737);tX+=tw+10;});
        // Quote
        x.fillStyle='rgba(255,255,255,0.25)';x.font='italic 19px Georgia,serif';x.textAlign='center';
        x.fillText('Design is not just what it looks like,',W/2,840);
        x.fillText('it is how it works.',W/2,868);
        // Bottom deco
        x.strokeStyle='rgba(180,40,40,0.4)';x.lineWidth=1.5;
        x.beginPath();x.moveTo(W/2-50,950);x.lineTo(W/2,935);x.lineTo(W/2+50,950);x.stroke();
        x.beginPath();x.moveTo(W/2-30,960);x.lineTo(W/2,948);x.lineTo(W/2+30,960);x.stroke();
        return c;
    }

    function backCanvas() {
        var W=700,H=1050,c=document.createElement('canvas'); c.width=W; c.height=H;
        var x=c.getContext('2d');
        var bg=x.createLinearGradient(W*.7,0,0,H);
        bg.addColorStop(0,'#0a0a0a');bg.addColorStop(.5,'#141414');bg.addColorStop(1,'#0a0a0a');
        x.fillStyle=bg;rr(x,0,0,W,H,36);x.fill();
        x.strokeStyle='rgba(180,40,40,0.5)';x.lineWidth=2.5;rr(x,14,14,W-28,H-28,26);x.stroke();
        // Lanyard slot
        x.fillStyle='#050505';
        rr(x,W/2-30,55,60,20,8); x.fill();
        x.strokeStyle='rgba(180,40,40,0.6)';x.lineWidth=1.5;
        rr(x,W/2-30,55,60,20,8); x.stroke();
        // Corner accents
        var cs2=28;x.strokeStyle='rgba(180,40,40,0.9)';x.lineWidth=3;
        [[20,20,1,1],[W-20,20,-1,1],[20,H-20,1,-1],[W-20,H-20,-1,-1]].forEach(function(p){
            x.beginPath();x.moveTo(p[0],p[1]+cs2*p[3]);x.lineTo(p[0],p[1]);x.lineTo(p[0]+cs2*p[2],p[1]);x.stroke();});
        // Title
        x.fillStyle='rgba(180,40,40,0.9)';x.font='bold 36px system-ui,sans-serif';x.textAlign='center';
        x.fillText('CONTACT',W/2,180);
        var lg2=x.createLinearGradient(W/2-100,0,W/2+100,0);
        lg2.addColorStop(0,'rgba(180,40,40,0)');lg2.addColorStop(.5,'rgba(180,40,40,0.6)');lg2.addColorStop(1,'rgba(180,40,40,0)');
        x.strokeStyle=lg2;x.lineWidth=1.5;x.beginPath();x.moveTo(W/2-100,210);x.lineTo(W/2+100,210);x.stroke();
        var items=[
            {i:'\u2709',l:'EMAIL',v:'3323798056@qq.com'},
            {i:'\u260E',l:'PHONE',v:'+86 135 6007 8021'},
            {i:'\u2302',l:'LOCATION',v:'Guangzhou, China'},
            {i:'\u2699',l:'MAJOR',v:'Automotive Design'},
            {i:'\u2605',l:'SCHOOL',v:'GAFA'}];
        var yP=300;
        items.forEach(function(it){
            x.beginPath();x.arc(120,yP,28,0,Math.PI*2);
            x.fillStyle='rgba(180,40,40,0.1)';x.fill();
            x.strokeStyle='rgba(180,40,40,0.4)';x.lineWidth=1.5;x.stroke();
            x.fillStyle='rgba(180,40,40,0.9)';x.font='24px system-ui,sans-serif';x.textAlign='center';
            x.fillText(it.i,120,yP+8);
            x.fillStyle='rgba(255,255,255,0.4)';x.font='400 18px system-ui,sans-serif';x.textAlign='left';
            x.fillText(it.l,175,yP-10);
            x.fillStyle='#ffffff';x.font='500 24px system-ui,sans-serif';
            x.fillText(it.v,175,yP+20);yP+=100;});
        x.strokeStyle='rgba(255,255,255,0.08)';x.lineWidth=1;
        rr(x,W/2-80,yP+40,160,160,12);x.stroke();
        x.fillStyle='rgba(255,255,255,0.2)';x.font='16px system-ui,sans-serif';x.textAlign='center';
        x.fillText('QR Code',W/2,yP+125);
        x.strokeStyle='rgba(180,40,40,0.4)';x.lineWidth=1.5;
        x.beginPath();x.moveTo(W/2-50,H-80);x.lineTo(W/2,H-95);x.lineTo(W/2+50,H-80);x.stroke();
        return c;
    }

    // Create flat lanyard strap geometry
    function createLanyard() {
        var group = new THREE.Group();
        // Left strap
        var leftCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.08, 3.7, 0),
            new THREE.Vector3(-0.06, 3.2, 0.02),
            new THREE.Vector3(-0.03, 2.5, 0.04),
            new THREE.Vector3(-0.01, 1.9, 0.03),
            new THREE.Vector3(0, 1.55, 0.02)
        ]);
        var rightCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.08, 3.7, 0),
            new THREE.Vector3(0.06, 3.2, 0.02),
            new THREE.Vector3(0.03, 2.5, 0.04),
            new THREE.Vector3(0.01, 1.9, 0.03),
            new THREE.Vector3(0, 1.55, 0.02)
        ]);
        // Use flat ribbon: ExtrudeGeometry with rectangular shape
        var strapShape = new THREE.Shape();
        strapShape.moveTo(-0.035, -0.003);
        strapShape.lineTo(0.035, -0.003);
        strapShape.lineTo(0.035, 0.003);
        strapShape.lineTo(-0.035, 0.003);
        strapShape.lineTo(-0.035, -0.003);
        var extSettings = { steps: 40, bevelEnabled: false, extrudePath: leftCurve };
        var leftStrap = new THREE.Mesh(
            new THREE.ExtrudeGeometry(strapShape, extSettings),
            new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.85, metalness: 0.05 })
        );
        group.add(leftStrap);
        var extSettings2 = { steps: 40, bevelEnabled: false, extrudePath: rightCurve };
        var rightStrap = new THREE.Mesh(
            new THREE.ExtrudeGeometry(strapShape, extSettings2),
            new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.85, metalness: 0.05 })
        );
        group.add(rightStrap);
        // Metal clip at top connecting straps
        var clipGeo = new THREE.BoxGeometry(0.12, 0.04, 0.015);
        var clipMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.15 });
        var clip = new THREE.Mesh(clipGeo, clipMat);
        clip.position.set(0, 3.7, 0);
        group.add(clip);
        // Clip ring
        var ringGeo = new THREE.TorusGeometry(0.025, 0.004, 8, 16);
        var ring = new THREE.Mesh(ringGeo, clipMat.clone());
        ring.position.set(0, 3.73, 0);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
        return group;
    }

    function initScene() {
        var w=container.clientWidth,h=container.clientHeight;
        scene=new THREE.Scene();
        camera=new THREE.PerspectiveCamera(45,w/h,0.1,100);
        camera.position.set(0,0.5,5);camera.lookAt(0,0,0);
        renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
        renderer.setSize(w,h);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
        renderer.outputEncoding=THREE.sRGBEncoding;
        // Lighting
        scene.add(new THREE.AmbientLight(0x222222,0.4));
        var k=new THREE.DirectionalLight(0xffffff,1.5);k.position.set(-2,4,5);scene.add(k);
        var f=new THREE.DirectionalLight(0x444455,0.4);f.position.set(3,2,3);scene.add(f);
        var b=new THREE.DirectionalLight(0x331111,0.3);b.position.set(0,3,-4);scene.add(b);
        var rim=new THREE.DirectionalLight(0x881111,0.25);rim.position.set(-3,0,2);scene.add(rim);
        pendantGroup=new THREE.Group();scene.add(pendantGroup);
        cardGroup=new THREE.Group();pendantGroup.add(cardGroup);
        // Front face
        var ft=new THREE.CanvasTexture(frontCanvas());
        ft.anisotropy=renderer.capabilities.getMaxAnisotropy();
        var fMat=new THREE.MeshStandardMaterial({map:ft,metalness:0.3,roughness:0.45,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
        var fMesh=new THREE.Mesh(new THREE.PlaneGeometry(2,3),fMat);
        fMesh.position.z=0.056;cardGroup.add(fMesh);
        // Back face
        var bt=new THREE.CanvasTexture(backCanvas());
        bt.anisotropy=renderer.capabilities.getMaxAnisotropy();
        var bMat=new THREE.MeshStandardMaterial({map:bt,metalness:0.3,roughness:0.45,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
        var bMesh=new THREE.Mesh(new THREE.PlaneGeometry(2,3),bMat);
        bMesh.rotation.y=Math.PI;bMesh.position.z=-0.056;cardGroup.add(bMesh);
        // Card edge
        var edgeMat=new THREE.MeshStandardMaterial({color:0x1a1a1a,metalness:0.6,roughness:0.3});
        cardGroup.add(new THREE.Mesh(new THREE.BoxGeometry(2.01,3.01,0.105),edgeMat));
        // Lanyard strap
        var lanyard = createLanyard();
        pendantGroup.add(lanyard);
        pendantGroup.position.y=3;
        isInitialized=true;
    }

    function dropStart(){
        physics.startTime=Date.now();
        manualRotY=0;
        isDragging=false;dragVelocity=0;
        pendantGroup.position.y=3;pendantGroup.rotation.set(0,0,0);cardGroup.rotation.y=0;
    }

    function animate(){
        if(!isInitialized||!isOpen)return;
        requestAnimationFrame(animate);
        var cw=container.clientWidth,ch=container.clientHeight;
        if(cw>0&&ch>0&&renderer.domElement.width!==cw*Math.min(window.devicePixelRatio,2)){
            camera.aspect=cw/ch;camera.updateProjectionMatrix();renderer.setSize(cw,ch);
        }
        var el=(Date.now()-physics.startTime)/1000,dd=0.6;
        if(el<dd){
            var t=el/dd;
            var e=t<(1/2.75)?7.5625*t*t:t<(2/2.75)?7.5625*(t-=1.5/2.75)*t+.75:t<(2.5/2.75)?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;
            pendantGroup.position.y=3*(1-e)+(-0.2)*e;
        }else{pendantGroup.position.y=-0.2;}
        var sw=0;if(el>dd){var st=el-dd;sw=physics.amplitude*Math.cos(physics.omega*st)*Math.exp(-physics.damping*st);}
        pendantGroup.rotation.x=sw;pendantGroup.rotation.z=sw*0.2;
        // Rotation physics - stop where you stop, no snap
        if(!isDragging){
            if(Math.abs(dragVelocity)>0.0005){
                manualRotY+=dragVelocity*12;
                dragVelocity*=0.88; // Strong damping
                if(manualRotY>MAX_ROT){manualRotY=MAX_ROT;dragVelocity=0;}
                if(manualRotY<-MAX_ROT){manualRotY=-MAX_ROT;dragVelocity=0;}
            }else{
                dragVelocity=0; // Stop, keep current position
            }
        }
        cardGroup.rotation.y=manualRotY;
        if(!isDragging){
            mouse.x+=(mouse.targetX-mouse.x)*mouse.lerpFactor;
            mouse.y+=(mouse.targetY-mouse.y)*mouse.lerpFactor;
        }
        renderer.render(scene,camera);
    }

    function getX(e){return e.touches?e.touches[0].clientX:e.clientX;}

    function onDown(e){
        if(!isOpen||!isInitialized)return;
        isDragging=true;dragVelocity=0;
        lastDragX=getX(e);lastDragTime=Date.now();
        container.style.cursor='grabbing';e.preventDefault();
    }

    function onMove(e){
        if(!isInitialized||!isOpen)return;
        var r=container.getBoundingClientRect();
        mouse.targetX=((e.clientX-r.left)/r.width)*2-1;
        mouse.targetY=((e.clientY-r.top)/r.height)*2-1;
        if(!isDragging)return;
        e.preventDefault();
        var px=getX(e),dx=px-lastDragX,now=Date.now(),dt=now-lastDragTime;
        if(dt>0){
            dragVelocity=dx/dt;
            // Clamp velocity to prevent huge spins from fast flicks
            if(dragVelocity>0.08)dragVelocity=0.08;
            if(dragVelocity<-0.08)dragVelocity=-0.08;
        }
        manualRotY+=dx*0.012;
        // Clamp position
        if(manualRotY>MAX_ROT){manualRotY=MAX_ROT;dragVelocity=0;}
        if(manualRotY<-MAX_ROT){manualRotY=-MAX_ROT;dragVelocity=0;}
        lastDragX=px;lastDragTime=now;
    }

    function onUp(){
        if(!isDragging)return;
        isDragging=false;container.style.cursor='grab';
        // No snap - card stays wherever it is when released
    }

    function openPendant(){
        if(isAnimating)return;isAnimating=true;isOpen=true;
        container.style.display='block';container.offsetHeight;
        if(!isInitialized)initScene();
        else{var w=container.clientWidth,h=container.clientHeight;if(w>0&&h>0){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}}
        container.classList.add('open');container.classList.remove('closing');container.style.cursor='grab';
        dropStart();animate();setTimeout(function(){isAnimating=false;},800);
    }

    function closePendant(){
        if(isAnimating)return;isAnimating=true;isOpen=false;
        container.classList.remove('open');container.classList.add('closing');container.style.cursor='';
        setTimeout(function(){container.style.display='none';container.classList.remove('closing');isAnimating=false;},600);
    }

    btn.addEventListener('click',function(e){e.stopPropagation();if(isOpen)closePendant();else openPendant();});
    container.addEventListener('mousedown',onDown);
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
    container.addEventListener('touchstart',onDown,{passive:false});
    window.addEventListener('touchmove',onMove,{passive:false});
    window.addEventListener('touchend',onUp);
    document.addEventListener('click',function(e){if(isOpen&&!container.contains(e.target)&&!badge.contains(e.target))closePendant();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&isOpen)closePendant();});
    console.log('[pendant3d] v10.2 - lanyard strap + anti-gyro + black/red');
})();
